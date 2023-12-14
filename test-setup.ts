import { db, pool } from '@/db';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { afterAll, beforeAll } from 'bun:test';
import { seed } from '@/db/seed-data';
import { sql } from 'drizzle-orm';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';

let container: StartedPostgreSqlContainer | undefined;

beforeAll(async () => {
  container = await new PostgreSqlContainer().withDatabase('test-db').start();
  process.env.DATABASE_URL = container.getConnectionUri();

  console.log('Preparing test database...');
  await db.execute(sql`CREATE SCHEMA IF NOT EXISTS auth`);
  console.log('Migrating test database...');
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log('Seeding test database...');
  await seed();
});

afterAll(async () => {
  await pool.end();
  await container?.stop();
});
