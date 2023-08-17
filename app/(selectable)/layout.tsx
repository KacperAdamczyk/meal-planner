import { CalendarSelector } from '@/components/layout/CalendarSelector';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <section>
      <div className="m-4 flex justify-center">
        <CalendarSelector />
      </div>
      <div className="m-auto max-w-7xl">{children}</div>
    </section>
  );
}
