import { MonthCalendar } from '@/components/layout/DashboardCalendar/MonthCalendar';
import { getMonthMeals } from '@/db/queries/getMonthMeals';
import { getMealTypes } from '@/db/queries/getMealTypes';
import { groupMealsByDay } from '@/db/helpers/groupMealsByDay';
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
  const selectedDate = parseISO(month ?? date);
  const selectedYear = getYear(selectedDate);
  const selectedMonth = getMonth(selectedDate);

  const user = await getUser(serverComponentDb);
  const [days, mealTypes] = await Promise.all([
    getMonthMeals(user, calendarId, selectedYear, selectedMonth),
    getMealTypes(user, calendarId),
  ]);

  const groupedDays = groupMealsByDay(days);

  const fullDates: string[] = [];
  const partialDates: string[] = [];
  for (const { date, meals } of groupedDays) {
    const mealTypeIds = new Set(meals.map(({ mealTypeId }) => mealTypeId));

    if (mealTypeIds.size === mealTypes.length) {
      fullDates.push(date);
    } else {
      partialDates.push(date);
    }
  }

  return (
    <MonthCalendar
      calendarId={calendarId}
      date={date}
      fullDates={fullDates}
      partialDates={partialDates}
    />
  );
};
