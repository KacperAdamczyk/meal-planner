import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

import * as schema from './schema';
import { sharedCalendars } from './schema';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema, logger: true });
// await migrate(db, { migrationsFolder: './drizzle' });
//

const userId = 'e83a732a-bf74-4db2-b4d7-69a576a5b78b';
const shared = await db.query.sharedCalendars.findMany({
  where: (sharedCalendars, { eq }) => eq(sharedCalendars.userId, userId),
});

console.log(
  await db.query.calendars.findMany({
    with: {
      sharedCalendars: true,
    },
    where: (calendars, { eq, or, inArray }) =>
      or(
        eq(calendars.userId, userId),
        inArray(
          calendars.id,
          shared.map((s) => ({ id: s.calendarId })),
        ),
      ),
  }),
);
