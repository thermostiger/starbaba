require('dotenv').config({ path: '.env.production' });
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URI || process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function fixPublishedStatus() {
    try {
        console.log('=== Fixing Published Status ===');

        // Check count of nulls
        const checkResult = await pool.query(`
            SELECT COUNT(*) 
            FROM resources 
            WHERE is_published IS NULL
        `);
        console.log(`Resources with null is_published: ${checkResult.rows[0].count}`);

        if (parseInt(checkResult.rows[0].count) > 0) {
            // Update nulls to true
            const updateResult = await pool.query(`
                UPDATE resources 
                SET is_published = true 
                WHERE is_published IS NULL
            `);
            console.log(`Updated ${updateResult.rowCount} resources to is_published = true`);
        } else {
            console.log('No resources need updating.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await pool.end();
    }
}

fixPublishedStatus();
