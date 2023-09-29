import { z } from 'zod';

export const calendarSchema = z.object({
  name: z.string().min(1).max(30),
  shared: z.array(z.object({ userId: z.string() })),
});

export type CalendarSchema = z.infer<typeof calendarSchema>;
