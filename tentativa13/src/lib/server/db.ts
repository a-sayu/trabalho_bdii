import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from '$env/static/private';

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 600000,
    connectTimeout: 30000,
    queueLimit: 0,
    enableKeepAlive: true,
});

/**
 * Executes a MySQL query, automatically acquiring and releasing a connection from the pool.
 * @param sql The SQL query string.
 * @param vals Optional values to escape placeholders in the query.
 * @returns The query results.
 */
export async function query<T>(sql: string, vals?: any[]): Promise<T> {
    try {
        const conn = await pool.getConnection();
        const [rows] = await pool.query(sql, vals);
        conn.release();
        return rows as T;
    } catch (e) {
        console.error('Database query error:', e);
        throw new Error('Database query failed');
    }
}