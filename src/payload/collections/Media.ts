import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
    slug: 'media',
    upload: {
        staticDir: 'media',
        mimeTypes: ['image/*', 'video/*', 'audio/*', 'application/pdf'],
    },
    access: {
        read: () => true,
        create: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => !!user,
        delete: ({ req: { user } }) => user?.role === 'admin',
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            label: '替代文本',
        },
    ],
}
