import { MealType } from '@/db/schema';

export interface GroupedMealsByType<Meal> {
  type: string;
  meals: Meal[];
}

export const groupMealsByType = <Meal extends { mealTypeId: string }>(
  meals: Meal[],
  mealTypes?: MealType[],
): GroupedMealsByType<Meal>[] => {
  const typesMap = new Map<string, GroupedMealsByType<Meal>>();

  for (const meal of meals) {
    const current = typesMap.get(meal.mealTypeId);

    if (current) {
      current.meals.push(meal);
    } else {
      const mealType = mealTypes?.find((type) => type.id === meal.mealTypeId);

      typesMap.set(meal.mealTypeId, {
        type: mealType?.name ?? meal.mealTypeId,
        meals: [meal],
      });
    }
  }

  return Array.from(typesMap.values());
};
