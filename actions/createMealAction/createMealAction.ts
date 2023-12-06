'use server';
import { createServerAction } from '@/actions/helpers';
import { createMeal } from '@/db/actions/createMeal';
import { createMealSchema } from '@/validation/createMealSchema';

export const createMealAction = createServerAction(
  createMealSchema,
  createMeal,
  {
    tag: 'meals',
  },
);
