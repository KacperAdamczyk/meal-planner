'use client';
import { Button, ButtonProps } from '@/components/ui/button';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

interface Props<RouteType> {
  href: LinkProps<RouteType>['href'];
  isActive?: (pathname: string, href: string) => boolean;
  size?: ButtonProps['size'];
  variant?: ButtonProps['variant'];
  disabled?: ButtonProps['disabled'];
}

export const LinkButton = <RouteType,>({
  href,
  size,
  variant,
  disabled,
  children,
  isActive = (pathname, href) => pathname === href,
}: PropsWithChildren<Props<RouteType>>) => {
  const pathname = usePathname();

  const active = isActive(pathname, href as string);

  return (
    <Button
      asChild
      variant={variant ?? (active ? 'default' : 'ghost')}
      size={size}
      disabled={disabled}
    >
      {disabled ? <span>{children}</span> : <Link href={href}>{children}</Link>}
    </Button>
  );
};
