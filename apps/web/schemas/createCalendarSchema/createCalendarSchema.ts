import { z } from 'zod';

export const createCalendarSchema = z.object({
  name: z.string().min(1).max(15),
  shared: z.array(z.object({ userId: z.string() })),
});

export type CreateCalendar = z.infer<typeof createCalendarSchema>;
