import { getCalendar } from '@/db/actions/getCalendar';
import { getMealTypes } from '@/db/actions/getMealTypes';
import { groupMealsByType } from '@/db/actions/helpers/groupMealsByType';
import { getUser, serverComponentDb } from '@/db/supabase';
import { getDate, getMonth, getYear, parseISO } from 'date-fns';
import { notFound } from 'next/navigation';
import { FC } from 'react';
import { getDayMeals } from '@/db/actions/getDayMeals';
import { MealGroup } from '@/components/layout/MealGroup';

interface Props {
  calendarId: string;
  date: string;
}

export const SelectedDay: FC<Props> = async ({ calendarId, date }) => {
  const currentDate = parseISO(date);
  const user = await getUser(serverComponentDb);
  const calendar = await getCalendar(user, calendarId);

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

  return (
    <div className="m-2 w-full rounded border-2 border-secondary p-4">
      {groupedMeals ? (
        <MealGroup groupedMeals={groupedMeals} />
      ) : (
        <p className="text-center">No meals for this day</p>
      )}
    </div>
  );
};
