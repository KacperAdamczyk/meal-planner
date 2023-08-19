'use client';
import { createCalendarAction } from '@/actions/createCalendarAction';
import { InputField } from '@/components/fields';
import {
  MultiselectField,
  MultiselectFieldProps,
} from '@/components/fields/MultiselectField';
import { Button } from '@/components/ui/button';
import { User } from '@/db/schema';
import { CreateCalendar } from '@/schemas/createCalendarSchema';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import { FC, useMemo, useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const mapUser: MultiselectFieldProps<CreateCalendar, 'shared'>['map'] = (
  value,
) => ({ userId: value });
const columns: MultiselectFieldProps<CreateCalendar, 'shared'>['columns'] = [
  {
    label: 'User',
    key: 'userId',
  },
];

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

          router.push(`/${calendar.id}`);
          revalidatePath('/[calendarId]');
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
      <form onSubmit={onSubmit}>
        <InputField
          label="Name"
          placeholder="Calendar name"
          register={register('name')}
        />
        <MultiselectField<CreateCalendar, 'shared'>
          name="shared"
          label="Shared to"
          emptyText="No users"
          inputPlaceholder="Select user"
          notFoundText="User not found"
          placeholder="Select user"
          options={options}
          map={mapUser}
          columns={columns}
        />
        <Button type="submit" disabled={isSubmitting}>
          Create
        </Button>
      </form>
    </FormProvider>
  );
};
