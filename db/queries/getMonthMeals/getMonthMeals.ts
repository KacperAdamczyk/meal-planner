import { getDayMealsInBetween } from '@/db/queries/getDayMealsInBetween';
import { getMonthBoundary } from '@/db/helpers/getMonthBoundary';
import { User } from '@/db/schema';
import { DayMealWithName } from '@/db/queries/getDayMeals';

export const getMonthMeals = (
  user: User,
  calendarId: string,
  year: number,
  month: number,
): Promise<DayMealWithName[]> => {
  const [monthStartISO, monthEndISO] = getMonthBoundary(month, year);

  return getDayMealsInBetween(user, calendarId, monthStartISO, monthEndISO);
};
