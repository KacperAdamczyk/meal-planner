import { db } from '@/db';
import { Meal, User, calendars, meals } from '@/db/schema';
import { CreateMeal } from '@/schemas/createMealSchema';
import { and, eq } from 'drizzle-orm';

export const createMeal = async (
  user: User,
  meal: CreateMeal,
  calendarId: string,
): Promise<Meal> => {
  const [calendar] = await db
    .select()
    .from(calendars)
    .where(and(eq(calendars.id, calendarId), eq(calendars.userId, user.id)));

  if (!calendar) {
    throw new Error('Calendar not found');
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
