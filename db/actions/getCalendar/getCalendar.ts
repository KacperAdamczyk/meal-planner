import { db } from '@/db';
import { getCalendarHelper } from '@/db/actions/helpers';
import { Calendar, User, calendars, sharedCalendars } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const getCalendar = async (
  user: User,
  calendarId: string,
): Promise<Calendar | undefined> => {
  const calendar = (
    await db
      .select({
        id: calendars.id,
        name: calendars.name,
        userId: calendars.userId,
      })
      .from(calendars)
      .leftJoin(sharedCalendars, eq(sharedCalendars.calendarId, calendars.id))
      .where(getCalendarHelper(user, calendarId))
  ).at(0);

  return calendar;
};
