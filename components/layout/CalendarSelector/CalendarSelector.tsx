'use client';

import { Combobox, ComboboxOption } from '@/components/composite/Combobox';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/db/schema';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useMemo } from 'react';

interface Props {
  selectedCalendarId?: string;
  calendars: Calendar[];
}

export const CalendarSelector: FC<Props> = ({
  selectedCalendarId,
  calendars,
}) => {
  const router = useRouter();

  const onClick = useCallback(() => {
    router.push('/new');
  }, [router]);

  const onChange = useCallback(
    (id: string | undefined) => {
      if (id) {
        router.push(`/${id}`);
      } else {
        router.push('/');
      }
    },
    [router],
  );

  const options = useMemo<ComboboxOption[]>(
    () => calendars.map(({ id, name }) => ({ label: name, value: id })),
    [calendars],
  );

  return (
    <div className="flex gap-2 align-middle">
      <Combobox
        value={selectedCalendarId}
        onChange={onChange}
        options={options}
        placeholder="Select calendar"
        inputPlaceholder="Search for calendar"
        notFoundText="Calendar not found"
        emptyText="No calendars"
      />
      <Button variant="outline" size="icon" onClick={onClick}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};
