import { db } from '@/db';
import { User, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const getUser = async (userId: string): Promise<User | undefined> => {
  const user = (await db.select().from(users).where(eq(users.id, userId))).at(
    0,
  );

  return user;
};
