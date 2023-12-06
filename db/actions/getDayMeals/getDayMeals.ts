import { getDayMealsInBetween } from '@/db/actions/getDayMealsInBetween';
import { DayMeal, User } from '@/db/schema';
import { formatISO, set } from 'date-fns';

export interface DayMealWithName extends DayMeal {
  name: string;
}

export const getDayMeals = (
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
  const dayISO = formatISO(day, { representation: 'date' });

  return getDayMealsInBetween(user, calendarId, dayISO, dayISO);
};
