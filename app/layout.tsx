import { Noto_Sans } from 'next/font/google';
import { AppLayout } from '@/components/layout/AppLayout';
import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';
import { ColorSchemeScript } from '@mantine/core';
import { ThemeProvider } from '@/components/layout/ThemeProvider';

import './globals.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export const metadata = {
  title: 'Meal Planner',
  description: 'Meal Planner',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={cn(notoSans.className, 'min-w-[300px]')}>
        <ThemeProvider>
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
