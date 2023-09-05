import { GroupedMealsByDay } from '@/db/actions/helpers/groupMealsByDay';
import { FC } from 'react';

interface Props {
  day: GroupedMealsByDay | undefined;
}

export const SelectedDay: FC<Props> = ({ day }) => {
  return (
    <div>
      {day ? <div>{day.date.toISOString()}</div> : <div>Select a day</div>}
    </div>
  );
};
