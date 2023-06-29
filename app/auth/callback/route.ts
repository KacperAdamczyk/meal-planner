import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import { env } from '@/env.js';

export async function GET({ nextUrl }: NextRequest) {
  const code = nextUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient(
      { cookies },
      {
        supabaseUrl: env.SUPABASE_URL,
        supabaseKey: env.SUPABASE_ANON_KEY,
      },
    );
    const session = await supabase.auth.exchangeCodeForSession(code);
    console.log('session', session);
  }

  return NextResponse.redirect(nextUrl.origin);
}
