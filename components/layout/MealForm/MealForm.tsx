/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';
import { createMealAction } from '@/actions/createMealAction/createMealAction';
import { InputField, SelectField } from '@/components/fields';
import { MealType } from '@/db/schema';
import { CreateMeal } from '@/validation/createMealSchema';
import { Button, ComboboxData } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { FC, useMemo, useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface Props {
  mealTypes: MealType[];
}

export const MealForm: FC<Props> = ({ mealTypes }) => {
  const { calendarId } = useParams<{ calendarId: string }>();
  const router = useRouter();
  const form = useForm<CreateMeal>({
    defaultValues: {
      name: '',
      defaultMealType: undefined,
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const [, startTransition] = useTransition();

  const onSubmit = useMemo(
    () =>
      handleSubmit((data) => {
        startTransition(async () => {
          await createMealAction(data, calendarId);

          router.push(`/${calendarId}/meals`);
        });
      }),
    [calendarId, handleSubmit, router],
  );

  const options = useMemo<ComboboxData>(
    () =>
      mealTypes.map(({ id, name }) => ({
        label: name,
        value: id,
      })),
    [mealTypes],
  );

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <InputField name="name" label="Name" placeholder="Meal name" required />
        <SelectField
          name="defaultMealType"
          data={options}
          placeholder="Meal type"
          label="Meal type"
        />
        <Button type="submit" variant="outline" disabled={isSubmitting}>
          Create
        </Button>
      </form>
    </FormProvider>
  );
};
