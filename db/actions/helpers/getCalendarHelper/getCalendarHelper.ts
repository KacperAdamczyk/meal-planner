import { Db } from '@/db';
import { sharedCalendars } from '@/db/supabase/schema/sharedCalendars';
import { calendars } from '@/db/calendars';
import { User } from '@/db/supabase/schema/users';
import { and, eq, or } from 'drizzle-orm';

export const getCalendarHelper = (user: User, calendarId: string) =>
  and(
    eq(calendars.id, calendarId),
    or(eq(calendars.userId, user.id), eq(sharedCalendars.userId, user.id)),
  );
