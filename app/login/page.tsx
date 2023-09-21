/* eslint-disable @typescript-eslint/no-misused-promises */
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
import { env } from '@/env';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function Login() {
  const handleCredentialsSignIn = async (formData: FormData) => {
    'use server';
    const email = formData.get('email');
    const password = formData.get('password');

    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new Error('Email or password is not a string');
    }

    const supabase = serverActionDb();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
    }

    if (data.user) {
      redirect('/');
    }
  };

  const handleOauthSignIn = async (formData: FormData) => {
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
      error,
    } = await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options: { redirectTo: new URL('/auth/callback', origin).toString() },
    });

    if (error) {
      console.error(error);
    }

    if (url) {
      redirect(url);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="mt-10 w-4/12">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Select login provider</CardDescription>
        </CardHeader>
        <CardContent>
          {env.DEV_CREDENTIALS_LOGIN === 'true' && (
            <>
              <form
                action={handleCredentialsSignIn}
                className="flex flex-col gap-2"
              >
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full"
                />
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full"
                />
                <Button type="submit">Login with credentials</Button>
              </form>
              <Separator className="my-4" />
            </>
          )}
          <form action={handleOauthSignIn} className="flex flex-col gap-2">
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
