import { db } from '@/db';
import { getUserCalendar } from '@/db/actions/getUserCalendar';
import { DayMeal, User } from '@/db/schema';

export interface DayMealWithName extends DayMeal {
  name: string;
}

export const getDayMealsInBetween = async (
  user: User,
  calendarId: string,
  from: string,
  to: string,
): Promise<DayMealWithName[]> => {
  const calendar = await getUserCalendar(user, calendarId);

  if (!calendar) {
    throw new Error(`Calendar with id: ${calendarId} not found`);
  }

  return (
    await db.query.dayMeals.findMany({
      where: (dayMeals, { eq, and, between }) =>
        and(
          eq(dayMeals.calendarId, calendar.id),
          between(dayMeals.date, from, to),
        ),
      with: {
        meal: {
          columns: {
            name: true,
          },
        },
      },
      columns: {
        date: true,
        calendarId: true,
        mealId: true,
        mealTypeId: true,
      },
    })
  ).map(({ meal: { name }, ...dayMeal }) => ({ name, ...dayMeal }));
};
