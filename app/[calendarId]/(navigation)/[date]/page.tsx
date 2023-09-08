import { DashboardCalendar } from '@/components/layout/DashboardCalendar';
import { SelectedDay } from '@/components/layout/SelectedDay';
import { FC } from 'react';

const Date: FC<{
  params: { calendarId: string; date: string };
  searchParams: { month?: string };
}> = ({ params: { calendarId, date }, searchParams: { month } }) => (
  <div className="flex">
    <DashboardCalendar calendarId={calendarId} date={date} month={month} />
    <SelectedDay calendarId={calendarId} date={date} />
  </div>
);

export default Date;
