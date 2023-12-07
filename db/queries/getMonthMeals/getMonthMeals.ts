import { getDayMealsInBetween } from '@/db/queries/getDayMealsInBetween';
import { getMonthBoundary } from '@/db/helpers/getMonthBoundary';
import { DayMeal, User } from '@/db/schema';

export const getMonthMeals = (
  user: User,
  calendarId: string,
  year: number,
  month: number,
): Promise<DayMeal[]> => {
  const [monthStartISO, monthEndISO] = getMonthBoundary(month, year);

  return getDayMealsInBetween(user, calendarId, monthStartISO, monthEndISO);
};
