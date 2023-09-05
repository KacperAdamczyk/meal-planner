import { CalendarSelector } from '@/components/layout/CalendarSelector';
import { getCalendar } from '@/db/actions/getCalendar';
import { getUserCalendars } from '@/db/actions/getUserCalendars';
import { getUser, serverComponentDb } from '@/db/supabase';
import { notFound } from 'next/navigation';
import { PropsWithChildren } from 'react';

interface Props {
  params: {
    calendarId: string;
  };
}

const Layout = async ({
  params: { calendarId },
  children,
}: PropsWithChildren<Props>) => {
  const user = await getUser(serverComponentDb);
  const { calendars, sharedCalendars } = await getUserCalendars(user);
  const calendar = await getCalendar(user, calendarId);

  if (!calendar) {
    notFound();
  }

  return (
    <section>
      <div className="flex justify-center">
        <CalendarSelector
          selectedCalendarId={calendarId}
          calendars={calendars}
          sharedCalendars={sharedCalendars}
        />
      </div>
      <div>{children}</div>
    </section>
  );
};

export default Layout;
