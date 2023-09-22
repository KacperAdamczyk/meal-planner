import { updateCalendarAction } from '@/actions/updateCalendarAction';
import { CalendarForm } from '@/components/layout/CalendarForm';
import { getCalendar } from '@/db/actions/getCalendar';
import { getCalendarShares } from '@/db/actions/getCalendarShares';
import { getSharableUsers } from '@/db/actions/getSharableUsers';
import { getUser as getOwner } from '@/db/actions/getUser';
import { getUser, serverComponentDb } from '@/db/supabase';
import { notFound } from 'next/navigation';
import { FC } from 'react';

interface Props {
  calendarId: string;
}

export const EditCalendarForm: FC<Props> = async ({ calendarId }) => {
  const user = await getUser(serverComponentDb);
  const [calendar, shares, sharableUsers] = await Promise.all([
    getCalendar(user, calendarId),
    getCalendarShares(calendarId),
    getSharableUsers(user, true),
  ]);

  if (!calendar) {
    notFound();
  }

  const owner = await getOwner(calendar.userId);

  const isOwner = owner?.id === user.id;

  return (
    <>
      <h1 className="text-2xl">
        Edit <span className="italic">{calendar.name}</span>
      </h1>
      {!isOwner && (
        <h3 className="text-sm">
          Owned by: <span className="italic">{owner?.email}</span>
        </h3>
      )}
      <CalendarForm
        edit
        readOnly
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
