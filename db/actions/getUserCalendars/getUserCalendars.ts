import { db } from '@/db';
import { Calendar, User } from '@/db/schema';
import { unstable_cache } from 'next/cache';

export type UserCalendar = Pick<Calendar, 'id' | 'name'>;
interface GetUserCalendarsResult {
  calendars: UserCalendar[];
  sharedCalendars: UserCalendar[];
}

export const getUserCalendars = unstable_cache(
  async (user: User): Promise<GetUserCalendarsResult> => ({
    calendars: await db.query.calendars.findMany({
      where: (calendars, { eq }) => eq(calendars.userId, user.id),
      columns: { id: true, name: true },
    }),
    sharedCalendars: (
      await db.query.sharedCalendars.findMany({
        where: (sharedCalendars, { eq }) => eq(sharedCalendars.userId, user.id),
        with: {
          calendar: {
            columns: { id: true, name: true },
          },
        },
      })
    ).map(({ calendar }) => calendar),
  }),
  ['getUserCalendars'],
);
