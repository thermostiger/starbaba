'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

function PaymentContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [processing, setProcessing] = useState(true);
    const [success, setSuccess] = useState(false);

    const method = searchParams.get('method');
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');

    useEffect(() => {
        // Simulate payment processing
        const timer = setTimeout(() => {
            setProcessing(false);
            setSuccess(true);

            // Auto redirect after 3 seconds
            setTimeout(() => {
                router.push('/');
            }, 3000);
        }, 2000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                    {processing ? '支付处理中...' : '支付成功！'}
                </CardTitle>
                <CardDescription>
                    沙箱测试环境
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {processing ? (
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-600">正在处理您的支付...</p>
                    </div>
                ) : success ? (
                    <div className="flex flex-col items-center space-y-4">
                        <CheckCircle2 className="w-20 h-20 text-green-500" />
                        <div className="text-center space-y-2">
                            <p className="text-lg font-semibold text-green-600">支付成功！</p>
                            <p className="text-sm text-gray-600">订单号: {orderId}</p>
                            <p className="text-sm text-gray-600">支付金额: ¥{amount}</p>
                            <p className="text-sm text-gray-600">支付方式: {method === 'wechat' ? '微信支付' : '支付宝'}</p>
                        </div>
                        <div className="w-full pt-4">
                            <p className="text-xs text-center text-gray-500">
                                3秒后自动跳转到首页...
                            </p>
                        </div>
                    </div>
                ) : null}

                <div className="pt-4 border-t">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-xs text-yellow-800">
                            <strong>沙箱模式提示：</strong> 这是测试环境，不会产生真实扣款。
                            在生产环境中，需要配置真实的支付商户账号。
                        </p>
                    </div>
                </div>

                <Button
                    onClick={() => router.push('/')}
                    className="w-full"
                    variant="outline"
                >
                    返回首页
                </Button>
            </CardContent>
        </Card>
    );
}

export default function PaymentSandboxPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4">
            <Suspense fallback={
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
                    <div className="w-12 h-12 mx-auto border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600">加载中...</p>
                </div>
            }>
                <PaymentContent />
            </Suspense>
        </div>
    );
}
