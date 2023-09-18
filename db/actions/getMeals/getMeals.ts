import { db } from '@/db';
import { getCalendarHelper } from '@/db/actions/helpers';
import {
  Meal,
  User,
  calendars,
  mealTypes,
  meals,
  sharedCalendars,
} from '@/db/schema';
import { eq } from 'drizzle-orm';

export interface GetMealsResult extends Meal {
  defaultMealType: string | null;
}

export const getMeals = (
  user: User,
  calendarId: string,
): Promise<GetMealsResult[]> =>
  db
    .select({
      id: meals.id,
      name: meals.name,
      calendarId: meals.calendarId,
      defaultMealTypeId: mealTypes.id,
      defaultMealType: mealTypes.name,
    })
    .from(calendars)
    .leftJoin(sharedCalendars, eq(calendars.id, sharedCalendars.calendarId))
    .where(getCalendarHelper(user, calendarId))
    .innerJoin(meals, eq(meals.calendarId, calendars.id))
    .leftJoin(mealTypes, eq(mealTypes.id, meals.defaultMealTypeId));
