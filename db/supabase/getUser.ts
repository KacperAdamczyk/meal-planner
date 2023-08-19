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
    data: { session },
    error,
  } = await handler().auth.getSession();

  if (error || !session?.user) {
    throw error;
  }

  return {
    ...session.user,
    email: session.user.email ?? null,
  };
};
