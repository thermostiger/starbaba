import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    console.log('Missing credentials');
                    return null;
                }

                try {
                    console.log('Attempting to authenticate:', credentials.email);

                    // Direct Supabase connection instead of Payload
                    const { createClient } = await import('@supabase/supabase-js');
                    const supabase = createClient(
                        process.env.NEXT_PUBLIC_SUPABASE_URL!,
                        process.env.SUPABASE_SERVICE_ROLE_KEY!
                    );

                    const { data: users, error } = await supabase
                        .from('users')
                        .select('*')
                        .eq('email', credentials.email as string)
                        .limit(1);

                    if (error) {
                        console.error('Database error:', error);
                        return null;
                    }

                    const user = users?.[0];

                    if (!user || !user.password) {
                        console.log('User not found or no password');
                        return null;
                    }

                    const isValid = await bcrypt.compare(
                        credentials.password as string,
                        user.password
                    );

                    if (!isValid) {
                        console.log('Invalid password');
                        return null;
                    }

                    console.log('Authentication successful for:', user.email);
                    return {
                        id: user.id.toString(),
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    };
                } catch (error) {
                    console.error('Auth error:', error);
                    return null;
                }
            },
        }),
        // WeChat and QQ providers would require custom OAuth implementations
        // For now, we'll use Google as the primary provider
    ],
    pages: {
        signIn: '/login',
    },
    secret: process.env.AUTH_SECRET || 'your-secret-key-change-in-production-please',
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === 'google') {
                try {
                    const { createClient } = await import('@supabase/supabase-js');
                    const supabase = createClient(
                        process.env.NEXT_PUBLIC_SUPABASE_URL!,
                        process.env.SUPABASE_SERVICE_ROLE_KEY!
                    );

                    // Check if user exists
                    const { data: existingUser, error: fetchError } = await supabase
                        .from('users')
                        .select('*')
                        .eq('email', user.email)
                        .single();

                    if (fetchError && fetchError.code !== 'PGRST116') {
                        console.error('GOOGLE_LOGIN_FETCH_ERROR:', JSON.stringify(fetchError));
                        // Don't block login, but user won't be saved/updated
                        return true;
                    }

                    if (!existingUser) {
                        // Create new user
                        const { error: insertError } = await supabase
                            .from('users')
                            .insert([
                                {
                                    email: user.email,
                                    name: user.name,
                                    // image: user.image, // Payload might expect 'avatar' or relationship to media, let's skip image for now if uncertain
                                    provider: 'google',
                                    role: 'user',
                                    createdAt: new Date().toISOString(),
                                    updatedAt: new Date().toISOString(),
                                    // Ensure we don't violate not-null constraints. 
                                    // Based on schema, password is nullable.
                                }
                            ]);

                        if (insertError) {
                            console.error('GOOGLE_LOGIN_INSERT_ERROR:', JSON.stringify(insertError));
                            // Allow login even if insert fails, to debug
                            return true;
                        }
                    }
                } catch (error) {
                    console.error('GOOGLE_LOGIN_UNKNOWN_ERROR:', error);
                    return true;
                }
            }
            return true;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub!;
                // @ts-expect-error - role property is not standard in next-auth types
                session.user.role = token.role;
                // @ts-expect-error - vip fields
                session.user.isVip = token.isVip;
                // @ts-expect-error - vip fields
                session.user.vipExpireDate = token.vipExpireDate;
            }
            return session;
        },
        async jwt({ token, user, account }) {
            // Initial sign in
            if (user) {
                // For Credentials provider, user.role is already set in authorize()
                const userRole = (user as any).role;
                if (userRole) {
                    token.role = userRole;
                }
            }

            // Always fetch latest user data from DB to ensure role/VIP status is up to date
            // This runs on every session check, ensure it's efficient or consider caching strategy if high load
            if (token.email) {
                try {
                    const { createClient } = await import('@supabase/supabase-js');
                    const supabase = createClient(
                        process.env.NEXT_PUBLIC_SUPABASE_URL!,
                        process.env.SUPABASE_SERVICE_ROLE_KEY!
                    );

                    const { data: dbUser } = await supabase
                        .from('users')
                        .select('role, vipExpiresAt') // Assuming vipExpiresAt is the column name
                        .eq('email', token.email)
                        .single();

                    if (dbUser) {
                        token.role = dbUser.role;

                        // Calculate VIP status
                        const now = new Date();
                        const vipExpires = dbUser.vipExpiresAt ? new Date(dbUser.vipExpiresAt) : null;
                        const isVip = vipExpires ? vipExpires > now : false;

                        token.isVip = isVip;
                        token.vipExpireDate = vipExpires ? vipExpires.toISOString().split('T')[0] : null;
                    }
                } catch (error) {
                    console.error('Error refreshing token data:', error);
                }
            }

            return token;
        },
    },
    trustHost: true,
});
