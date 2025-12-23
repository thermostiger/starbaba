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

        return NextResponse.json({
            doc: resource,
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

        // Check if resource exists and get current data
        const checkResult = await client.query('SELECT * FROM resources WHERE id = $1', [id])
        if (checkResult.rows.length === 0) {
            client.release()
            return NextResponse.json(
                { error: 'Resource not found' },
                { status: 404 }
            )
        }
        const currentResource = checkResult.rows[0]

        // Start transaction
        await client.query('BEGIN')

        // Check limitation for Weekly Hot
        if (data.is_weekly_hot === true && !currentResource.is_weekly_hot) {
            const hotCountResult = await client.query(
                `SELECT COUNT(*) FROM resources WHERE is_weekly_hot = true`
            )
            const hotCount = parseInt(hotCountResult.rows[0].count)

            if (hotCount >= 10) {
                await client.query('ROLLBACK')
                return NextResponse.json(
                    { error: '最多只能设置10个热门资源' },
                    { status: 400 }
                )
            }
        }

        // Update resources table
        const updateQuery = `
            UPDATE resources SET
                title = $1,
                highlights = $2,
                resource_info = $3,
                category = $4,
                assigned_page = $5,
                is_weekly_hot = $6,
                is_new = $7,
                content = $8,
                cover_image = $9,
                "is_published" = $10,
                updated_at = NOW()
            WHERE id = $11
            RETURNING *
        `

        const values = [
            data.title !== undefined ? data.title : currentResource.title,
            data.highlights !== undefined ? data.highlights : currentResource.highlights,
            data.resource_info !== undefined ? data.resource_info : (currentResource.resource_info || ''),
            data.category !== undefined ? data.category : currentResource.category,
            data.assigned_page !== undefined ? data.assigned_page : currentResource.assigned_page,
            data.is_weekly_hot !== undefined ? data.is_weekly_hot : currentResource.is_weekly_hot,
            data.is_new !== undefined ? data.is_new : currentResource.is_new,
            data.content !== undefined ? data.content : (currentResource.content || ''),
            data.cover_image !== undefined ? data.cover_image : (currentResource.cover_image || ''),
            data.is_published !== undefined ? data.is_published : currentResource.is_published,
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
        const { id } = await params

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
