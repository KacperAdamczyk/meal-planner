import { db } from '@/db';
import { User } from '@/db/schema';

export const getSharableUsers = async (
  user: User,
  includeSelf = false,
): Promise<User[]> => {
  if (includeSelf) {
    return db.query.users.findMany();
  }

  return db.query.users.findMany({
    where: (users, { ne }) => ne(users.id, user.id),
  });
};
