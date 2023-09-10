import { z } from 'zod';

export const createMealSchema = z.object({
  name: z.string().min(1).max(30),
  defaultMealType: z.string().optional(),
});

export type CreateMeal = z.infer<typeof createMealSchema>;
