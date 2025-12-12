import { CollectionConfig } from 'payload'

export const Resources: CollectionConfig = {
    slug: 'resources',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'category', 'stage', 'price', 'createdAt'],
    },
    access: {
        read: () => true, // Public read access
        create: ({ req: { user } }) => !!user, // Only authenticated users can create
        update: ({ req: { user } }) => !!user,
        delete: ({ req: { user } }) => !!user,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: '资源标题',
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
            label: '资源描述',
        },
        {
            name: 'coverImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: '封面图片',
        },
        {
            name: 'category',
            type: 'select',
            required: true,
            label: '资源类别',
            options: [
                { label: '动画', value: '动画' },
                { label: '绘本', value: '绘本' },
                { label: '儿歌', value: '儿歌' },
                { label: '课程', value: '课程' },
                { label: '听力', value: '听力' },
                { label: '视频', value: '视频' },
                { label: '阅读', value: '阅读' },
                { label: '纪录片', value: '纪录片' },
            ],
        },
        {
            name: 'stage',
            type: 'select',
            required: true,
            label: '适用阶段',
            options: [
                { label: '启蒙', value: '启蒙' },
                { label: '进阶', value: '进阶' },
                { label: '基础', value: '基础' },
                { label: '青少年', value: '青少年' },
                { label: '全年龄', value: '全年龄' },
            ],
        },
        {
            name: 'price',
            type: 'number',
            required: true,
            label: '价格（元）',
            defaultValue: 0,
            min: 0,
        },
        {
            name: 'vipPrice',
            type: 'number',
            required: true,
            label: 'VIP价格（元）',
            defaultValue: 0,
            min: 0,
        },
        {
            name: 'duration',
            type: 'text',
            label: '时长',
            admin: {
                description: '例如：50分钟',
            },
        },
        {
            name: 'isEnglishAudio',
            type: 'checkbox',
            label: '英文原声',
            defaultValue: true,
        },
        {
            name: 'content',
            type: 'richText',
            label: '详细内容',
            admin: {
                description: '资源的详细介绍内容',
            },
        },
        {
            name: 'downloadLinks',
            type: 'array',
            label: '下载链接',
            fields: [
                {
                    name: 'platform',
                    type: 'select',
                    required: true,
                    options: [
                        { label: '百度网盘', value: 'baidu' },
                        { label: '阿里云盘', value: 'aliyun' },
                        { label: '夸克网盘', value: 'quark' },
                    ],
                },
                {
                    name: 'url',
                    type: 'text',
                    required: true,
                    label: '链接地址',
                },
                {
                    name: 'password',
                    type: 'text',
                    label: '提取码',
                },
            ],
        },
        {
            name: 'isHot',
            type: 'checkbox',
            label: '热门资源',
            defaultValue: false,
            admin: {
                description: '标记为热门资源，将显示在首页轮播',
            },
        },
    ],
    timestamps: true,
}
