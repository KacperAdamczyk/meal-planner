import { MealsList } from '@/components/layout/MealsList';
import { FC } from 'react';

interface Props {
  params: {
    calendarId: string;
  };
}

const Meals: FC<Props> = ({ params: { calendarId } }) => {
  return (
    <div>
      <MealsList calendarId={calendarId} meals={[]} />
    </div>
  );
};

export default Meals;
