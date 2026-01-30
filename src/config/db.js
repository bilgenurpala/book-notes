const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT)
});

pool.connect((err, client, release) => {
    if (err) {
        console.log('Database error:', err.message);
    } else {
        console.log('PostgreSQL connected!');
        release();
    }
});

module.exports = pool;
