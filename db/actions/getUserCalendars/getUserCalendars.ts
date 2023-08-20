import { db } from '@/db';
import {
  Calendar,
  SharedCalendar,
  User,
  calendars,
  sharedCalendars,
} from '@/db/schema';
import { eq } from 'drizzle-orm';

export type UserCalendar = Pick<Calendar, 'id' | 'name'>;
interface GetUserCalendarsResult {
  calendars: UserCalendar[];
  sharedCalendars: UserCalendar[];
}

export const getUserCalendars = async (
  user: User,
): Promise<GetUserCalendarsResult> => ({
  calendars: await db
    .select({
      id: calendars.id,
      name: calendars.name,
    })
    .from(calendars)
    .where(eq(calendars.userId, user.id)),
  sharedCalendars: await db
    .select({
      id: calendars.id,
      name: calendars.name,
    })
    .from(sharedCalendars)
    .where(eq(sharedCalendars.userId, user.id))
    .innerJoin(calendars, eq(sharedCalendars.calendarId, calendars.id)),
});
