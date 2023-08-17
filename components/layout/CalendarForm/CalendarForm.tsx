'use client';
import { createCalendarAction } from '@/actions/createCalendarAction';
import { InputField } from '@/components/composite/fields';
import { Button } from '@/components/ui/button';
import { CreateCalendar } from '@/schemas/createCalendarSchema';
import { useRouter } from 'next/navigation';
import { FC, useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';

export const CalendarForm: FC = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<CreateCalendar>({
    defaultValues: {
      name: '',
      shared: [],
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = useMemo(
    () =>
      handleSubmit(async (data) =>
        startTransition(async () => {
          const calendar = await createCalendarAction(data);

          router.push(`/${calendar.id}`);
        }),
      ),
    [handleSubmit, router],
  );

  return (
    <form onSubmit={onSubmit}>
      <InputField
        label="Name"
        placeholder="Calendar name"
        {...register('name')}
      />
      <Button type="submit" disabled={isPending}>
        Create
      </Button>
    </form>
  );
};
