'use server';

import { createServerAction } from '@/actions/helpers';
import { updateCalendar } from '@/db/actions/updateCalendar';
import { calendarSchema } from '@/schemas/calendarSchema';

export const updateCalendarAction = createServerAction(
  calendarSchema,
  updateCalendar,
  {
    tag: 'calendars',
  },
);
