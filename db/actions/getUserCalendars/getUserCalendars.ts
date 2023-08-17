import { db } from '@/db';
import { Calendar, User, calendars } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const getUserCalendars = async (user: User): Promise<Calendar[]> =>
  db.select().from(calendars).where(eq(calendars.userId, user.id));
