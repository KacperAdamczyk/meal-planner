import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { type NextRequest, NextResponse } from 'next/server';
import { env } from '@/env';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createMiddlewareClient(
    { req: request, res: response },
    {
      supabaseUrl: env.SUPABASE_URL,
      supabaseKey: env.SUPABASE_ANON_KEY,
    },
  );
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return NextResponse.redirect(new URL('/login', request.nextUrl.origin));

  return response;
}
export const config = {
  matcher: [
    '/((?!login|auth/callback|_next/static|_next/image|favicon.ico).*)',
  ],
};
