import { db, pool } from '@/db';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { afterAll, beforeAll } from 'bun:test';
import { seed } from '@/db/seed-data';
import { sql } from 'drizzle-orm';

beforeAll(async () => {
  await db.execute(sql`CREATE SCHEMA IF NOT EXISTS auth`);
  console.log('Migrating test database...');
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log('Seeding test database...');
  await seed();
});

afterAll(async () => {
  await pool.end();
});
