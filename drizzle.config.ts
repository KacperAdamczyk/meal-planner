import type { Config } from 'drizzle-kit';
import { config } from 'dotenv';

config({
  path: '.env.local',
});

export default {
  schema: './db/schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
