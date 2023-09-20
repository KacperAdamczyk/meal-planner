import { User } from '@/db/schema';
import {
  routeHandlerDb,
  serverActionDb,
  serverComponentDb,
} from '@/db/supabase';
import { cache } from 'react';

type Handler =
  | typeof routeHandlerDb
  | typeof serverActionDb
  | typeof serverComponentDb;

export const getUser = cache(async (handler: Handler): Promise<User> => {
  const {
    data: { session },
    error,
  } = await handler().auth.getSession();

  if (error ?? !session?.user) {
    throw new Error(error?.message ?? 'Not authenticated');
  }

  return {
    ...session.user,
    email: session.user.email ?? null,
  };
});
