import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { env } from '@/env.js';

export default async function Login() {
  const handleSignIn = async () => {
    'use server';

    const supabase = createServerActionClient(
      { cookies },
      {
        supabaseUrl: env.SUPABASE_URL,
        supabaseKey: env.SUPABASE_ANON_KEY,
      },
    );
    const {
      data: { url },
    } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: { redirectTo: `${env.BASE_URL}/auth/callback` },
    });
    console.log('signed in', url);

    if (url) {
      redirect(url);
    }
  };

  const handleSignOut = async () => {
    'use server';
    const supabase = createServerActionClient({ cookies });
    await supabase.auth.signOut();
    revalidatePath('/');
  };

  return (
    <form>
      <button formAction={handleSignIn}>Sign in</button>
      <button formAction={handleSignOut}>Sign out</button>
    </form>
  );
}
