import { FC, PropsWithChildren } from 'react';
import { UserOptions } from '@/components/layout/UserOptions/UserOptions';
import { Soup } from 'lucide-react';
import Link from 'next/link';

export const Header: FC<PropsWithChildren> = () => (
  <header className="rounded-b-lg border-b-2 border-secondary p-2 shadow-sm">
    <div className="m-auto flex max-w-7xl items-center text-lg sm:text-2xl">
      <div className="flex grow items-center gap-1">
        <Link href="/" className="flex items-center gap-1">
          Meal Planner
          <Soup />
        </Link>
      </div>
      <UserOptions />
    </div>
  </header>
);
