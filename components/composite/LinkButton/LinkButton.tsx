'use client';
import { ActionIcon, Button, ButtonProps } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

interface Props {
  href: string;
  isActive?: (pathname: string, href: string) => boolean;
  size?: ButtonProps['size'];
  variant?: ButtonProps['variant'];
  disabled?: ButtonProps['disabled'];
  action?: boolean;
}

export const LinkButton = ({
  href,
  size,
  variant,
  disabled,
  children,
  isActive = (pathname, href) => pathname === href,
  action,
}: PropsWithChildren<Props>) => {
  const pathname = usePathname();

  const active = isActive(pathname, href);

  const ButtonComponent = action ? ActionIcon : Button;

  return (
    <ButtonComponent
      variant={variant ?? (active ? 'filled' : 'outline')}
      component={Link}
      href={new URL(href)}
      size={size}
      disabled={disabled}
    >
      {children}
    </ButtonComponent>
  );
};
