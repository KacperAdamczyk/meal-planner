import { FC, PropsWithChildren } from 'react';
import { UserProfile } from '@/components/layout/UserProfile/UserProfile';
import { Soup } from 'lucide-react';

export const Header: FC<PropsWithChildren> = async () => (
  <header className="rounded-b-lg border-b-2 border-secondary p-4 shadow-sm">
    <div className="m-auto flex max-w-7xl items-center text-lg sm:text-2xl">
      <div className="flex grow items-center gap-1">
        <span>Meal Planner</span>
        <Soup />
      </div>
      <UserProfile />
    </div>
  </header>
);
