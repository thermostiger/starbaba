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
            doc: {
                ...resource,
                // Map snake_case database fields to camelCase for frontend if needed
                // But looking at the POST route and general usage, frontend seems to handle what it gets
                // Explicitly mapping assigned_page to assignedPage to match frontend state
                assignedPage: resource.assigned_page,
                // Ensure boolean fields are booleans
                isWeeklyHot: !!resource.isWeeklyHot,
                isNew: !!resource.isNew,
                isPublished: resource.is_published,
                isVip: resource.is_vip,
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

        // Update resources table
        const updateQuery = `
            UPDATE resources SET
                title = $1,
                highlights = $2,
                "resourceInfo" = $3,
                category = $4,
                assigned_page = $5,
                price = $6,
                "isWeeklyHot" = $7,
                "isNew" = $8,
                content = $9,
                "coverImage" = $10,
                "resourceUrl" = $11,
                "is_published" = $12,
                "is_vip" = $13,
                "updatedAt" = NOW()
            WHERE id = $14
            RETURNING *
        `

        const values = [
            data.title !== undefined ? data.title : currentResource.title,
            data.highlights !== undefined ? data.highlights : currentResource.highlights,
            data.resourceInfo !== undefined ? data.resourceInfo : (currentResource.resourceInfo || ''),
            data.category !== undefined ? data.category : currentResource.category,
            data.assignedPage !== undefined ? data.assignedPage : currentResource.assigned_page,
            data.price !== undefined ? data.price : currentResource.price,
            data.isWeeklyHot !== undefined ? data.isWeeklyHot : currentResource.isWeeklyHot,
            data.isNew !== undefined ? data.isNew : currentResource.isNew,
            data.content !== undefined ? data.content : (currentResource.content || ''),
            data.coverImage !== undefined ? data.coverImage : (currentResource.coverImage || ''),
            data.resourceUrl !== undefined ? data.resourceUrl : (currentResource.resourceUrl || ''),
            data.isPublished !== undefined ? data.isPublished : currentResource.is_published,
            data.isVip !== undefined ? data.isVip : currentResource.is_vip,
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
            doc: {
                ...resource,
                assignedPage: resource.assigned_page,
                isPublished: resource.is_published,
                isVip: resource.is_vip,
            },
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
