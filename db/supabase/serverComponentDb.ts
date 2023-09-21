import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { env } from '@/env';

export const serverComponentDb = () => {
  const cookiesStore = cookies();

  return createServerComponentClient(
    {
      cookies: () => cookiesStore,
    },
    {
      supabaseUrl: env.SUPABASE_URL,
      supabaseKey: env.SUPABASE_ANON_KEY,
    },
  );
};
