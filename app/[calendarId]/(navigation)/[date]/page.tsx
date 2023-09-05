import { DashboardCalendar } from '@/components/layout/DashboardCalendar';
import { SelectedDay } from '@/components/layout/SelectedDay';
import { getDays } from '@/db/actions/getDays';
import { getMealTypes } from '@/db/actions/getMealTypes';
import { groupMealsByDay } from '@/db/actions/helpers/groupMealsByDay';
import { getUser, serverComponentDb } from '@/db/supabase';
import { getMonth, getYear, isSameDay, parseISO } from 'date-fns';
import { FC } from 'react';

const Date: FC<{ params: { calendarId: string; date: string } }> = async ({
  params: { calendarId, date },
}) => {
  const selectedDate = parseISO(date);
  const user = await getUser(serverComponentDb);
  const days = await getDays(
    user,
    getMonth(selectedDate),
    getYear(selectedDate),
    calendarId,
  );
  const mealTypes = await getMealTypes(user, calendarId);
  const groupedDays = groupMealsByDay(days);

  const selectedDay = groupedDays.find(({ date }) =>
    isSameDay(date, selectedDate),
  );

  return (
    <div>
      <DashboardCalendar groupedDays={groupedDays} mealTypes={mealTypes} />
      <SelectedDay day={selectedDay} />
    </div>
  );
};

export default Date;
