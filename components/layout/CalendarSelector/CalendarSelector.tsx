'use client';

import { Combobox } from '@/components/composite/Combobox';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useCallback } from 'react';

export const CalendarSelector: FC = () => {
  const router = useRouter();
  const onClick = useCallback(() => {
    router.push('/new');
  }, [router]);

  return (
    <div className="flex gap-2 align-middle">
      <Combobox
        options={
          [
            // { label: 'Test', value: 'test' },
            // { label: 'Test2', value: 'test2' },
          ]
        }
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
