import { Skeleton } from '@/components/ui/skeleton';
import { FC } from 'react';

interface Props {
  rows: number;
}

export const MealGroupPlaceholder: FC<Props> = ({ rows }) => (
  <div className="min-w-full rounded border-2 border-input p-4">
    <div className="border-b-2 border-b-input">
      <Skeleton className="h-[30px] w-1/4 max-w-xs rounded-none" />
    </div>
    <div className="flex flex-col gap-2 pt-2">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-[40px]" />
      ))}
    </div>
  </div>
);
