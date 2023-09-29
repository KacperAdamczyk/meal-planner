import { updateCalendarAction } from '@/actions/updateCalendarAction';
import { Header } from '@/components/custom/Header';
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
  const shared = shares.map(({ userId }) => userId);

  const isOwner = owner?.id === user.id;

  return (
    <>
      <Header
        header="Edit"
        headerItalic={calendar.name}
        subHeader={isOwner ? undefined : 'Owned by:'}
        subHeaderItalic={isOwner ? undefined : owner?.email ?? owner?.id}
      />
      <CalendarForm
        edit
        readOnly
        action={updateCalendarAction}
        sharableUsers={sharableUsers}
        defaultValues={{
          name: calendar.name,
          shared,
        }}
      />
    </>
  );
};
