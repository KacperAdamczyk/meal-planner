import { Dashboard } from '@/components/layout/Dashboard';
import { FC } from 'react';

const Date: FC<{ params: { calendarId: string; date: string } }> = ({
  params: { calendarId, date },
}) => {
  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default Date;
