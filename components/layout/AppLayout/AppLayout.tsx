import { Header } from '@/components/layout/Header/Header';
import { AppShell, AppShellHeader, AppShellMain } from '@mantine/core';
import { FC, PropsWithChildren } from 'react';

export const AppLayout: FC<PropsWithChildren> = ({ children }) => (
  <AppShell header={{ height: 60 }}>
    <AppShellHeader>
      <Header />
    </AppShellHeader>
    <AppShellMain className="mx-auto my-2 max-w-6xl">{children}</AppShellMain>
  </AppShell>
);
