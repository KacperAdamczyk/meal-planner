import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/postgres-js';
import { config } from 'dotenv';

config({
  path: '.env',
});
config({
  path: '.env.local',
});

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool);
await migrate(db, { migrationsFolder: './drizzle' });
