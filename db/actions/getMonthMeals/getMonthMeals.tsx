import { db } from '@/db';
import { getCalendarHelper } from '@/db/actions/helpers';
import { getMonthBoundary } from '@/db/actions/helpers/getMonthBoundary';
import {
  DayMeal,
  User,
  calendars,
  dayMeals,
  sharedCalendars,
} from '@/db/schema';
import { and, between, eq } from 'drizzle-orm';

export const getMonthMeals = async (
  user: User,
  calendarId: string,
  year: number,
  month: number,
): Promise<DayMeal[]> => {
  const [monthStartISO, monthEndISO] = getMonthBoundary(month, year);

  return db
    .select({
      date: dayMeals.date,
      calendarId: dayMeals.calendarId,
      mealId: dayMeals.mealId,
      mealTypeId: dayMeals.mealTypeId,
    })
    .from(calendars)
    .leftJoin(sharedCalendars, eq(calendars.id, sharedCalendars.calendarId))
    .where(getCalendarHelper(user, calendarId))
    .innerJoin(dayMeals, eq(dayMeals.calendarId, calendars.id))
    .where(
      and(
        eq(dayMeals.calendarId, calendarId),
        between(dayMeals.date, monthStartISO, monthEndISO),
      ),
    );
};
