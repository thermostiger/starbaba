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
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub!;
                // @ts-expect-error - role property is not standard in next-auth types
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                // @ts-expect-error - role is added by our authorize function
                token.role = user.role;
            }
            return token;
        },
    },
    trustHost: true,
});
