import { z } from 'zod';

export const calendarSchema = z.object({
  name: z.string().min(1).max(30),
  shared: z.array(z.string().uuid()),
});

export type CalendarSchema = z.infer<typeof calendarSchema>;
