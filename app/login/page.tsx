import { Provider } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { env } from '@/env';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { serverActionDb } from '@/db/supabase';
import { Button } from '@/components/ui/button';

export default async function Login() {
  const handleSignIn = async (formData: FormData) => {
    'use server';
    const provider = formData.get('provider');

    if (typeof provider !== 'string') {
      throw new Error('Provider is not a string');
    }

    const supabase = serverActionDb();
    const {
      data: { url },
    } = await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options: { redirectTo: `${env.BASE_URL}/auth/callback` },
    });

    if (url) {
      redirect(url);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="mt-10 w-2/12">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Select login provider</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSignIn}>
            <Button
              name="provider"
              value="discord"
              type="submit"
              className="w-full bg-[#7289da]"
            >
              Discord
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
