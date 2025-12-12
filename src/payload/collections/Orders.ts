import { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
    slug: 'orders',
    admin: {
        useAsTitle: 'id',
        defaultColumns: ['user', 'amount', 'paymentMethod', 'status', 'createdAt'],
    },
    access: {
        read: ({ req: { user } }) => {
            if (user?.role === 'admin') return true
            return {
                user: {
                    equals: user?.id,
                },
            }
        },
        create: () => true,
        update: ({ req: { user } }) => user?.role === 'admin',
        delete: ({ req: { user } }) => user?.role === 'admin',
    },
    fields: [
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            label: '用户',
        },
        {
            name: 'orderType',
            type: 'select',
            required: true,
            label: '订单类型',
            options: [
                { label: '单个资源', value: 'resource' },
                { label: 'VIP会员', value: 'membership' },
            ],
        },
        {
            name: 'resource',
            type: 'relationship',
            relationTo: 'resources',
            label: '购买资源',
            admin: {
                condition: (data) => data.orderType === 'resource',
            },
        },
        {
            name: 'membershipPlan',
            type: 'relationship',
            relationTo: 'membership-plans',
            label: '会员套餐',
            admin: {
                condition: (data) => data.orderType === 'membership',
            },
        },
        {
            name: 'amount',
            type: 'number',
            required: true,
            label: '订单金额（元）',
            min: 0,
        },
        {
            name: 'paymentMethod',
            type: 'select',
            required: true,
            label: '支付方式',
            options: [
                { label: '微信支付', value: 'wechat' },
                { label: '支付宝', value: 'alipay' },
            ],
        },
        {
            name: 'status',
            type: 'select',
            required: true,
            defaultValue: 'pending',
            label: '订单状态',
            options: [
                { label: '待支付', value: 'pending' },
                { label: '已支付', value: 'paid' },
                { label: '已取消', value: 'cancelled' },
                { label: '已退款', value: 'refunded' },
            ],
        },
        {
            name: 'transactionId',
            type: 'text',
            label: '交易流水号',
            admin: {
                description: '支付平台返回的交易ID',
            },
        },
        {
            name: 'paymentData',
            type: 'json',
            label: '支付数据',
            admin: {
                description: '支付平台返回的完整数据',
            },
        },
    ],
    timestamps: true,
    hooks: {
        afterChange: [
            async ({ doc, req, operation }) => {
                // When order is paid, grant access
                if (doc.status === 'paid' && operation === 'update') {
                    const { payload } = req

                    if (doc.orderType === 'resource' && doc.resource) {
                        // Add resource to user's purchased resources
                        await payload.update({
                            collection: 'users',
                            id: doc.user,
                            data: {
                                purchasedResources: {
                                    // @ts-ignore
                                    add: [doc.resource],
                                },
                            },
                        })
                    } else if (doc.orderType === 'membership' && doc.membershipPlan) {
                        // Update user to VIP
                        const plan = await payload.findByID({
                            collection: 'membership-plans',
                            id: doc.membershipPlan as string,
                        })

                        let vipExpiresAt: Date
                        const now = new Date()

                        if (plan.duration === '永久') {
                            vipExpiresAt = new Date('2099-12-31')
                        } else if (plan.duration === '年度') {
                            vipExpiresAt = new Date(now.setFullYear(now.getFullYear() + 1))
                        } else if (plan.duration === '3天') {
                            vipExpiresAt = new Date(now.setDate(now.getDate() + 3))
                        } else {
                            vipExpiresAt = new Date(now.setFullYear(now.getFullYear() + 1))
                        }

                        await payload.update({
                            collection: 'users',
                            id: doc.user,
                            data: {
                                role: 'vip',
                                vipExpiresAt: vipExpiresAt.toISOString(),
                            },
                        })
                    }
                }
            },
        ],
    },
}
