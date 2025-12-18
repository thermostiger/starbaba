import { Pool } from 'pg'

// Create a singleton connection pool for Next.js
// This prevents multiple pools from being created during hot reloads in development
let pool: Pool

if (process.env.NODE_ENV === 'production') {
    pool = new Pool({
        connectionString: process.env.DATABASE_URI || process.env.DATABASE_URL,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    })
} else {
    // @ts-ignore
    if (!global.pool) {
        // @ts-ignore
        global.pool = new Pool({
            connectionString: process.env.DATABASE_URI || process.env.DATABASE_URL,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        })
    }
    // @ts-ignore
    pool = global.pool
}

export { pool }
