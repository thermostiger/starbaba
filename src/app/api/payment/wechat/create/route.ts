import { NextRequest, NextResponse } from 'next/server';

// Sandbox configuration for WeChat Pay testing
// In production, replace with real merchant credentials
const SANDBOX_CONFIG = {
    enabled: true,
    mockPaymentSuccess: true, // Auto-succeed payments in sandbox
    mockDelay: 2000, // Simulate 2 second payment processing
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

        // Sandbox mode: Generate mock prepay_id
        if (SANDBOX_CONFIG.enabled) {
            const mockPrepayId = `wx_sandbox_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            // In sandbox, we'll simulate the payment flow
            return NextResponse.json({
                success: true,
                sandbox: true,
                prepay_id: mockPrepayId,
                qr_code_url: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=weixin://wxpay/bizpayurl?pr=${mockPrepayId}`,
                message: '沙箱模式：支付将在2秒后自动成功',
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
        // const wechatPay = new WeChatPay(config);
        // const result = await wechatPay.createOrder({ ... });

        return NextResponse.json(
            { error: '生产环境配置未完成' },
            { status: 501 }
        );
    } catch (error) {
        console.error('WeChat Pay create order error:', error);
        return NextResponse.json(
            { error: '创建订单失败' },
            { status: 500 }
        );
    }
}
