import { CalendarSelector } from '@/components/layout/CalendarSelector';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <section>
      <div className="m-4 flex justify-center">
        <CalendarSelector />
      </div>
      <div>{children}</div>
    </section>
  );
}
