/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';
import { createDayMealAction } from '@/actions/createDayMealAction';
import { ComboboxOption } from '@/components/composite/Combobox';
import { SelectField } from '@/components/fields';
import { Button } from '@/components/ui/button';
import { GetMealsResult } from '@/db/actions/getMeals';
import { MealType } from '@/db/schema';
import { CreateDayMeal } from '@/schemas/createDayMealSchema';
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

  const mealOptions = useMemo<ComboboxOption[]>(
    () =>
      meals.map(({ id, name }) => ({
        label: name,
        value: id,
      })),
    [meals],
  );
  const mealTypesOptions = useMemo<ComboboxOption[]>(
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
          options={mealOptions}
          placeholder="Meal"
          label="Meal"
        />
        <SelectField
          name="mealType"
          options={mealTypesOptions}
          placeholder="Meal type"
          label="Meal type"
        />
        <Button type="submit" disabled={isSubmitting}>
          Assign
        </Button>
      </form>
    </FormProvider>
  );
};
