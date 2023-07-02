import { Noto_Sans } from 'next/font/google';
import { AppLayout } from '@/components/layout/AppLayout';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

import './globals.css';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export const metadata = {
  title: 'Logbook',
  description: 'Pilot Logbook',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(notoSans.className, 'dark')}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
