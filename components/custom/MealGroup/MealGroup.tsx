import { MealGroupItem } from '@/components/custom/MealGroup/MealGroupItem';
import { DayMealWithName } from '@/db/actions/getDayMeals';
import { GroupedMealsByType } from '@/db/actions/helpers/groupMealsByType';
import { Card, CardSection } from '@mantine/core';
import { FC } from 'react';

interface Props {
  groupedMeals?: GroupedMealsByType<DayMealWithName>;
}

export const MealGroup: FC<Props> = ({ groupedMeals }) => {
  return (
    <Card>
      {groupedMeals ? (
        <>
          <h3 className="border-b text-xl">{groupedMeals.type}</h3>
          <div className="flex flex-col gap-2 pt-2">
            {groupedMeals.meals.map(({ name, mealId }) => (
              <CardSection key={mealId} inheritPadding>
                <MealGroupItem key={mealId} id={mealId} name={name} />
              </CardSection>
            ))}
          </div>
        </>
      ) : (
        <CardSection inheritPadding>
          <div className="text-center">No meals for this day</div>
        </CardSection>
      )}
    </Card>
  );
};
