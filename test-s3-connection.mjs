// Test S3/Supabase Storage connectivity
import { S3Client, ListBucketsCommand, PutObjectCommand } from '@aws-sdk/client-s3'

async function testS3Connection() {
    console.log('Testing S3/Supabase Storage connection...\n')

    const config = {
        bucket: process.env.S3_BUCKET,
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        region: process.env.S3_REGION || 'auto',
        endpoint: process.env.S3_ENDPOINT,
    }

    console.log('Configuration:')
    console.log('- Bucket:', config.bucket)
    console.log('- Region:', config.region)
    console.log('- Endpoint:', config.endpoint)
    console.log('- Access Key:', config.accessKeyId ? '✓ Set' : '✗ Missing')
    console.log('- Secret Key:', config.secretAccessKey ? '✓ Set' : '✗ Missing')
    console.log()

    if (!config.accessKeyId || !config.secretAccessKey || !config.bucket) {
        console.error('❌ Missing required S3 configuration')
        return
    }

    try {
        const s3Client = new S3Client({
            credentials: {
                accessKeyId: config.accessKeyId,
                secretAccessKey: config.secretAccessKey,
            },
            region: config.region,
            endpoint: config.endpoint,
            forcePathStyle: true,
        })

        console.log('Testing connection...')

        // Test 1: List buckets (may not work with Supabase)
        try {
            const listCommand = new ListBucketsCommand({})
            await s3Client.send(listCommand)
            console.log('✓ S3 connection successful')
        } catch (error) {
            console.log('ℹ List buckets not supported (normal for Supabase)')
        }

        // Test 2: Upload a test file
        try {
            const testContent = 'Test file from Payload CMS'
            const uploadCommand = new PutObjectCommand({
                Bucket: config.bucket,
                Key: 'test-connection.txt',
                Body: testContent,
                ContentType: 'text/plain',
            })

            await s3Client.send(uploadCommand)
            console.log('✓ Test file upload successful')
            console.log(`  File uploaded to: ${config.bucket}/test-connection.txt`)
        } catch (error) {
            console.error('❌ Test file upload failed:', error.message)
            if (error.Code) console.error('  Error code:', error.Code)
        }

        console.log('\n✅ S3 connectivity test complete')

    } catch (error) {
        console.error('❌ S3 connection failed:', error.message)
        if (error.Code) console.error('Error code:', error.Code)
    }
}

testS3Connection().catch(console.error)
