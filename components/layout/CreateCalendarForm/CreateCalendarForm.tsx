import { createCalendarAction } from '@/actions/createCalendarAction';
import { Header } from '@/components/custom/Header';
import { CalendarForm } from '@/components/layout/CalendarForm';
import { getSharableUsers } from '@/db/actions/getSharableUsers';
import { getUser, serverComponentDb } from '@/db/supabase';
import { FC } from 'react';

export const CreateCalendarForm: FC = async () => {
  const user = await getUser(serverComponentDb);
  const sharableUsers = await getSharableUsers(user);

  return (
    <>
      <Header header="Create" headerItalic="Calendar" />
      <CalendarForm
        action={createCalendarAction}
        sharableUsers={sharableUsers}
      />
    </>
  );
};
