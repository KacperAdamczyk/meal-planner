import { db } from '@/db';
import { Meal, User, calendars, meals, sharedCalendars } from '@/db/schema';
import { CreateMeal } from '@/schemas/createMealSchema';
import { and, eq, or } from 'drizzle-orm';

export const createMeal = async (
  user: User,
  meal: CreateMeal,
  calendarId: string,
): Promise<Meal> => {
  const [calendar] = await db
    .select({
      id: calendars.id,
    })
    .from(calendars)
    .leftJoin(sharedCalendars, eq(calendars.id, sharedCalendars.calendarId))
    .where(
      and(
        eq(calendars.id, calendarId),
        or(eq(calendars.userId, user.id), eq(sharedCalendars.userId, user.id)),
      ),
    );

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
