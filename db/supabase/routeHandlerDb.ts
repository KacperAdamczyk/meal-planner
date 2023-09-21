import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { env } from '@/env';

export const routeHandlerDb = () => {
  const cookiesStore = cookies();

  return createRouteHandlerClient(
    {
      cookies: () => cookiesStore,
    },
    {
      supabaseUrl: env.SUPABASE_URL,
      supabaseKey: env.SUPABASE_ANON_KEY,
    },
  );
};
