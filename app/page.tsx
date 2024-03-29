import { CalendarSelector } from '@/components/layout/CalendarSelector';
import { getUserCalendars } from '@/db/queries/getUserCalendars';
import { getUser, serverComponentDb } from '@/db/supabase';
import { cn } from '@/lib/utils';
import { IconCornerRightUp } from '@tabler/icons-react';
import { Caveat } from 'next/font/google';

const caveat = Caveat({
  subsets: ['latin'],
});

export default async function Home() {
  const user = await getUser(serverComponentDb);
  const { calendars, sharedCalendars } = await getUserCalendars(user);

  return (
    <section>
      <div className="flex justify-center">
        <CalendarSelector
          calendars={calendars}
          sharedCalendars={sharedCalendars}
        />
      </div>
      <div>
        <div
          className={cn(
            caveat.className,
            'mt-2 flex items-center justify-center text-4xl text-gray-400',
          )}
        >
          <h1>Select your calendar</h1>
          <IconCornerRightUp />
        </div>
      </div>
    </section>
  );
}
