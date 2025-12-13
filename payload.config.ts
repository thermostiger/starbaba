import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Resources } from './src/payload/collections/Resources'
import { Documentaries } from './src/payload/collections/Documentaries'
import { Users } from './src/payload/collections/Users'
import { Orders } from './src/payload/collections/Orders'
import { MembershipPlans } from './src/payload/collections/MembershipPlans'
import { Media } from './src/payload/collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
        meta: {
            titleSuffix: '- 星爸英语后台',
        },
    },
    collections: [
        Users,
        Resources,
        Documentaries,
        MembershipPlans,
        Orders,
        Media,
    ],
    editor: lexicalEditor({}),
    secret: process.env.PAYLOAD_SECRET || 'your-secret-key-here',
    typescript: {
        outputFile: path.resolve(dirname, 'src/payload-types.ts'),
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URI || process.env.DATABASE_URL,
        },
    }),
    sharp,
    plugins: [
        s3Storage({
            collections: {
                media: true,
            },
            bucket: process.env.S3_BUCKET || '',
            config: {
                credentials: {
                    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
                    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
                },
                region: process.env.S3_REGION || 'ap-southeast-1',
            },
        }),
    ],
})
