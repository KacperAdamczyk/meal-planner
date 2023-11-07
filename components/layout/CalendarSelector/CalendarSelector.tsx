'use client';

import { LinkButton } from '@/components/composite/LinkButton';
import { UserCalendar } from '@/db/actions/getUserCalendars';
import { ComboboxData, Select, SelectProps } from '@mantine/core';
import { IconEye } from '@tabler/icons-react';
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
    <div className="flex items-center gap-1">
      <Select
        value={selectedCalendarId}
        onChange={onChange}
        data={options}
        placeholder="Select calendar"
        clearable
      />
      {selectedCalendarId && (
        <LinkButton action size="lg" href={`/${selectedCalendarId}/details`}>
          <IconEye className="h-4 w-4" />
        </LinkButton>
      )}
      <LinkButton action size="lg" href={'/new'}>
        <Plus className="h-4 w-4" />
      </LinkButton>
    </div>
  );
};
