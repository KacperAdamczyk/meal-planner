import { type NextRequest, NextResponse } from 'next/server';
import { routeHandlerDb } from '@/db/supabase/routeHandlerDb';

export async function GET({ nextUrl }: NextRequest) {
  const code = nextUrl.searchParams.get('code');

  if (code) {
    const supabase = routeHandlerDb();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(nextUrl.origin);
}
