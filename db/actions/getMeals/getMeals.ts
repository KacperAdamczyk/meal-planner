import { db } from '@/db';
import { Meal, User, calendars, mealTypes, meals } from '@/db/schema';
import { and, eq } from 'drizzle-orm';

export type GetMealResult = {
  id: string;
  name: string;
  defaultMealType: string | null;
}[];

export const getMeals = (
  user: User,
  calendarId: string,
): Promise<GetMealResult> =>
  db
    .select({
      id: meals.id,
      name: meals.name,
      defaultMealType: mealTypes.name,
    })
    .from(calendars)
    .where(and(eq(calendars.id, calendarId), eq(calendars.userId, user.id)))
    .innerJoin(meals, eq(meals.calendarId, calendars.id))
    .leftJoin(mealTypes, eq(mealTypes.id, meals.defaultMealTypeId));
