'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';

interface Props<RouteType> {
  href: LinkProps<RouteType>['href'];
  isActive?: (pathname: string, href: string) => boolean;
}

export const LinkButton = <RouteType,>({
  href,
  children,
  isActive = (pathname, href) => pathname === href,
}: PropsWithChildren<Props<RouteType>>) => {
  const pathname = usePathname();

  const active = isActive(pathname, href as string);

  return (
    <Button asChild variant={active ? 'default' : 'ghost'}>
      <Link href={href}>{children}</Link>
    </Button>
  );
};
