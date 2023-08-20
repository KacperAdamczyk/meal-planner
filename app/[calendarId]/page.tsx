import { FC } from 'react';

const Calendar: FC<{ params: Record<string, string> }> = ({ params }) => {
  return <div>Calendar {JSON.stringify(params)}</div>;
};

export default Calendar;
