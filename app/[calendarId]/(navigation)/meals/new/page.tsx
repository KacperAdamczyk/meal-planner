import { MealForm } from '@/components/layout/MealForm';
import { getMealTypes } from '@/db/queries/getMealTypes';
import { getUser, serverComponentDb } from '@/db/supabase';
import { FC } from 'react';

interface Props {
  params: {
    calendarId: string;
  };
}

const NewMeal: FC<Props> = async ({ params: { calendarId } }) => {
  const user = await getUser(serverComponentDb);
  const mealTypes = await getMealTypes(user, calendarId);

  return (
    <div>
      <MealForm mealTypes={mealTypes} />
    </div>
  );
};

export default NewMeal;
