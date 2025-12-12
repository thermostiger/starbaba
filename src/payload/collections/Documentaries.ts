import { CollectionConfig } from 'payload'

export const Documentaries: CollectionConfig = {
    slug: 'documentaries',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'subtitle', 'duration', 'createdAt'],
    },
    access: {
        read: () => true,
        create: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => !!user,
        delete: ({ req: { user } }) => !!user,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: '纪录片标题',
        },
        {
            name: 'subtitle',
            type: 'text',
            required: true,
            label: '副标题',
        },
        {
            name: 'coverImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: '封面图片',
        },
        {
            name: 'duration',
            type: 'text',
            required: true,
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
            name: 'description',
            type: 'richText',
            label: '详细介绍',
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
            label: '热门纪录片',
            defaultValue: false,
        },
    ],
    timestamps: true,
}
