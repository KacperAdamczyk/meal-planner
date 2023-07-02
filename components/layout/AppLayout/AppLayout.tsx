import { FC, PropsWithChildren } from 'react';
import { Header } from '@/components/layout/Header';

export const AppLayout: FC<PropsWithChildren> = ({ children }) => (
  <main>
    <section>
      <Header />
    </section>
    <section>{children}</section>
  </main>
);
