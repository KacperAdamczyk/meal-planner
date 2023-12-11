import { db } from '@/db';
import { User } from '@/db/schema';

export const getUser = (userId: string): Promise<User | undefined> =>
  db.query.users.findFirst({
    where: (user, { eq }) => eq(user.id, userId),
  });
