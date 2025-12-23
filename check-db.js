const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URI || process.env.DATABASE_URL,
});

async function checkDatabase() {
    try {
        console.log('=== Checking database schema ===');

        // Check table structure
        const schemaResult = await pool.query(`
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_name = 'resources'
            ORDER BY ordinal_position;
        `);

        console.log('\nResources table columns:');
        schemaResult.rows.forEach(row => {
            console.log(`  ${row.column_name}: ${row.data_type} (nullable: ${row.is_nullable})`);
        });

        // Check if data exists
        const countResult = await pool.query('SELECT COUNT(*) FROM resources');
        console.log(`\nTotal resources: ${countResult.rows[0].count}`);

        // Check weekly hot resources
        const hotResult = await pool.query(`
            SELECT id, title, is_weekly_hot, is_new, is_published, cover_image, created_at
            FROM resources
            WHERE is_weekly_hot = true
            LIMIT 5
        `);
        console.log(`\nWeekly hot resources (is_weekly_hot = true): ${hotResult.rows.length}`);
        hotResult.rows.forEach(row => {
            console.log(`  ID ${row.id}: ${row.title}`);
            console.log(`    - is_weekly_hot: ${row.is_weekly_hot}`);
            console.log(`    - is_published: ${row.is_published}`);
            console.log(`    - cover_image: ${row.cover_image ? 'exists' : 'NULL'}`);
            console.log(`    - created_at: ${row.created_at ? 'exists' : 'NULL'}`);
        });

        // Check all resources
        const allResult = await pool.query(`
            SELECT id, title, is_weekly_hot, is_new, is_published
            FROM resources
            LIMIT 10
        `);
        console.log(`\nAll resources (first 10):`);
        allResult.rows.forEach(row => {
            console.log(`  ID ${row.id}: ${row.title} (hot: ${row.is_weekly_hot}, new: ${row.is_new}, published: ${row.is_published})`);
        });

    } catch (error) {
        console.error('Error:', error.message);
        console.error('Stack:', error.stack);
    } finally {
        await pool.end();
    }
}

checkDatabase();
