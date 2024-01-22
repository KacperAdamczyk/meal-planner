import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    SUPABASE_URL: z.string().url(),
    SUPABASE_ANON_KEY: z.string().min(1),
    E2E_BASE_URL: z.string().url().default('http://localhost:3000'),
    E2E_EMAIL: z.string().email().optional(),
    E2E_PASSWORD: z.string().optional(),
  },
  experimental__runtimeEnv: {},
  skipValidation: process.env.CI === 'true',
});
