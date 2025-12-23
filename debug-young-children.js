require('dotenv').config({ path: '.env.production' });
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URI || process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function checkYoungChildrenResources() {
    try {
        console.log('=== Checking Young Children Resources ===');

        // Check count for assigned_page = '幼儿英语'
        const countResult = await pool.query(`
            SELECT COUNT(*) 
            FROM resources 
            WHERE assigned_page = '幼儿英语'
        `);
        console.log(`\nTotal resources for '幼儿英语': ${countResult.rows[0].count}`);

        // Check published status
        const publishedCountResult = await pool.query(`
            SELECT COUNT(*) 
            FROM resources 
            WHERE assigned_page = '幼儿英语' AND is_published = true
        `);
        console.log(`Resources for '幼儿英语' (published): ${publishedCountResult.rows[0].count}`);

        // List some examples
        const examples = await pool.query(`
            SELECT id, title, assigned_page, is_published, category
            FROM resources 
            WHERE assigned_page = '幼儿英语'
            LIMIT 5
        `);

        console.log('\nExamples:');
        examples.rows.forEach(row => {
            console.log(JSON.stringify(row, null, 2));
        });

        // List all distinct assigned_page values to see if there's a mismatch
        const distinctPages = await pool.query(`
            SELECT DISTINCT assigned_page, COUNT(*)
            FROM resources
            GROUP BY assigned_page
        `);

        console.log('\nDistinct assigned_page values:');
        distinctPages.rows.forEach(row => {
            console.log(`${row.assigned_page}: ${row.count}`);
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await pool.end();
    }
}

checkYoungChildrenResources();
