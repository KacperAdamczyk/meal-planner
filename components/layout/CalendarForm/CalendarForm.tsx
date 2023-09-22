/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';
import { createCalendarAction } from '@/actions/createCalendarAction';
import { InputField } from '@/components/fields';
import { MultiselectField } from '@/components/fields/MultiselectField';
import { Button } from '@/components/ui/button';
import { User } from '@/db/schema';
import { calendarSchema, CalendarSchema } from '@/schemas/calendarSchema';
import { useRouter } from 'next/navigation';
import { FC, useMemo, useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
  sharableUsers: User[];
  defaultValues?: CalendarSchema;
  action: typeof createCalendarAction;
}

export const CalendarForm: FC<Props> = ({
  sharableUsers,
  defaultValues = {
    name: '',
    shared: [],
  },
  action,
}) => {
  const router = useRouter();
  const form = useForm<CalendarSchema>({
    defaultValues,
    resolver: zodResolver(calendarSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;

  const [, startTransition] = useTransition();

  const onSubmit = useMemo(
    () =>
      handleSubmit((data) => {
        startTransition(async () => {
          const calendar = await action(data);

          router.push(`/${calendar.id}`);
        });
      }),
    [action, handleSubmit, router],
  );

  const options = useMemo(
    () =>
      sharableUsers.map((user) => ({
        label: user.email ?? user.id,
        value: user.id,
      })),
    [sharableUsers],
  );

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <InputField
          label="Name *"
          placeholder="Calendar name"
          register={register('name')}
        />
        <MultiselectField<CalendarSchema, 'shared'>
          name="shared"
          label="Shared to"
          placeholder="Select user"
          options={options}
          valueKey="userId"
          valueLabel="User"
        />
        <Button type="submit" disabled={isSubmitting || !isValid}>
          Create
        </Button>
      </form>
    </FormProvider>
  );
};
