import { db } from '@/db';
import { sharedCalendars } from '@/db/schema';
import { eq } from 'drizzle-orm';

export interface GetCalendarSharesResult {
  userId: string;
}

export const getCalendarShares = (
  calendarId: string,
): Promise<GetCalendarSharesResult[]> =>
  db
    .select({
      userId: sharedCalendars.userId,
    })
    .from(sharedCalendars)
    .where(eq(sharedCalendars.calendarId, calendarId));
