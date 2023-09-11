/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';
import { createCalendarAction } from '@/actions/createCalendarAction';
import { Button, InputField, MultiselectField } from 'ui';
import { User } from '@/db/schema';
import { CreateCalendar } from '@/schemas/createCalendarSchema';
import { useRouter } from 'next/navigation';
import { FC, useMemo, useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface Props {
  sharableUsers: User[];
}

export const CalendarForm: FC<Props> = ({ sharableUsers }) => {
  const router = useRouter();
  const form = useForm<CreateCalendar>({
    defaultValues: {
      name: '',
      shared: [],
    },
  });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const [, startTransition] = useTransition();

  const onSubmit = useMemo(
    () =>
      handleSubmit((data) => {
        startTransition(async () => {
          const calendar = await createCalendarAction(data);

          router.push(`/${calendar.id}`);
        });
      }),
    [handleSubmit, router],
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
          label="Name"
          placeholder="Calendar name"
          register={register('name')}
        />
        <MultiselectField<CreateCalendar, 'shared'>
          name="shared"
          label="Shared to"
          placeholder="Select user"
          options={options}
          valueKey="userId"
          valueLabel="User"
        />
        <Button type="submit" disabled={isSubmitting}>
          Create
        </Button>
      </form>
    </FormProvider>
  );
};
