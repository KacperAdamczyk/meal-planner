import { updateCalendarAction } from '@/actions/updateCalendarAction';
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
    getSharableUsers(user, true),
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
        edit
        action={updateCalendarAction}
        sharableUsers={sharableUsers}
        defaultValues={{
          name: calendar.name,
          shared: shares,
        }}
      />
    </>
  );
};
