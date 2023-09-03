import { Db } from '@/db';
import { User, calendars, sharedCalendars } from '@/db/schema';
import { and, eq, or } from 'drizzle-orm';

export const getCalendarHelper = (user: User, calendarId: string) =>
  and(
    eq(calendars.id, calendarId),
    or(eq(calendars.userId, user.id), eq(sharedCalendars.userId, user.id)),
  );
