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
                assigned_page,
                price,
                "isWeeklyHot",
                "isNew",
                content,
                "coverImage",
                "resourceUrl",
                "createdAt",
                "updatedAt"
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())
            RETURNING *
        `

        const values = [
            data.title,
            data.highlights,
            data.resourceInfo || '',
            data.category,
            data.assignedPage,
            data.price,
            data.isWeeklyHot || false,
            data.isNew || false,
            data.content || '',
            data.coverImage || '',
            data.resourceUrl || '',
        ]

        const result = await client.query(insertQuery, values)
        const resource = result.rows[0]

        console.log('Resource created with ID:', resource.id)

        // Skip download links insertion (table doesn't exist yet)
        // TODO: Create resource_download_links table and uncomment this code

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
        const assignedPage = searchParams.get('assignedPage')
        const offset = (page - 1) * limit

        let query = 'SELECT * FROM resources'
        let countQuery = 'SELECT COUNT(*) FROM resources'
        const queryParams: any[] = []
        const countParams: any[] = []

        // Add assignedPage filter if provided
        if (assignedPage) {
            query += ' WHERE assigned_page = $1'
            countQuery += ' WHERE assigned_page = $1'
            queryParams.push(assignedPage)
            countParams.push(assignedPage)
        }

        query += ' ORDER BY "createdAt" DESC LIMIT $' + (queryParams.length + 1) + ' OFFSET $' + (queryParams.length + 2)
        queryParams.push(limit, offset)

        const result = await pool.query(query, queryParams)
        const countResult = await pool.query(countQuery, countParams)
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
