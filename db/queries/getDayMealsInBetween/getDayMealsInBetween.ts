import { db } from '@/db';
import { DayMealWithName } from '@/db/queries/getDayMeals';
import { getUserCalendar } from '@/db/queries/getUserCalendar';
import { User } from '@/db/schema';

export const getDayMealsInBetween = async (
  user: User,
  calendarId: string,
  from: string,
  to: string,
): Promise<DayMealWithName[]> => {
  const calendar = await getUserCalendar(user, calendarId);

  if (!calendar) {
    return [];
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
