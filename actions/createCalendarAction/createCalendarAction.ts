'use server';

import { createServerAction } from '@/actions/helpers';
import { createCalendar } from '@/db/actions/createCalendar';
import { calendarSchema } from '@/validation/calendarSchema';

export const createCalendarAction = createServerAction(
  calendarSchema,
  createCalendar,
  {
    tag: 'calendars',
  },
);
