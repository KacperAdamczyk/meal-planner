import { MealGroupItem } from '@/components/custom/MealGroup/MealGroupItem';
import { DayMealWithName } from '@/db/actions/getDayMeals';
import { GroupedMealsByType } from '@/db/actions/helpers/groupMealsByType';
import { FC } from 'react';

interface Props {
  groupedMeals?: GroupedMealsByType<DayMealWithName>;
}

export const MealGroup: FC<Props> = ({ groupedMeals }) => {
  return (
    <div className="border-input min-w-full rounded border-2 p-4">
      {groupedMeals ? (
        <>
          <h3 className="border-b-input border-b-2 text-xl">
            {groupedMeals.type}
          </h3>
          <div className="flex flex-col gap-2 pt-2">
            {groupedMeals.meals.map(({ name, mealId }) => (
              <MealGroupItem key={mealId} id={mealId} name={name} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center">No meals for this day</p>
      )}
    </div>
  );
};
