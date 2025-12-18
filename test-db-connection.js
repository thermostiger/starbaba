const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Simple .env parser since we might not have dotenv installed/configured in this script context
function loadEnv(filePath) {
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        content.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim().replace(/^["']|["']$/g, '');
                process.env[key] = value;
            }
        });
    }
}

loadEnv(path.join(process.cwd(), '.env.local'));
// Fallback to .env
loadEnv(path.join(process.cwd(), '.env'));

console.log('Connecting to DB...');
// Mask password in log
const connStr = process.env.DATABASE_URI || process.env.DATABASE_URL;
if (!connStr) {
    console.error('No connection string found in .env.local or .env');
    process.exit(1);
}
console.log('Host:', connStr.split('@')[1]);

const pool = new Pool({
    connectionString: connStr,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting:', err);
    } else {
        console.log('Success! Database time:', res.rows[0].now);
    }
    pool.end();
});
