'use client';
import { ActionIcon, Button, ButtonProps } from '@mantine/core';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

interface Props<RouteType> {
  href: LinkProps<RouteType>['href'];
  isActive?: (pathname: string, href: string) => boolean;
  size?: ButtonProps['size'];
  variant?: ButtonProps['variant'];
  disabled?: ButtonProps['disabled'];
  action?: boolean;
}

export const LinkButton = <RouteType,>({
  href,
  size,
  variant,
  disabled,
  children,
  isActive = (pathname, href) => pathname === href,
  action,
}: PropsWithChildren<Props<RouteType>>) => {
  const pathname = usePathname();

  const active = isActive(pathname, href as string);

  const ButtonComponent: typeof ActionIcon | typeof Button = action
    ? ActionIcon
    : Button;

  return (
    <ButtonComponent
      variant={variant ?? (active ? 'filled' : 'outline')}
      component={Link<RouteType>}
      href={href}
      size={size}
      disabled={disabled}
    >
      {children}
    </ButtonComponent>
  );
};
