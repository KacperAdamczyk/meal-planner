import { redirect } from 'next/navigation';
import { FC } from 'react';
import { formatISO } from 'date-fns';

const Calendar: FC<{ params: { calendarId: string } }> = ({
  params: { calendarId },
}) => {
  redirect(
    `/${calendarId}/${formatISO(Date.now(), { representation: 'date' })}`,
  );
};

export default Calendar;
