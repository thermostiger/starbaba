'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const registered = searchParams.get('registered');
    const verified = searchParams.get('verified');

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                setError('邮箱或密码错误');
            } else {
                router.push('/');
                router.refresh();
            }
        } catch {
            setError('登录失败，请稍后重试');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        try {
            await signIn('google', {
                callbackUrl: '/',
                redirect: true,
            });
        } catch (error) {
            console.error('Google login error:', error);
            setError('Google 登录失败，请稍后重试');
            setIsGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <Card className="w-full max-w-md shadow-lg border-slate-100">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-3xl font-bold text-blue-900">
                        K12Shelf
                    </CardTitle>
                    <CardDescription className="text-base text-slate-500">
                        登录即可享受更多会员权益
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {registered && (
                        <div className="p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg">
                            {verified === 'false'
                                ? '注册成功！请前往邮箱查收确认邮件以激活账号'
                                : '注册成功！请登录您的账号'}
                        </div>
                    )}

                    {error && (
                        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-slate-700">
                                邮箱地址
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-slate-700">
                                密码
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-800 hover:bg-blue-900 text-white font-medium shadow-md hover:shadow-lg transition-all"
                            size="lg"
                        >
                            {loading ? '登录中...' : '登录'}
                        </Button>
                    </form>

                    <div className="relative my-2">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-slate-500">
                                或使用第三方登录
                            </span>
                        </div>
                    </div>

                    <Button
                        onClick={handleGoogleSignIn}
                        variant="outline"
                        className="w-full relative border-slate-300 hover:bg-slate-50"
                        size="lg"
                        disabled={isGoogleLoading || loading}
                    >
                        {isGoogleLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                <span>跳转中...</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                <span>使用 Google 登录</span>
                            </div>
                        )}
                    </Button>

                    <div className="text-center text-sm text-slate-600 mt-2">
                        还没有账号？{' '}
                        <Link href="/register" className="text-amber-500 hover:text-amber-600 font-bold hover:underline">
                            立即注册
                        </Link>
                    </div>

                    <p className="text-xs text-center text-slate-400 mt-6">
                        登录即表示您同意我们的<Link href="/terms" className="hover:text-slate-600 underline">用户协议</Link>和<Link href="/privacy" className="hover:text-slate-600 underline">隐私政策</Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
                    <div className="w-12 h-12 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-slate-600">加载中...</p>
                </div>
            </div>
        }>
            <LoginForm />
        </Suspense>
    );
}
