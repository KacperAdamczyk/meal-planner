import { db } from '@/db';
import { Calendar, User } from '@/db/schema';

export const getUserCalendar = async (
  user: User,
  calendarId: string,
): Promise<Calendar | undefined> => {
  const userSharedCalendars = await db.query.sharedCalendars.findMany({
    where: (sharedCalendars, { eq, and }) =>
      and(
        eq(sharedCalendars.calendarId, calendarId),
        eq(sharedCalendars.userId, user.id),
      ),
  });

  return db.query.calendars.findFirst({
    where: (calendars, { eq, or, inArray }) =>
      or(
        eq(calendars.id, calendarId),
        inArray(
          calendars.id,
          userSharedCalendars.map(({ calendarId }) => calendarId),
        ),
      ),
  });
};
