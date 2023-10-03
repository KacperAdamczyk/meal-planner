/* eslint-disable @typescript-eslint/no-misused-promises */
import { Provider } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { serverActionDb } from '@/db/supabase';
import { headers } from 'next/headers';
import { env } from '@/env';
import { Button, Card, Divider, Text, TextInput } from '@mantine/core';

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
      <Card className="mt-10 w-5/12 p-4" withBorder>
        <div className="mb-2">
          <Text size="xl">Login</Text>
          <Text size="sm">Select login provider</Text>
        </div>
        <div>
          {env.DEV_CREDENTIALS_LOGIN === 'true' && (
            <>
              <form
                action={handleCredentialsSignIn}
                className="flex flex-col gap-2"
              >
                <TextInput
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full"
                />
                <TextInput
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full"
                />
                <Button type="submit">Login with credentials</Button>
              </form>
              <Divider className="my-4" />
            </>
          )}
          <form action={handleOauthSignIn} className="flex flex-col gap-2">
            <Button
              type="submit"
              name="provider"
              value="discord"
              color="#7289da"
              className="w-full"
            >
              Discord
            </Button>
            <Button
              type="submit"
              name="provider"
              value="github"
              className="w-full"
              color="gray"
            >
              GitHub
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
