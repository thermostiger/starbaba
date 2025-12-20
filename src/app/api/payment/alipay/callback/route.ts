import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';

// Sandbox webhook handler for Alipay
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Sandbox mode: Auto-process successful payments
        if (body.sandbox) {
            const payload = await getPayload({ config });

            // Create order in database
            const order = await payload.create({
                collection: 'orders',
                data: {
                    user: body.userId,
                    orderType: body.orderType,
                    resource: body.resourceId || undefined,
                    membershipPlan: body.membershipPlanId || undefined,
                    amount: body.amount,
                    paymentMethod: 'alipay',
                    status: 'paid',
                    transactionId: body.order_id,
                    paymentData: body,
                },
            });

            return NextResponse.json({
                success: true,
                sandbox: true,
                order,
                message: '沙箱支付成功',
            });
        }

        // Production webhook verification would go here

        return NextResponse.json(
            { error: '生产环境配置未完成' },
            { status: 501 }
        );
    } catch (error) {
        console.error('Alipay callback error:', error);
        return NextResponse.json(
            { error: '处理回调失败' },
            { status: 500 }
        );
    }
}
