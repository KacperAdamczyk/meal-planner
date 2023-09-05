import { DayMeal } from '@/db/schema';

export interface GroupedMealsByDay {
  date: Date;
  meals: DayMeal[];
}

export const groupMealsByDay = (meals: DayMeal[]): GroupedMealsByDay[] => {
  const daysMap = new Map<string, GroupedMealsByDay>();

  for (const meal of meals) {
    const current = daysMap.get(meal.date.toISOString());

    if (current) {
      current.meals.push(meal);
    } else {
      daysMap.set(meal.date.toISOString(), {
        date: meal.date,
        meals: [meal],
      });
    }
  }

  return Array.from(daysMap.values());
};
