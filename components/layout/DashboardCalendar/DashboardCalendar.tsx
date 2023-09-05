'use client';
import { Calendar } from '@/components/ui/calendar';
import { GroupedMealsByDay } from '@/db/actions/helpers/groupMealsByDay';
import { DayMeal, MealType } from '@/db/schema';
import { formatISO, parseISO } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import { FC, useCallback } from 'react';
import { SelectSingleEventHandler } from 'react-day-picker';

interface Props {
  groupedDays: GroupedMealsByDay[];
  mealTypes: MealType[];
}

export const DashboardCalendar: FC<Props> = ({ groupedDays, mealTypes }) => {
  const params = useParams();
  const router = useRouter();

  const selectedDate = parseISO(params.date.toString());
  const fullDates = groupedDays
    .filter(({ types }) => types.length === mealTypes.length)
    .map(({ date }) => date);
  const partialDates = groupedDays
    .filter(({ types }) => types.length > 0 && types.length < mealTypes.length)
    .map(({ date }) => date);

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

  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={onCalendarChange}
      modifiers={{
        full: fullDates,
        partial: partialDates,
      }}
      modifiersClassNames={{
        full: 'border-2 border-green-500',
        partial: 'border-2 border-yellow-500',
      }}
    />
  );
};
