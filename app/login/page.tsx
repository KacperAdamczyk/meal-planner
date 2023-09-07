import { Provider } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { serverActionDb } from '@/db/supabase';
import { Button } from '@/components/ui/button';
import { headers } from 'next/headers';

export default function Login() {
  const handleSignIn = async (formData: FormData) => {
    'use server';
    const provider = formData.get('provider');

    if (typeof provider !== 'string') {
      throw new Error('Provider is not a string');
    }

    const origin = headers().get('origin');

    if (!origin) {
      throw new Error('Missing origin header');
    }

    const supabase = serverActionDb();
    const {
      data: { url },
    } = await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options: { redirectTo: new URL('/auth/callback', origin).toString() },
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
          <form action={handleSignIn} className="flex flex-col gap-2">
            <Button
              name="provider"
              value="discord"
              type="submit"
              className="w-full bg-[#7289da]"
            >
              Discord
            </Button>
            <Button
              name="provider"
              value="github"
              type="submit"
              className="w-full"
            >
              GitHub
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
