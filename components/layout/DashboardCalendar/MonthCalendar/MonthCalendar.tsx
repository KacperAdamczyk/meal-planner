'use client';

import { cn } from '@/lib/utils';
import { DatePicker, DatePickerProps } from '@mantine/dates';
import { formatISO, isSameDay, parseISO } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback } from 'react';

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

  const onChange = useCallback<NonNullable<DatePickerProps['onChange']>>(
    (date) => {
      if (!date) {
        return;
      }

      router.replace(
        `/${calendarId}/${formatISO(date, { representation: 'date' })}`,
      );
    },
    [calendarId, router],
  );

  const onDateChange = useCallback<
    NonNullable<DatePickerProps['onDateChange']>
  >(
    (month) => {
      router.replace(
        `/${calendarId}/${date}?month=${formatISO(month, {
          representation: 'date',
        })}`,
      );
    },
    [calendarId, date, router],
  );

  const full = fullDates.map((date) => parseISO(date));
  const partial = partialDates.map((date) => parseISO(date));

  return (
    <DatePicker
      value={selectedDate}
      onChange={onChange}
      date={month}
      onDateChange={onDateChange}
      renderDay={(date) => (
        <div
          className={cn('flex h-full w-full items-center justify-center', {
            'rounded border-2 border-green-500': full.some((currentDate) =>
              isSameDay(date, currentDate),
            ),
            'rounded border-2 border-yellow-500': partial.some((currentDate) =>
              isSameDay(date, currentDate),
            ),
          })}
        >
          {date.getDate()}
        </div>
      )}
    />
  );
};
