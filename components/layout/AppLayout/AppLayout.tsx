import { Header } from '@/components/layout/Header/Header';
import { FC, PropsWithChildren } from 'react';

export const AppLayout: FC<PropsWithChildren> = ({ children }) => (
  <main>
    <section>
      <Header />
    </section>
    <section>{children}</section>
  </main>
);
