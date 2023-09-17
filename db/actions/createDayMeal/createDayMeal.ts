import { db } from '@/db';
import { getCalendarHelper } from '@/db/actions/helpers';
import {
  DayMeal,
  User,
  calendars,
  dayMeals,
  sharedCalendars,
} from '@/db/schema';
import { CreateDayMeal } from '@/schemas/createDayMealSchema';
import { eq } from 'drizzle-orm';

export const createDayMeal = async (
  user: User,
  dayMeal: CreateDayMeal,
  calendarId: string,
  date: string,
): Promise<DayMeal> => {
  const calendar = (
    await db
      .select({ id: calendars.id })
      .from(calendars)
      .innerJoin(sharedCalendars, eq(calendars.id, sharedCalendars.calendarId))
      .where(getCalendarHelper(user, calendarId))
  ).at(0);

  if (!calendar) {
    throw new Error('Calendar not found');
  }

  const [newDayMeal] = await db
    .insert(dayMeals)
    .values({
      calendarId: calendar.id,
      date,
      mealId: dayMeal.meal,
      mealTypeId: dayMeal.mealType,
    })
    .returning();

  return newDayMeal;
};
