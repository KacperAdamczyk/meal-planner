import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { env } from '@/env';

export const serverActionDb = () => {
  return createServerActionClient(
    {
      cookies,
    },
    {
      supabaseUrl: env.SUPABASE_URL,
      supabaseKey: env.SUPABASE_ANON_KEY,
    },
  );
};
