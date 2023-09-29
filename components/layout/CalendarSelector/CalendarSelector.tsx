'use client';

import { LinkButton } from '@/components/composite/LinkButton';
import { UserCalendar } from '@/db/actions/getUserCalendars';
import { ComboboxData, Select, SelectProps } from '@mantine/core';
import { Plus, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useMemo } from 'react';

interface Props {
  selectedCalendarId?: string;
  calendars: UserCalendar[];
  sharedCalendars: UserCalendar[];
}

export const CalendarSelector: FC<Props> = ({
  selectedCalendarId,
  calendars,
  sharedCalendars,
}) => {
  const router = useRouter();

  const onChange = useCallback<NonNullable<SelectProps['onChange']>>(
    (id) => {
      if (id) {
        router.push(`/${id}`);
      } else {
        router.push('/');
      }
    },
    [router],
  );

  const options = useMemo<ComboboxData>(
    () => [
      ...calendars.map(({ id, name }) => ({ label: name, value: id })),
      ...sharedCalendars.map(({ id, name }) => ({
        label: name,
        value: id,
        icon: Share2,
      })),
    ],
    [calendars, sharedCalendars],
  );

  return (
    <div className="flex gap-2 align-middle">
      <Select
        value={selectedCalendarId}
        onChange={onChange}
        data={options}
        placeholder="Select calendar"
        clearable
      />
      <LinkButton variant="outline" size="icon" href={'/new'}>
        <Plus className="h-4 w-4" />
      </LinkButton>
    </div>
  );
};
