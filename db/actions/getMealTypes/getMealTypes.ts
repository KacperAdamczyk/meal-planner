import { db } from '@/db';
import {
  MealType,
  User,
  calendars,
  mealTypes,
  sharedCalendars,
} from '@/db/schema';
import { and, eq, or } from 'drizzle-orm';

export const getMealTypes = (
  user: User,
  calendarId: string,
): Promise<MealType[]> =>
  db
    .select({
      id: mealTypes.id,
      name: mealTypes.name,
      calendarId: mealTypes.calendarId,
    })
    .from(calendars)
    .leftJoin(sharedCalendars, eq(calendars.id, sharedCalendars.calendarId))
    .where(
      and(
        eq(calendars.id, calendarId),
        or(eq(calendars.userId, user.id), eq(sharedCalendars.userId, user.id)),
      ),
    )
    .innerJoin(mealTypes, eq(mealTypes.calendarId, calendars.id));
