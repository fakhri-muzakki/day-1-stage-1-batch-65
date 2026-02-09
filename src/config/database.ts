import { Pool } from 'pg';
import env from './env';

export const pool = new Pool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.name,
  max: 10, // connection pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const connectDatabase = async () => {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();

    console.log('✅ PostgreSQL connected successfully');
  } catch (err) {
    console.error('❌ Failed to connect to PostgreSQL');
    throw err; // PENTING: bubble ke atas
  }
};
