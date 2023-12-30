import { DayMealForm } from '@/components/layout/DayMealForm';
import { getMealTypes } from '@/db/queries/getMealTypes';
import { getMeals } from '@/db/queries/getMeals';
import { getUser, serverComponentDb } from '@/db/supabase';
import { FC } from 'react';

interface Props {
  params: {
    calendarId: string;
    date: string;
  };
}

const NewDayMeal: FC<Props> = async ({ params: { calendarId, date } }) => {
  const user = await getUser(serverComponentDb);
  const [meals, mealTypes] = await Promise.all([
    getMeals(user, calendarId),
    getMealTypes(user, calendarId),
  ]);

  return (
    <div>
      <div>Assign meal for {date}</div>
      <DayMealForm meals={meals} mealTypes={mealTypes} />
    </div>
  );
};

export default NewDayMeal;
