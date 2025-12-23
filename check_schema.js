const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URI || process.env.DATABASE_URL,
});

async function checkSchema() {
    try {
        const res = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'resources';
    `);
        console.log('Columns in resources table:');
        res.rows.forEach(row => console.log(`${row.column_name}: ${row.data_type}`));
    } catch (err) {
        console.error('Error querying schema:', err);
    } finally {
        await pool.end();
    }
}

checkSchema();
