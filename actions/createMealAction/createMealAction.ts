'user server';
import { createServerAction } from '@/actions/helpers';
import { createMeal } from '@/db/actions/createMeal';
import { createMealSchema } from '@/schemas/createMealSchema';

export const createMealAction = createServerAction(
  createMealSchema,
  createMeal,
);
