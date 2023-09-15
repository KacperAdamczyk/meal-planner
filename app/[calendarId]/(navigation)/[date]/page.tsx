import { DashboardCalendar } from '@/components/layout/DashboardCalendar';
import { SelectedDay } from '@/components/layout/SelectedDay';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FC } from 'react';
import { PlusCircle } from 'lucide-react';

const Date: FC<{
  params: { calendarId: string; date: string };
  searchParams: { month?: string };
}> = ({ params: { calendarId, date }, searchParams: { month } }) => (
  <div className="grid grid-cols-[max-content_1fr] grid-rows-[max-content_1fr] gap-2">
    <div className="row-span-2">
      <DashboardCalendar calendarId={calendarId} date={date} month={month} />
    </div>
    <div className="col-start-2 justify-self-end">
      <Button asChild variant="default">
        <Link href={`/${calendarId}/${date}/new`}>
          <PlusCircle />
        </Link>
      </Button>
    </div>
    <div className="col-start-2 row-start-2 flex flex-col items-stretch">
      <SelectedDay calendarId={calendarId} date={date} />
    </div>
  </div>
);

export default Date;
