import { DayMealWithName } from '@/db/actions/getDayMeals';
import { GroupedMealsByType } from '@/db/actions/helpers/groupMealsByType';
import { FC } from 'react';

interface Props {
  groupedMeals: GroupedMealsByType<DayMealWithName>;
}

export const MealGroup: FC<Props> = ({ groupedMeals: { type, meals } }) => {
  return (
    <div>
      <h3>{type}</h3>
      {meals.map(({ name, mealId }) => (
        <div key={mealId}>{name}</div>
      ))}
    </div>
  );
};
