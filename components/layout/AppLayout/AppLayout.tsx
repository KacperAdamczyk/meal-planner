import { Header } from '@/components/layout/Header/Header';
import { FC, PropsWithChildren } from 'react';

export const AppLayout: FC<PropsWithChildren> = ({ children }) => (
  <main>
    <section>
      <Header />
    </section>
    <section className="m-auto max-w-7xl">{children}</section>
  </main>
);
