import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { config } from 'dotenv';

config({
  path: '.env',
});
config({
  path: '.env.local',
});

const client = postgres(process.env.DATABASE_URL);
export const db = drizzle(client);
await migrate(db, { migrationsFolder: './drizzle' });
