import 'dotenv/config';
import { pool } from "./config/dbConnection.js";

export async function testConnection() {
    const result = await pool.query('select NOW()');
    console.log(result.rows);
    pool.end();
}

testConnection();