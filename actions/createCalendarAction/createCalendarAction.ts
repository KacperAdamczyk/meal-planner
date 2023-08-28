'use server';

import { createServerAction } from '@/actions/helpers';
import { createCalendar } from '@/db/actions/createCalendar';
import { createCalendarSchema } from '@/schemas/createCalendarSchema';

export const createCalendarAction = createServerAction(
  createCalendarSchema,
  createCalendar,
);
