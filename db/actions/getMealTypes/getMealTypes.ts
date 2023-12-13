import { db } from '@/db';
import { getUserCalendar } from '@/db/actions/getUserCalendar';
import { MealType, User, mealTypes } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const getMealTypes = async (
  user: User,
  calendarId: string,
): Promise<MealType[]> => {
  const calendar = await getUserCalendar(user, calendarId);

  if (!calendar) {
    return [];
  }

  return db.query.mealTypes.findMany({
    where: eq(mealTypes.calendarId, calendar.id),
    columns: {
      id: true,
      name: true,
      calendarId: true,
    },
  });
};
