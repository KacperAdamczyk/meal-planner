'use client';
import { LinkButton } from '@/components/composite/LinkButton';
import { FC } from 'react';

interface Props {
  calendarId: string;
}

export const Navigation: FC<Props> = ({ calendarId }) => (
  <div className="flex gap-1 rounded-md border border-border">
    <LinkButton
      href={`/${calendarId}`}
      isActive={(pathname, href) =>
        new RegExp(`^${href}/\\d\\d\\d\\d-\\d\\d-\\d\\d$`).test(pathname)
      }
    >
      Dashboard
    </LinkButton>
    <LinkButton href={`/${calendarId}/meals`}>Meals</LinkButton>
    <LinkButton href={`/${calendarId}/statistics`}>Statistics</LinkButton>
  </div>
);
