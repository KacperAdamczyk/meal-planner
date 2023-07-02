import { FC, PropsWithChildren } from 'react';
import { UserProfile } from '@/components/layout/UserProfile/UserProfile';

export const Header: FC<PropsWithChildren> = async () => (
  <header className="flex items-center rounded-b-lg bg-secondary p-4">
    <div className="grow text-center text-2xl">Logbook</div>
    <UserProfile />
  </header>
);
