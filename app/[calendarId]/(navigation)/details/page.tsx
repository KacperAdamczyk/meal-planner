import { LinkButton } from '@/components/composite/LinkButton';
import { Header } from '@/components/custom/Header';
import { getCalendar } from '@/db/actions/getCalendar';
import { getCalendarShares } from '@/db/actions/getCalendarShares';
import { getUser as getOwner } from '@/db/actions/getUser';
import { getUser, serverComponentDb } from '@/db/supabase';
import { IconPencil } from '@tabler/icons-react';
import { notFound } from 'next/navigation';
import { FC } from 'react';

interface Props {
  params: {
    calendarId: string;
  };
}

const ViewCalendar: FC<Props> = async ({ params: { calendarId } }) => {
  const user = await getUser(serverComponentDb);
  const [calendar, shares] = await Promise.all([
    getCalendar(user, calendarId),
    getCalendarShares(calendarId),
  ]);

  if (!calendar) {
    notFound();
  }

  const owner = await getOwner(calendar.userId);

  const isOwner = owner?.id === user.id;
  console.log(shares);

  return (
    <>
      <Header
        header="Calendar"
        headerItalic={calendar.name}
        subHeader={isOwner ? undefined : 'Owned by:'}
        subHeaderItalic={isOwner ? undefined : owner?.email ?? owner?.id}
      >
        {isOwner && (
          <LinkButton
            href={`/${calendarId}/edit`}
            variant="outline"
            size="icon"
          >
            <IconPencil className="h-4 w-4" />
          </LinkButton>
        )}
      </Header>
      {shares.map((share) => (
        <div key={share.userId}>{share.userId}</div>
      ))}
    </>
  );
};

export default ViewCalendar;
