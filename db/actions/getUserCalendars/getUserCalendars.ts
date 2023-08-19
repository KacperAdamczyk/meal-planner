import { db } from '@/db';
import {
  Calendar,
  SharedCalendar,
  User,
  calendars,
  sharedCalendars,
} from '@/db/schema';
import { eq } from 'drizzle-orm';

interface GetUserCalendarsResult {
  calendars: Calendar[];
  sharedCalendars: SharedCalendar[];
}

export const getUserCalendars = async (
  user: User,
): Promise<GetUserCalendarsResult> => ({
  calendars: await db
    .select()
    .from(calendars)
    .where(eq(calendars.userId, user.id)),
  sharedCalendars: await db
    .select()
    .from(sharedCalendars)
    .where(eq(sharedCalendars.userId, user.id)),
});
