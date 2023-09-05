import { GroupedMealsByDay } from '@/db/actions/helpers/groupMealsByDay';
import { FC } from 'react';

interface Props {
  calendarId: string;
  date: string;
}

export const SelectedDay: FC<Props> = ({ calendarId, date }) => {
  return (
    <div className="m-2 w-full rounded border-2 border-secondary p-4">
      {date ? <div>{date}</div> : <div>Select a day</div>}
    </div>
  );
};
