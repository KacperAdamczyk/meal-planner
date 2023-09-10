import { MealGroupItem } from '@/components/layout/MealGroup/MealGroupItem';
import { DayMealWithName } from '@/db/actions/getDayMeals';
import { GroupedMealsByType } from '@/db/actions/helpers/groupMealsByType';
import { FC } from 'react';

interface Props {
  groupedMeals: GroupedMealsByType<DayMealWithName>;
}

export const MealGroup: FC<Props> = ({ groupedMeals: { type, meals } }) => {
  return (
    <div>
      <h3 className="border-b-primary border-b-2 text-xl">{type}</h3>
      <div className="flex flex-col gap-2 py-2">
        {meals.map(({ name, mealId }) => (
          <MealGroupItem key={mealId} id={mealId} name={name} />
        ))}
      </div>
    </div>
  );
};
