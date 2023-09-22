import { createCalendarAction } from '@/actions/createCalendarAction';
import { CalendarForm } from '@/components/layout/CalendarForm';
import { getCalendar } from '@/db/actions/getCalendar';
import { getCalendarShares } from '@/db/actions/getCalendarShares';
import { getSharableUsers } from '@/db/actions/getSharableUsers';
import { getUser, serverComponentDb } from '@/db/supabase';
import { notFound } from 'next/navigation';
import { FC } from 'react';

interface Props {
  calendarId: string;
}

export const EditCalendarForm: FC<Props> = async ({ calendarId }) => {
  const user = await getUser(serverComponentDb);
  const [sharableUsers, calendar, shares] = await Promise.all([
    getSharableUsers(user),
    getCalendar(user, calendarId),
    getCalendarShares(calendarId),
  ]);

  if (!calendar) {
    notFound();
  }

  const isOwner = calendar.userId === user.id;

  return (
    <>
      <h1 className="text-2xl">New calendar</h1>
      <CalendarForm
        action={createCalendarAction}
        sharableUsers={sharableUsers}
        defaultValues={{
          name: calendar.name,
          shared: shares,
        }}
      />
    </>
  );
};
