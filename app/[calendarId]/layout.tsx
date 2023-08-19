import { CalendarSelector } from '@/components/layout/CalendarSelector';
import { getUserCalendars } from '@/db/actions/getUserCalendars';
import { getUser, serverComponentDb } from '@/db/supabase';
import { PropsWithChildren } from 'react';

interface Props {
  params: {
    calendarId: string;
  };
}

export default async function Layout({
  params: { calendarId },
  children,
}: PropsWithChildren<Props>) {
  const user = await getUser(serverComponentDb);
  const { calendars, sharedCalendars } = await getUserCalendars(user);

  return (
    <section>
      <div className="m-4 flex justify-center">
        <CalendarSelector
          selectedCalendarId={calendarId}
          calendars={calendars}
        />
      </div>
      <div className="m-auto max-w-7xl">{children}</div>
    </section>
  );
}
