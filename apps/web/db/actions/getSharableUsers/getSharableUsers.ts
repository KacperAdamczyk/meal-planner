import { db } from '@/db';
import { User, users } from '@/db/schema';
import { ne } from 'drizzle-orm';

export const getSharableUsers = async (user: User): Promise<User[]> =>
  db.select().from(users).where(ne(users.id, user.id));
