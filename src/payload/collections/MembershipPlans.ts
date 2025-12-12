import { CollectionConfig } from 'payload'

export const MembershipPlans: CollectionConfig = {
    slug: 'membership-plans',
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'duration', 'price', 'highlighted'],
    },
    access: {
        read: () => true,
        create: ({ req: { user } }) => user?.role === 'admin',
        update: ({ req: { user } }) => user?.role === 'admin',
        delete: ({ req: { user } }) => user?.role === 'admin',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: '套餐名称',
        },
        {
            name: 'duration',
            type: 'select',
            required: true,
            label: '会员时长',
            options: [
                { label: '3天', value: '3天' },
                { label: '年度', value: '年度' },
                { label: '永久', value: '永久' },
            ],
        },
        {
            name: 'price',
            type: 'number',
            required: true,
            label: '价格（元）',
            min: 0,
        },
        {
            name: 'originalPrice',
            type: 'number',
            label: '原价（元）',
            admin: {
                description: '用于显示划线价格',
            },
        },
        {
            name: 'features',
            type: 'array',
            required: true,
            label: '会员权益',
            fields: [
                {
                    name: 'feature',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'highlighted',
            type: 'checkbox',
            label: '推荐套餐',
            defaultValue: false,
            admin: {
                description: '标记为推荐套餐，将高亮显示',
            },
        },
        {
            name: 'description',
            type: 'richText',
            label: '套餐说明',
        },
    ],
    timestamps: true,
}
