/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';
import { createDayMealAction } from '@/actions/createDayMealAction';
import { SelectField } from '@/components/fields';
import { GetMealsResult } from '@/db/actions/getMeals';
import { MealType } from '@/db/supabase/schema/mealTypes';
import { CreateDayMeal } from '@/validation/createDayMealSchema';
import { Button, ComboboxData } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { FC, useMemo, useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface Props {
  meals: GetMealsResult[];
  mealTypes: MealType[];
}

export const DayMealForm: FC<Props> = ({ meals, mealTypes }) => {
  const { date, calendarId } = useParams<{
    date: string;
    calendarId: string;
  }>();
  const router = useRouter();
  const form = useForm<CreateDayMeal>({
    defaultValues: {
      meal: undefined,
      mealType: undefined,
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
          await createDayMealAction(data, calendarId, date);

          router.push(`/${calendarId}/${date}`);
        });
      }),
    [calendarId, date, handleSubmit, router],
  );

  const mealOptions = useMemo<ComboboxData>(
    () =>
      meals.map(({ id, name }) => ({
        label: name,
        value: id,
      })),
    [meals],
  );
  const mealTypesOptions = useMemo<ComboboxData>(
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
        <SelectField
          name="meal"
          data={mealOptions}
          placeholder="Meal"
          label="Meal"
        />
        <SelectField
          name="mealType"
          data={mealTypesOptions}
          placeholder="Meal type"
          label="Meal type"
        />
        <Button type="submit" variant="outline" disabled={isSubmitting}>
          Assign
        </Button>
      </form>
    </FormProvider>
  );
};
