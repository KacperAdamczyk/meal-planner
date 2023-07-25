import { FC } from 'react';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { serverComponentDb } from '@/db/supabase/serverComponentDb';
import { serverActionDb } from '@/db/supabase/serverActionDb';

export const UserProfile: FC = async () => {
  const supabase = serverComponentDb();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const handleSignOut = async () => {
    'use server';
    const supabase = serverActionDb();
    await supabase.auth.signOut();

    redirect('/');
  };

  if (!user) {
    return null;
  }

  return (
    <form action={handleSignOut}>
      <span className="px-2 text-xs">{user.email}</span>
      <Button variant="default" size="icon" type="submit">
        <LogOut className="h-4 w-4" />
      </Button>
    </form>
  );
};
