import { Noto_Sans } from 'next/font/google';
import { AppLayout } from '@/components/layout/AppLayout';
import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';

import './globals.css';
import '@mantine/core/styles.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';

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
