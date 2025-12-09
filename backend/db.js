import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const poolConfig = {
  connectionString: process.env.DATABASE_URL,
};

// Enable SSL for production environments (Render Postgres, Supabase, Neon require SSL)
if (process.env.NODE_ENV === 'production' || (process.env.DATABASE_URL && (process.env.DATABASE_URL.includes('render.com') || process.env.DATABASE_URL.includes('supabase.co') || process.env.DATABASE_URL.includes('neon.tech')))) {
  poolConfig.ssl = { rejectUnauthorized: false };
}

const pool = new Pool(poolConfig);

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export default pool;
