import { MonthCalendar } from '@/components/layout/MonthCalendar';
import { getDays } from '@/db/actions/getDays';
import { getMealTypes } from '@/db/actions/getMealTypes';
import { groupMealsByDay } from '@/db/actions/helpers/groupMealsByDay';
import { getUser, serverComponentDb } from '@/db/supabase';
import { getMonth, getYear, parseISO } from 'date-fns';
import { FC } from 'react';

interface Props {
  calendarId: string;
  date: string;
  month?: string;
}

export const DashboardCalendar: FC<Props> = async ({
  calendarId,
  date,
  month,
}) => {
  const dateToLoad = parseISO(month ?? date);

  const user = await getUser(serverComponentDb);
  const [days, mealTypes] = await Promise.all([
    getDays(user, getMonth(dateToLoad), getYear(dateToLoad), calendarId),
    getMealTypes(user, calendarId),
  ]);

  const groupedDays = groupMealsByDay(days);
  const fullDates = groupedDays
    .filter(
      ({ meals }) =>
        new Set(meals.map(({ mealTypeId }) => mealTypeId)).size ===
        mealTypes.length,
    )
    .map(({ date }) => date);
  const partialDates = groupedDays
    .filter(({ meals }) => {
      const size = new Set(meals.map(({ mealTypeId }) => mealTypeId)).size;

      return size > 0 && size < mealTypes.length;
    })
    .map(({ date }) => date);

  return (
    <MonthCalendar
      calendarId={calendarId}
      date={date}
      fullDates={fullDates}
      partialDates={partialDates}
    />
  );
};
