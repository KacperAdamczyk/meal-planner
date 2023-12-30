import { CalendarSelector } from '@/components/layout/CalendarSelector';
import { getUserCalendar } from '@/db/queries/getUserCalendar';
import { getUserCalendars } from '@/db/queries/getUserCalendars';
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
  const [{ calendars, sharedCalendars }, calendar] = await Promise.all([
    getUserCalendars(user),
    getUserCalendar(user, calendarId),
  ]);

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
