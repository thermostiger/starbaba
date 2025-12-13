import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

// Create a connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URI || process.env.DATABASE_URL,
})

export async function POST(request: NextRequest) {
    const client = await pool.connect()

    try {
        const data = await request.json()

        console.log('Creating resource with data:', data)

        // Start transaction
        await client.query('BEGIN')

        // Insert into resources table
        const insertQuery = `
            INSERT INTO resources (
                title,
                highlights,
                "resourceInfo",
                category,
                stage,
                price,
                region,
                "isEnglishAudio",
                "isHot",
                content,
                "createdAt",
                "updatedAt"
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
            RETURNING *
        `

        const values = [
            data.title,
            data.highlights,
            data.resourceInfo || '',
            data.category,
            data.stage,
            data.price,
            data.region || '',
            data.isEnglishAudio || false,
            data.isHot || false,
            data.content || '',
        ]

        const result = await client.query(insertQuery, values)
        const resource = result.rows[0]

        console.log('Resource created with ID:', resource.id)

        // Insert download links if provided
        if (data.downloadLinks && data.downloadLinks.length > 0) {
            for (const link of data.downloadLinks) {
                await client.query(
                    `INSERT INTO resource_download_links (resource_id, platform, url, password) 
                     VALUES ($1, $2, $3, $4)`,
                    [resource.id, link.platform, link.url, link.password || null]
                )
            }
        }

        // Commit transaction
        await client.query('COMMIT')

        console.log('Resource created successfully:', resource)

        return NextResponse.json({
            success: true,
            doc: resource,
        })
    } catch (error) {
        // Rollback on error
        await client.query('ROLLBACK')
        console.error('Failed to create resource:', error)
        return NextResponse.json(
            {
                success: false,
                error: (error as Error).message
            },
            { status: 500 }
        )
    } finally {
        client.release()
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const offset = (page - 1) * limit

        const result = await pool.query(
            `SELECT * FROM resources 
             ORDER BY "createdAt" DESC 
             LIMIT $1 OFFSET $2`,
            [limit, offset]
        )

        const countResult = await pool.query('SELECT COUNT(*) FROM resources')
        const totalDocs = parseInt(countResult.rows[0].count)

        return NextResponse.json({
            docs: result.rows,
            totalDocs,
            limit,
            page,
            totalPages: Math.ceil(totalDocs / limit),
        })
    } catch (error) {
        console.error('Failed to fetch resources:', error)
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        )
    }
}
