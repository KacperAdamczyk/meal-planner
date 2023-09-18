'use server';
import { createServerAction } from '@/actions/helpers';
import { createDayMeal } from '@/db/actions/createDayMeal';
import { createDayMealSchema } from '@/schemas/createDayMealSchema';

export const createDayMealAction = createServerAction(
  createDayMealSchema,
  createDayMeal,
  {
    path: '[calendarId]/[date]',
  },
);
