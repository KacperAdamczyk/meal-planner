import { CalendarSelector } from '@/components/layout/CalendarSelector';
import { getUserCalendars } from '@/db/actions/getUserCalendars';
import { getUser, serverComponentDb } from '@/db/supabase';
import { cn } from '@/lib/utils';
import { CornerRightUp } from 'lucide-react';
import { Caveat } from 'next/font/google';

const caveat = Caveat({
  subsets: ['latin'],
});

export default async function Home() {
  const user = await getUser(serverComponentDb);
  const { calendars } = await getUserCalendars(user);

  return (
    <section>
      <div className="m-4 flex justify-center">
        <CalendarSelector calendars={calendars} />
      </div>
      <div>
        <div
          className={cn(
            caveat.className,
            'mt-2 flex items-center justify-center text-4xl text-gray-400',
          )}
        >
          <h1>Select your calendar</h1>
          <CornerRightUp />
        </div>
      </div>
    </section>
  );
}
