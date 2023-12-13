import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { env } from '@/env.mjs';

export const serverComponentDb = () => {
  const cookieStore = cookies();

  return createServerClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
  });
};
