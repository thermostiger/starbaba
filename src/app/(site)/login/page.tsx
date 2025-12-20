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
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    星爸英语
                </CardTitle>
                <CardDescription className="text-base">
                    登录即可享受更多会员权益
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {registered && (
                    <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg">
                        注册成功！请登录您的账号
                    </div>
                )}

                {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            邮箱地址
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            密码
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                        size="lg"
                    >
                        {loading ? '登录中...' : '登录'}
                    </Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-muted-foreground">
                            或使用第三方登录
                        </span>
                    </div>
                </div>

                <Button
                    onClick={handleGoogleSignIn}
                    variant="outline"
                    className="w-full relative"
                    size="lg"
                    disabled={isGoogleLoading || loading}
                >
                    {isGoogleLoading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                            <span>跳转中...</span>
                        </div>
                    ) : (
                        <span>使用 Google 登录</span>
                    )}
                </Button>

                <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                    disabled
                >
                    微信登录（开发中）
                </Button>

                <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                    disabled
                >
                    QQ登录（开发中）
                </Button>

                <div className="text-center text-sm text-gray-600">
                    还没有账号？{' '}
                    <Link href="/register" className="text-orange-500 hover:text-orange-600 font-medium">
                        立即注册
                    </Link>
                </div>

                <p className="text-xs text-center text-muted-foreground mt-6">
                    登录即表示您同意我们的服务条款和隐私政策
                </p>
            </CardContent>
        </Card>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 px-4">
            <Suspense fallback={
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
                    <div className="w-12 h-12 mx-auto border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600">加载中...</p>
                </div>
            }>
                <LoginForm />
            </Suspense>
        </div>
    );
}
