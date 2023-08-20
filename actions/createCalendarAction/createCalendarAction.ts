'use server';

import { createCalendar } from '@/db/actions/createCalendar';
import { Calendar } from '@/db/schema';
import { getUser, serverActionDb } from '@/db/supabase';
import {
  CreateCalendar,
  createCalendarSchema,
} from '@/schemas/createCalendarSchema';

export const createCalendarAction = async (
  data: CreateCalendar,
): Promise<Calendar> => {
  const user = await getUser(serverActionDb);
  const validatedData = createCalendarSchema.parse(data);

  return createCalendar(user, validatedData);
};
