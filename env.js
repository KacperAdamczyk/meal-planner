import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url().min(1),
    SUPABASE_URL: z.string().url().min(1),
    SUPABASE_ANON_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: {},
  skipValidation: process.env.CI === 'true',
});
