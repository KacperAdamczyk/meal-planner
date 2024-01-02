import { getUserCalendar } from '@/db/queries/getUserCalendar';
import { getMealTypes } from '@/db/queries/getMealTypes';
import { groupMealsByType } from '@/db//helpers/groupMealsByType';
import { getUser, serverComponentDb } from '@/db/supabase';
import { getDate, getMonth, getYear, parseISO } from 'date-fns';
import { notFound } from 'next/navigation';
import { FC } from 'react';
import { getDayMeals } from '@/db/queries/getDayMeals';
import { MealGroup } from '@/components/custom/MealGroup';

interface Props {
  calendarId: string;
  date: string;
}

export const SelectedDay: FC<Props> = async ({ calendarId, date }) => {
  const currentDate = parseISO(date);
  const user = await getUser(serverComponentDb);
  const calendar = await getUserCalendar(user, calendarId);

  if (!calendar) {
    notFound();
  }

  const [dayMeals, mealTypes] = await Promise.all([
    getDayMeals(
      user,
      calendarId,
      getYear(currentDate),
      getMonth(currentDate),
      getDate(currentDate),
    ),
    getMealTypes(user, calendarId),
  ]);

  const groupedMeals = groupMealsByType(dayMeals, mealTypes).at(0);

  return <MealGroup groupedMeals={groupedMeals} />;
};
