import pg from 'pg';
const { Pool, types } = pg;

pg.types.setTypeParser(types.builtins.NUMERIC, (val) => parseFloat(val));
pg.types.setTypeParser(types.builtins.DATE, (val) => val);

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

pool.on('connect', () => {
    console.log('Db Connection Established');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle Postgres client:', err.message);
});