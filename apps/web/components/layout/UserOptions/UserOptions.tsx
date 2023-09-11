/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from 'react';
import { redirect } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { serverComponentDb } from '@/db/supabase/serverComponentDb';
import { serverActionDb } from '@/db/supabase/serverActionDb';
import { Button, ModeToggle } from 'ui';

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
          <span className="hidden px-2 text-xs sm:inline">{user.email}</span>
          <Button variant="outline" size="icon" type="submit">
            <LogOut className="h-4 w-4" />
          </Button>
        </>
      )}
      <ModeToggle />
    </form>
  );
};
