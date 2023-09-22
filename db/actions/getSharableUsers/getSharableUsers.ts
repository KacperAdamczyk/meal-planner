import { db } from '@/db';
import { User, users } from '@/db/schema';
import { ne } from 'drizzle-orm';

export const getSharableUsers = async (
  user: User,
  includeSelf = false,
): Promise<User[]> => {
  if (includeSelf) {
    return db.select().from(users);
  }

  return db.select().from(users).where(ne(users.id, user.id));
};
