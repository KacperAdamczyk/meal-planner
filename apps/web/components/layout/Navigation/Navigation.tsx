'use client';
import { LinkButton } from 'ui';
import { FC } from 'react';

interface Props {
  calendarId: string;
}

export const Navigation: FC<Props> = ({ calendarId }) => (
  <div className="border-border flex gap-1 rounded-md border">
    <LinkButton
      href={`/${calendarId}`}
      isActive={(pathname, href) =>
        new RegExp(`^${href}/\\d{4}-\\d{2}-\\d{2}$`).test(pathname)
      }
    >
      Dashboard
    </LinkButton>
    <LinkButton
      href={`/${calendarId}/meals`}
      isActive={(pathname, href) => pathname.startsWith(href)}
    >
      Meals
    </LinkButton>
    <LinkButton href={`/${calendarId}/statistics`}>Statistics</LinkButton>
  </div>
);
