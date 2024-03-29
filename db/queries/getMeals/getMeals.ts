import { db } from '@/db';
import { getUserCalendar } from '@/db/queries/getUserCalendar';
import { Meal, User, meals } from '@/db/schema';
import { eq } from 'drizzle-orm';

export interface GetMealsResult extends Meal {
  defaultMealType: string | undefined;
}

export const getMeals = async (
  user: User,
  calendarId: string,
): Promise<GetMealsResult[]> => {
  const calendar = await getUserCalendar(user, calendarId);

  if (!calendar) {
    return [];
  }

  return (
    await db.query.meals.findMany({
      where: eq(meals.calendarId, calendar.id),
      with: {
        defaultMealType: {
          columns: {
            name: true,
          },
        },
      },
    })
  ).map(({ defaultMealType, ...meal }) => ({
    ...meal,
    defaultMealType: defaultMealType?.name,
  }));
};
