import { pool } from '@/db';
import { seed } from '@/db/seed-data';

await seed();

await pool.end();
