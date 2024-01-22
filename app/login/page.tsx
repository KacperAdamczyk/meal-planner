/* eslint-disable @typescript-eslint/no-misused-promises */
import { redirect } from 'next/navigation';
import { serverActionDb } from '@/db/supabase';
import { Button, Card, Text, TextInput } from '@mantine/core';

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

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="mt-10 w-5/12 p-4" withBorder>
        <div className="mb-2">
          <Text size="xl">Login</Text>
          <Text size="sm">Select login provider</Text>
        </div>
        <div>
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
        </div>
      </Card>
    </div>
  );
}
