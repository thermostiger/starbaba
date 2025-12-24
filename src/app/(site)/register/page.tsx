'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password.length < 8) {
            setError('密码至少需要8个字符');
            return;
        }

        setLoading(true);

        try {
            const { createClient } = await import('@/lib/supabase/client');
            const supabase = createClient();

            const { data, error: signUpError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });

            if (signUpError) {
                throw new Error(signUpError.message);
            }

            if (data?.user) {
                // Redirect to login page with success message
                router.push('/login?registered=true&verified=false');
            }
        } catch (err) {
            setError((err as Error).message || '注册失败，请稍后重试');
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
        <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
            {/* Left Column: Decorative Panel (Hidden on mobile) */}
            <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-800 to-indigo-900 p-12 text-white">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold">星爸英语</h1>
                    <p className="text-lg opacity-90">
                        加入我们，开启孩子快乐的英语启蒙之旅。海量优质资源，陪伴孩子成长。
                    </p>
                </div>
                <div className="space-y-2 opacity-80 text-sm">
                    <p>© 2024 Starbaba English. All rights reserved.</p>
                </div>
            </div>

            {/* Right Column: Registration Form */}
            <div className="flex items-center justify-center p-8 bg-slate-50">
                <div className="mx-auto w-full max-w-sm space-y-6 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="space-y-2 text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-slate-900">创建账号</h2>
                        <p className="text-slate-500">
                            输入您的信息以开始使用
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-slate-700">
                                邮箱地址
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-slate-700">
                                密码
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    minLength={8}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent pr-10 outline-none transition-all"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="h-4 w-4" />
                                    ) : (
                                        <EyeIcon className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            <p className="text-xs text-slate-500">
                                密码至少需要8个字符
                            </p>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-800 hover:bg-blue-900 text-white font-medium"
                            size="lg"
                        >
                            {loading ? '注册中...' : '注册'}
                        </Button>

                        <div className="relative my-4">
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
                            type="button"
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
                                <span>使用 Google 登录</span>
                            )}
                        </Button>

                        <div className="text-center text-sm text-slate-600 mt-4">
                            已有账号？{' '}
                            <Link href="/login" className="text-blue-700 hover:text-blue-800 font-medium hover:underline">
                                立即登录
                            </Link>
                        </div>

                        <p className="text-xs text-center text-slate-400 mt-6">
                            注册即表示您同意我们的服务条款和隐私政策
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

function EyeIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}

function EyeOffIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
            <line x1="2" x2="22" y1="2" y2="22" />
        </svg>
    )
}
