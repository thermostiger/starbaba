import { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
    slug: 'users',
    auth: true,
    admin: {
        useAsTitle: 'email',
        defaultColumns: ['email', 'name', 'role', 'vipExpiresAt'],
    },
    access: {
        read: () => true,
        create: () => true, // Allow public registration
        update: ({ req: { user } }) => !!user,
        delete: ({ req: { user } }) => user?.role === 'admin',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            label: '用户名',
        },
        {
            name: 'role',
            type: 'select',
            required: true,
            defaultValue: 'user',
            label: '用户角色',
            options: [
                { label: '普通用户', value: 'user' },
                { label: 'VIP会员', value: 'vip' },
                { label: '管理员', value: 'admin' },
            ],
            access: {
                update: ({ req: { user } }) => user?.role === 'admin',
            },
        },
        {
            name: 'provider',
            type: 'select',
            label: '登录方式',
            options: [
                { label: 'Email', value: 'email' },
                { label: 'Google', value: 'google' },
                { label: 'WeChat', value: 'wechat' },
                { label: 'QQ', value: 'qq' },
            ],
            defaultValue: 'email',
        },
        {
            name: 'providerId',
            type: 'text',
            label: '第三方ID',
            admin: {
                description: 'OAuth provider user ID',
            },
        },
        {
            name: 'vipExpiresAt',
            type: 'date',
            label: 'VIP到期时间',
            admin: {
                description: 'VIP会员到期时间，为空表示非VIP用户',
            },
        },
        {
            name: 'purchasedResources',
            type: 'relationship',
            relationTo: 'resources',
            hasMany: true,
            label: '已购买资源',
            admin: {
                description: '用户单独购买的资源列表',
            },
        },
    ],
    timestamps: true,
}
