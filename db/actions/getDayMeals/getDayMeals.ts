import { db } from '@/db';
import { getCalendarHelper } from '@/db/actions/helpers';
import {
  DayMeal,
  User,
  calendars,
  dayMeals,
  meals,
  sharedCalendars,
} from '@/db/schema';
import { formatISO, set } from 'date-fns';
import { eq } from 'drizzle-orm';

export interface DayMealWithName extends DayMeal {
  name: string;
}

export const getDayMeals = async (
  user: User,
  calendarId: string,
  year: number,
  month: number,
  date: number,
): Promise<DayMealWithName[]> => {
  const day = set(new Date(), {
    year,
    month,
    date,
  });

  return db
    .select({
      date: dayMeals.date,
      calendarId: dayMeals.calendarId,
      mealId: dayMeals.mealId,
      mealTypeId: dayMeals.mealTypeId,
      name: meals.name,
    })
    .from(calendars)
    .leftJoin(sharedCalendars, eq(calendars.id, sharedCalendars.calendarId))
    .where(getCalendarHelper(user, calendarId))
    .innerJoin(dayMeals, eq(dayMeals.calendarId, calendars.id))
    .where(eq(dayMeals.date, formatISO(day, { representation: 'date' })))
    .innerJoin(meals, eq(meals.id, dayMeals.mealId));
};
