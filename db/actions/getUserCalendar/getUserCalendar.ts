import { db } from '@/db';
import { Calendar, User } from '@/db/schema';

export const getUserCalendar = async (
  user: User,
  calendarId: string,
): Promise<Calendar | undefined> => {
  const calendar = await db.query.calendars.findFirst({
    where: (calendars, { eq }) => eq(calendars.id, calendarId),
    with: {
      sharedCalendars: {
        where: (sharedCalendars, { eq }) => eq(sharedCalendars.userId, user.id),
      },
    },
  });

  if (calendar?.userId !== user.id && !calendar?.sharedCalendars.length) {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { sharedCalendars, ...restCalendar } = calendar;

  return restCalendar;
};
