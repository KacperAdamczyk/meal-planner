import { db } from '@/db';
import { getUserCalendar } from '@/db/queries/getUserCalendar';
import { type DayMeal, type User, dayMeals } from '@/db/schema';
import { CreateDayMeal } from '@/validation/createDayMealSchema';

export const createDayMeal = async (
  user: User,
  dayMeal: CreateDayMeal,
  calendarId: string,
  date: string,
): Promise<DayMeal> => {
  const calendar = await getUserCalendar(user, calendarId);

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
