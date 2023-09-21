import { Skeleton } from '@/components/ui/skeleton';
import { FC } from 'react';

const rows = 5;

export const CalendarPlaceholder: FC = () => {
  return (
    <div className="p-3">
      <div className="w-56">
        <div className="flex justify-between gap-2">
          <div className="h-7 w-7 rounded-md border border-input bg-secondary shadow-sm" />
          <Skeleton className="grow rounded-none" />
          <div className="h-7 w-7 rounded-md border border-input bg-secondary shadow-sm" />
        </div>
        <Skeleton className="mt-4 h-5 rounded-none" />
        <div className="mt-2 flex flex-col gap-y-2">
          {Array.from({ length: rows }).map((_, i) => (
            <Skeleton key={i} className="h-8 rounded-none" />
          ))}
        </div>
      </div>
    </div>
  );
};
