import { db } from '@/db';
import {
  Calendar,
  User,
  calendars,
  mealTypes,
  sharedCalendars,
} from '@/db/schema';
import { CreateCalendar } from '@/schemas/createCalendarSchema';

export const createCalendar = (
  user: User,
  { name, shared }: CreateCalendar,
): Promise<Calendar> => {
  return db.transaction(async (tx) => {
    const [calendar] = await tx
      .insert(calendars)
      .values({
        name,
        userId: user.id,
      })
      .returning();

    await tx
      .insert(sharedCalendars)
      .values(
        shared.map(({ userId }) => ({ calendarId: calendar.id, userId })),
      );

    await tx.insert(mealTypes).values([
      { name: 'Breakfast', calendarId: calendar.id },
      { name: 'Dinner', calendarId: calendar.id },
      { name: 'Supper', calendarId: calendar.id },
    ]);

    return calendar;
  });
};
