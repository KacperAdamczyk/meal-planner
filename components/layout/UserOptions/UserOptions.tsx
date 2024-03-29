/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from 'react';
import { redirect } from 'next/navigation';
import { serverComponentDb } from '@/db/supabase/serverComponentDb';
import { serverActionDb } from '@/db/supabase/serverActionDb';
import { ModeToggle } from '@/components/composite/ModeToggle';
import { ActionIcon, Avatar } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';

export const UserOptions: FC = async () => {
  const supabase = serverComponentDb();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const handleSignOut = async () => {
    'use server';
    const supabase = serverActionDb();
    await supabase.auth.signOut();

    redirect('/login');
  };

  return (
    <form action={handleSignOut} className="flex items-center gap-x-0.5">
      {!!user && (
        <>
          <Avatar>{user.email?.at(0)?.toLocaleUpperCase()}</Avatar>
          <span className="hidden px-2 text-xs sm:inline">{user.email}</span>
          <ActionIcon variant="outline" size="lg" type="submit">
            <IconLogout />
          </ActionIcon>
        </>
      )}
      <ModeToggle />
    </form>
  );
};
