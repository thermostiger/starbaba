import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

// Create a connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URI || process.env.DATABASE_URL,
})

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        console.log('Fetching resource with ID:', id)

        const result = await pool.query(
            'SELECT * FROM resources WHERE id = $1',
            [id]
        )

        if (result.rows.length === 0) {
            console.log('Resource not found:', id)
            return NextResponse.json(
                { error: 'Resource not found' },
                { status: 404 }
            )
        }

        const resource = result.rows[0]
        console.log('Resource found:', resource.title)

        // Return resource with empty download links (table doesn't exist yet)
        const downloadLinks = {
            baidu: '',
            aliyun: '',
            quark: '',
        }

        console.log('Returning resource')
        return NextResponse.json({
            doc: {
                ...resource,
                downloadLinks,
            },
        })
    } catch (error) {
        console.error('Failed to fetch resource:', error)
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        )
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const client = await pool.connect()

    try {
        const { id } = await params
        const data = await request.json()

        console.log('Updating resource:', id, data)

        // Start transaction
        await client.query('BEGIN')

        // Update resources table
        const updateQuery = `
            UPDATE resources SET
                title = $1,
                highlights = $2,
                "resourceInfo" = $3,
                category = $4,
                stage = $5,
                price = $6,
                region = $7,
                "isEnglishAudio" = $8,
                "isHot" = $9,
                content = $10,
                "updatedAt" = NOW()
            WHERE id = $11
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
            id,
        ]

        const result = await client.query(updateQuery, values)

        if (result.rows.length === 0) {
            await client.query('ROLLBACK')
            return NextResponse.json(
                { error: 'Resource not found' },
                { status: 404 }
            )
        }

        const resource = result.rows[0]

        // Skip download links update (table doesn't exist yet)
        // TODO: Create resource_download_links table and uncomment this code

        // Commit transaction
        await client.query('COMMIT')

        console.log('Resource updated successfully')

        return NextResponse.json({
            success: true,
            doc: resource,
        })
    } catch (error) {
        // Rollback on error
        await client.query('ROLLBACK')
        console.error('Failed to update resource:', error)
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

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const client = await pool.connect()

    try {
        const id = params.id

        // Start transaction
        await client.query('BEGIN')

        // Skip download links deletion (table doesn't exist yet)

        // Delete resource
        const result = await client.query(
            'DELETE FROM resources WHERE id = $1 RETURNING *',
            [id]
        )

        if (result.rows.length === 0) {
            await client.query('ROLLBACK')
            return NextResponse.json(
                { error: 'Resource not found' },
                { status: 404 }
            )
        }

        // Commit transaction
        await client.query('COMMIT')

        return NextResponse.json({
            success: true,
        })
    } catch (error) {
        // Rollback on error
        await client.query('ROLLBACK')
        console.error('Failed to delete resource:', error)
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        )
    } finally {
        client.release()
    }
}
