import { DashboardCalendar } from '@/components/layout/DashboardCalendar';
import { SelectedDay } from '@/components/layout/SelectedDay';
import { FC, Suspense } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { MealGroupPlaceholder } from '@/components/custom/MealGroup/MealGroupPlaceholder';
import { CalendarPlaceholder } from '@/components/custom/CalendarPlaceholder';
import { LinkButton } from '@/components/composite/LinkButton';
import { parseISO } from 'date-fns';

const Date: FC<{
  params: { calendarId: string; date: string };
  searchParams: { month?: string };
}> = ({ params: { calendarId, date }, searchParams: { month } }) => {
  const placeholderDate = parseISO(date);

  return (
    <div className="grid grid-cols-[max-content_1fr] grid-rows-[max-content_1fr] gap-2">
      <div className="row-span-2">
        <Suspense
          fallback={<CalendarPlaceholder placeholderDate={placeholderDate} />}
        >
          <DashboardCalendar
            calendarId={calendarId}
            date={date}
            month={month}
          />
        </Suspense>
      </div>
      <div className="col-start-2 justify-self-end">
        <LinkButton href={`/${calendarId}/${date}/new`} size="lg" action>
          <IconPlus />
        </LinkButton>
      </div>
      <div className="col-start-2 row-start-2 flex flex-col items-stretch">
        <Suspense fallback={<MealGroupPlaceholder rows={3} />}>
          <SelectedDay calendarId={calendarId} date={date} />
        </Suspense>
      </div>
    </div>
  );
};

export default Date;
