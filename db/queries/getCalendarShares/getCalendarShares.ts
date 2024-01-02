import { db } from '@/db';

export interface GetCalendarSharesResult {
  userId: string;
}

export const getCalendarShares = (
  calendarId: string,
): Promise<GetCalendarSharesResult[]> =>
  db.query.sharedCalendars.findMany({
    where: (sharedCalendars, { eq }) =>
      eq(sharedCalendars.calendarId, calendarId),
    columns: {
      userId: true,
    },
  });
