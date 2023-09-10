import { db } from '@/db';
import { getCalendar } from '@/db/actions/getCalendar';
import { Meal, User, meals } from '@/db/schema';
import { CreateMeal } from '@/schemas/createMealSchema';

export const createMeal = async (
  user: User,
  meal: CreateMeal,
  calendarId: string,
): Promise<Meal> => {
  const calendar = await getCalendar(user, calendarId);

  if (!calendar) {
    throw new Error(`Calendar with id: ${calendarId} not found`);
  }

  const [newMeal] = await db
    .insert(meals)
    .values({
      name: meal.name,
      calendarId: calendar.id,
      defaultMealTypeId: meal.defaultMealType,
    })
    .returning();

  return newMeal;
};
