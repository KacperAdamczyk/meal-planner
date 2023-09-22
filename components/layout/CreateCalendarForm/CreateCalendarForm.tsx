import { createCalendarAction } from '@/actions/createCalendarAction';
import { CalendarForm } from '@/components/layout/CalendarForm';
import { getSharableUsers } from '@/db/actions/getSharableUsers';
import { getUser, serverComponentDb } from '@/db/supabase';
import { FC } from 'react';

export const CreateCalendarForm: FC = async () => {
  const user = await getUser(serverComponentDb);
  const sharableUsers = await getSharableUsers(user);

  return (
    <>
      <h1 className="text-2xl">New calendar</h1>
      <CalendarForm
        action={createCalendarAction}
        sharableUsers={sharableUsers}
      />
    </>
  );
};
