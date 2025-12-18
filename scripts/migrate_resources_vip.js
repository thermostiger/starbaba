const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URI || process.env.DATABASE_URL,
});

async function migrate() {
    const client = await pool.connect();
    try {
        console.log('Checking for is_vip column in resources table...');

        // Check if column exists
        const checkRes = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='resources' AND column_name='is_vip';
    `);

        if (checkRes.rows.length === 0) {
            console.log('Column is_vip does not exist. Adding it...');
            await client.query(`
        ALTER TABLE resources 
        ADD COLUMN "is_vip" BOOLEAN DEFAULT true;
      `);
            console.log('Column is_vip added successfully.');
        } else {
            console.log('Column is_vip already exists.');
        }

    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

migrate();
