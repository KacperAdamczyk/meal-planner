'use client';

import { Combobox, ComboboxOption } from '@/components/composite/Combobox';
import { LinkButton } from '@/components/composite/LinkButton';
import { UserCalendar } from '@/db/actions/getUserCalendars';
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
      <Combobox
        value={selectedCalendarId}
        onChange={onChange}
        options={options}
        placeholder="Select calendar"
      />
      <LinkButton variant="outline" size="icon" href={'/new'}>
        <Plus className="h-4 w-4" />
      </LinkButton>
    </div>
  );
};
