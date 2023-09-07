import { getCalendar } from '@/db/actions/getCalendar';
import { getDays } from '@/db/actions/getDays';
import { getMealTypes } from '@/db/actions/getMealTypes';
import { getUser, serverComponentDb } from '@/db/supabase';
import { getDate, getMonth, getYear, parseISO } from 'date-fns';
import { notFound } from 'next/navigation';
import { FC } from 'react';

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
    getDays(
      user,
      calendarId,
      getYear(currentDate),
      getMonth(currentDate),
      getDate(currentDate),
    ),
    getMealTypes(user, calendarId),
  ]);

  console.log({ mealTypes, dayMeals });

  return (
    <div className="m-2 w-full rounded border-2 border-secondary p-4">
      {date ? <div>{date}</div> : <div>Select a day</div>}
    </div>
  );
};
