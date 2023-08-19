import { CalendarForm } from '@/components/layout/CalendarForm';
import { getSharableUsers } from '@/db/actions/getSharableUsers';
import { getUser, serverComponentDb } from '@/db/supabase';

export default async function New() {
  const user = await getUser(serverComponentDb);
  const sharableUsers = await getSharableUsers(user);

  return <CalendarForm sharableUsers={sharableUsers} />;
}
