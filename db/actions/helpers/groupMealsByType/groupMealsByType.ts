import { DayMeal, MealType } from '@/db/schema';

export interface GroupedMealsByType {
  type: string;
  meals: DayMeal[];
}

export const groupMealsByType = (
  meals: DayMeal[],
  mealTypes?: MealType[],
): GroupedMealsByType[] => {
  const typesMap = new Map<string, GroupedMealsByType>();

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
