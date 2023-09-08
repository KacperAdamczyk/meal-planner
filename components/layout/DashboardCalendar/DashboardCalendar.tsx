import { MonthCalendar } from '@/components/layout/DashboardCalendar/MonthCalendar';
import { getMonthMeals } from '@/db/actions/getMonthMeals';
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
    getMonthMeals(user, calendarId, getYear(dateToLoad), getMonth(dateToLoad)),
    getMealTypes(user, calendarId),
  ]);

  const groupedDays = groupMealsByDay(days);

  const fullDates: Date[] = [];
  const partialDates: Date[] = [];
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
