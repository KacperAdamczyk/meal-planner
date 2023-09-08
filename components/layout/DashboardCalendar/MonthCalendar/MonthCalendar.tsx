'use client';

import { Calendar } from '@/components/ui/calendar';
import { formatISO, parse, parseISO } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback } from 'react';
import {
  MonthChangeEventHandler,
  SelectSingleEventHandler,
} from 'react-day-picker';

interface Props {
  calendarId: string;
  date: string;
  fullDates: string[];
  partialDates: string[];
}

export const MonthCalendar: FC<Props> = ({
  calendarId,
  date,
  fullDates,
  partialDates,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const monthParam = params.get('month');
  const month = parseISO(monthParam ?? date);
  const selectedDate = parseISO(date);

  const onCalendarChange = useCallback<SelectSingleEventHandler>(
    (day) => {
      if (day) {
        router.replace(
          `/${calendarId}/${formatISO(day, { representation: 'date' })}`,
        );
      }
    },
    [calendarId, router],
  );

  const onMonthChange = useCallback<MonthChangeEventHandler>(
    (month) => {
      router.replace(
        `/${calendarId}/${date}?month=${formatISO(month, {
          representation: 'date',
        })}`,
      );
    },
    [calendarId, date, router],
  );

  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={onCalendarChange}
      month={month}
      onMonthChange={onMonthChange}
      modifiers={{
        full: fullDates.map((date) => parseISO(date)),
        partial: partialDates.map((date) => parseISO(date)),
      }}
      modifiersClassNames={{
        full: 'border-2 border-green-500',
        partial: 'border-2 border-yellow-500',
      }}
    />
  );
};
