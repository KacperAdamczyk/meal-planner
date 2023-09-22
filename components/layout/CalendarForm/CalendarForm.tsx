/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';
import { createCalendarAction } from '@/actions/createCalendarAction';
import { InputField } from '@/components/fields';
import { MultiselectField } from '@/components/fields/MultiselectField';
import { Button } from '@/components/ui/button';
import { User } from '@/db/schema';
import { calendarSchema, CalendarSchema } from '@/schemas/calendarSchema';
import { useParams, useRouter } from 'next/navigation';
import { FC, useMemo, useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateCalendarAction } from '@/actions/updateCalendarAction';

interface Props {
  edit?: boolean;
  sharableUsers: User[];
  defaultValues?: CalendarSchema;
  action: typeof createCalendarAction | typeof updateCalendarAction;
}

export const CalendarForm: FC<Props> = ({
  edit = false,
  sharableUsers,
  defaultValues = {
    name: '',
    shared: [],
  },
  action,
}) => {
  const router = useRouter();
  const { calendarId } = useParams<{ calendarId: string }>();
  const form = useForm<CalendarSchema>({
    defaultValues,
    resolver: zodResolver(calendarSchema),
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
          const calendar = await action(data, calendarId);

          router.push(`/${calendar.id}`);
        });
      }),
    [action, handleSubmit, calendarId, router],
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
        <Button type="submit" disabled={isSubmitting}>
          {edit ? 'Update' : 'Create'}
        </Button>
      </form>
    </FormProvider>
  );
};
