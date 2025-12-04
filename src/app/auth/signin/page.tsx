'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 px-4">
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
                    <Button
                        onClick={() => signIn('google', { callbackUrl: '/' })}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                        size="lg"
                    >
                        使用 Google 登录
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-muted-foreground">
                                更多登录方式
                            </span>
                        </div>
                    </div>

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

                    <p className="text-xs text-center text-muted-foreground mt-6">
                        登录即表示您同意我们的服务条款和隐私政策
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
