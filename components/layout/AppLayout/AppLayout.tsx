import { Header } from '@/components/layout/Header/Header';
import { FC, PropsWithChildren } from 'react';

export const AppLayout: FC<PropsWithChildren> = ({ children }) => (
  <main>
    <section>
      <Header />
    </section>
    <section className="mx-auto my-4 max-w-7xl">{children}</section>
  </main>
);
