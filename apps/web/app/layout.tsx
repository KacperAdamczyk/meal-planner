import { Noto_Sans } from 'next/font/google';
import { AppLayout } from '@/components/layout/AppLayout';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { PropsWithChildren } from 'react';

import './globals.css';

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
      <body className={cn(notoSans.className, 'min-w-[300px]')}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
