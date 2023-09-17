import { createServerAction } from '@/actions/helpers';
import { createDayMeal } from '@/db/actions/createDayMeal';
import { createDayMealSchema } from '@/schemas/createDayMealSchema';

export const createDayMealAction = createServerAction(
  createDayMealSchema,
  createDayMeal,
);
