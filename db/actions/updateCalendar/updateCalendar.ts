import { db } from '@/db';
import { User, calendars, sharedCalendars } from '@/db/schema';
import { CalendarSchema } from '@/schemas/calendarSchema';
import { eq, inArray } from 'drizzle-orm';

export const updateCalendar = async (
  user: User,
  calendarId: string,
  { name, shared }: CalendarSchema,
) => {
  const calendar = (
    await db.select().from(calendars).where(eq(calendars.id, calendarId))
  ).at(0);

  if (!calendar) {
    throw new Error('Calendar not found');
  }

  if (calendar.userId !== user.id) {
    throw new Error('Calendar does not belong to user');
  }

  return await db.transaction(async (tx) => {
    const [updated] = await tx
      .update(calendars)
      .set({
        name,
      })
      .where(eq(calendars.id, calendarId))
      .returning();

    const currentShared = await db
      .select()
      .from(sharedCalendars)
      .where(eq(sharedCalendars.calendarId, calendarId));

    const toAdd = shared.filter(
      ({ userId }) =>
        !currentShared.some(
          ({ userId: currentUserId }) => currentUserId === userId,
        ),
    );
    const toRemove = currentShared.filter(
      ({ userId }) =>
        !shared.some(({ userId: currentUserId }) => currentUserId === userId),
    );

    if (toAdd.length) {
      await tx
        .insert(sharedCalendars)
        .values(toAdd.map(({ userId }) => ({ calendarId, userId })));
    }

    if (toRemove.length) {
      await tx.delete(sharedCalendars).where(
        inArray(
          sharedCalendars.userId,
          toRemove.map(({ userId }) => userId),
        ),
      );
    }

    return updated;
  });
};
