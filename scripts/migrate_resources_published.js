const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });


const pool = new Pool({
    connectionString: process.env.DATABASE_URI || process.env.DATABASE_URL,
});

console.log('DEBUG: DATABASE_URI:', process.env.DATABASE_URI ? 'Set' : 'Unset');
console.log('DEBUG: DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Unset');
if (process.env.DATABASE_URI) console.log('DEBUG: URI starts with:', process.env.DATABASE_URI.substring(0, 10));
if (process.env.DATABASE_URL) console.log('DEBUG: URL starts with:', process.env.DATABASE_URL.substring(0, 10));


async function migrate() {
    const client = await pool.connect();
    try {
        console.log('Checking for is_published column in resources table...');

        // Check if column exists
        const checkRes = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='resources' AND column_name='is_published';
    `);

        if (checkRes.rows.length === 0) {
            console.log('Column is_published does not exist. Adding it...');
            await client.query(`
        ALTER TABLE resources 
        ADD COLUMN "is_published" BOOLEAN DEFAULT true;
      `);
            console.log('Column is_published added successfully.');
        } else {
            console.log('Column is_published already exists.');
        }

    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

migrate();
