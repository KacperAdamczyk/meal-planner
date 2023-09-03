'use client';
import { Calendar } from '@/components/ui/calendar';
import { DayMeal } from '@/db/schema';
import { formatISO, parseISO } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import { FC, useCallback } from 'react';
import { SelectSingleEventHandler } from 'react-day-picker';

interface Props {
  days: DayMeal[];
}

export const Dashboard: FC<Props> = () => {
  const params = useParams();
  const router = useRouter();

  const date = parseISO(params.date.toString());

  const onCalendarChange = useCallback<SelectSingleEventHandler>(
    (day) => {
      if (day) {
        router.push(
          `/${params.calendarId}/${formatISO(day, { representation: 'date' })}`,
        );
      }
    },
    [params.calendarId, router],
  );

  return <Calendar mode="single" selected={date} onSelect={onCalendarChange} />;
};
