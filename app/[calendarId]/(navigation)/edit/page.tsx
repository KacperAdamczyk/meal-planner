import { EditCalendarForm } from '@/components/layout/EditCalendarForm';
import { FC } from 'react';

interface Props {
  params: {
    calendarId: string;
  };
}

const EditCalendar: FC<Props> = ({ params: { calendarId } }) => {
  return (
    <div className="mx-auto max-w-3xl">
      <EditCalendarForm calendarId={calendarId} />
    </div>
  );
};

export default EditCalendar;
