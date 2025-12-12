import { NextRequest, NextResponse } from 'next/server';

// Sandbox configuration for Alipay testing
const SANDBOX_CONFIG = {
    enabled: true,
    mockPaymentSuccess: true,
    mockDelay: 2000,
};

export async function POST(request: NextRequest) {
    try {
        const { amount, orderType, resourceId, membershipPlanId, userId } = await request.json();

        if (!amount || !orderType || !userId) {
            return NextResponse.json(
                { error: '缺少必填参数' },
                { status: 400 }
            );
        }

        // Sandbox mode: Generate mock payment URL
        if (SANDBOX_CONFIG.enabled) {
            const mockOrderId = `alipay_sandbox_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const mockPaymentUrl = `/payment/sandbox?method=alipay&orderId=${mockOrderId}&amount=${amount}`;

            return NextResponse.json({
                success: true,
                sandbox: true,
                order_id: mockOrderId,
                payment_url: mockPaymentUrl,
                qr_code_url: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(mockPaymentUrl)}`,
                message: '沙箱模式：点击支付链接将自动成功',
                order: {
                    orderType,
                    amount,
                    resourceId,
                    membershipPlanId,
                    userId,
                },
            });
        }

        // Production code would go here
        // const alipay = new Alipay(config);
        // const result = await alipay.pageExecute(...);

        return NextResponse.json(
            { error: '生产环境配置未完成' },
            { status: 501 }
        );
    } catch (error: any) {
        console.error('Alipay create order error:', error);
        return NextResponse.json(
            { error: '创建订单失败' },
            { status: 500 }
        );
    }
}
