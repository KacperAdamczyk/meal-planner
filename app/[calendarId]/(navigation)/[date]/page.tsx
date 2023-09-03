import { Dashboard } from '@/components/layout/Dashboard';
import { getDays } from '@/db/actions/getDays';
import { getUser, serverComponentDb } from '@/db/supabase';
import { getMonth, getYear, parse, parseISO } from 'date-fns';
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

  console.log('days', days);

  return (
    <div>
      <Dashboard days={days} />
    </div>
  );
};

export default Date;
