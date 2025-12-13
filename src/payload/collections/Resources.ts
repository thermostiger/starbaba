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
            name: 'highlights',
            type: 'textarea',
            required: true,
            label: '资源亮点',
            admin: {
                description: '资源的主要亮点和特色',
            },
        },
        {
            name: 'resourceInfo',
            type: 'textarea',
            required: false,
            label: '资源信息',
            admin: {
                description: '资源的基本信息介绍',
            },
        },
        {
            name: 'coverImage',
            type: 'upload',
            relationTo: 'media',
            required: false,
            label: '封面图片',
        },
        {
            name: 'category',
            type: 'text',
            required: true,
            label: '资源类别',
            admin: {
                description: '例如：动画、绘本、儿歌、课程等',
            },
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
            name: 'region',
            type: 'text',
            label: '地区/国家',
            admin: {
                description: '例如：美国、英国、日本',
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
            label: '详情介绍',
            admin: {
                description: '资源的详细介绍，支持富文本编辑和图片上传',
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
