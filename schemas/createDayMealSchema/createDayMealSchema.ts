import { z } from 'zod';

export const createDayMealSchema = z.object({
  meal: z.string().uuid(),
  mealType: z.string().uuid(),
});

export type CreateDayMeal = z.infer<typeof createDayMealSchema>;
