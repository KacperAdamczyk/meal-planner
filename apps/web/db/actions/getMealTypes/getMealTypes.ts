import { db } from '@/db';
import { getCalendarHelper } from '@/db/actions/helpers';
import {
  MealType,
  User,
  calendars,
  mealTypes,
  sharedCalendars,
} from '@/db/schema';
import { eq } from 'drizzle-orm';

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
    .where(getCalendarHelper(user, calendarId))
    .innerJoin(mealTypes, eq(mealTypes.calendarId, calendars.id));
