import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { env } from '@/env';

export const routeHandlerDb = () => {
  return createRouteHandlerClient(
    {
      cookies,
    },
    {
      supabaseUrl: env.SUPABASE_URL,
      supabaseKey: env.SUPABASE_ANON_KEY,
    },
  );
};
