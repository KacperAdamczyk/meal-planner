import { MealsList } from '@/components/layout/MealsList';
import { getMeals } from '@/db/actions/getMeals';
import { getUser, serverComponentDb } from '@/db/supabase';
import { FC } from 'react';

interface Props {
  params: {
    calendarId: string;
  };
}

const Meals: FC<Props> = async ({ params: { calendarId } }) => {
  const user = await getUser(serverComponentDb);
  const meals = await getMeals(user, calendarId);

  return (
    <div>
      <MealsList calendarId={calendarId} meals={meals} />
    </div>
  );
};

export default Meals;
