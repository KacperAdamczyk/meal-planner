'use client';
import { createCalendarAction } from '@/actions/createCalendarAction';
import { InputField } from '@/components/fields';
import { MultiselectField } from '@/components/fields/MultiselectField';
import { Button } from '@/components/ui/button';
import { User } from '@/db/schema';
import { CreateCalendar } from '@/schemas/createCalendarSchema';
import { revalidatePath } from 'next/cache';
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
      handleSubmit(async (data) =>
        startTransition(async () => {
          const calendar = await createCalendarAction(data);

          revalidatePath('/[calendarId]');
          router.push(`/${calendar.id}`);
        }),
      ),
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
          emptyText="No users"
          inputPlaceholder="Find user"
          notFoundText="User not found"
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
