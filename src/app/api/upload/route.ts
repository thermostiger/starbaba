import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { randomBytes } from 'crypto'

// Initialize S3 client
const s3Client = new S3Client({
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
    region: process.env.S3_REGION || 'ap-southeast-1',
    ...(process.env.S3_ENDPOINT && { endpoint: process.env.S3_ENDPOINT }),
})

const BUCKET_NAME = process.env.S3_BUCKET || ''

// Allowed file types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime']
const ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES]

// Max file size: 100MB
const MAX_FILE_SIZE = 100 * 1024 * 1024

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            )
        }

        // Validate file type
        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json(
                { error: `Invalid file type. Allowed types: ${ALLOWED_TYPES.join(', ')}` },
                { status: 400 }
            )
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: `File too large. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB` },
                { status: 400 }
            )
        }

        // Generate unique filename
        const timestamp = Date.now()
        const randomString = randomBytes(8).toString('hex')
        const extension = file.name.split('.').pop()
        const filename = `uploads/${timestamp}-${randomString}.${extension}`

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        // Upload to S3
        const uploadCommand = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: filename,
            Body: buffer,
            ContentType: file.type,
        })


        await s3Client.send(uploadCommand)

        // Construct public URL
        let publicUrl: string
        if (process.env.S3_ENDPOINT) {
            // For S3-compatible services (like Supabase Storage)
            publicUrl = `${process.env.S3_ENDPOINT}/${BUCKET_NAME}/${filename}`
        } else {
            // For AWS S3
            publicUrl = `https://${BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${filename}`
        }

        console.log('Upload successful:', {
            filename,
            publicUrl,
            bucket: BUCKET_NAME,
            region: process.env.S3_REGION,
            endpoint: process.env.S3_ENDPOINT,
        })

        return NextResponse.json({
            success: true,
            url: publicUrl,
            filename,
            size: file.size,
            type: file.type,
        })

    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json(
            { error: 'Upload failed: ' + (error as Error).message },
            { status: 500 }
        )
    }
}
