import { User } from '@/db/schema';
import {
  routeHandlerDb,
  serverActionDb,
  serverComponentDb,
} from '@/db/supabase';

type Handler =
  | typeof routeHandlerDb
  | typeof serverActionDb
  | typeof serverComponentDb;

export const getUser = async (handler: Handler): Promise<User> => {
  const {
    data: { user },
    error,
  } = await handler().auth.getUser();

  if (error || !user) {
    throw error;
  }

  return user as User;
};
