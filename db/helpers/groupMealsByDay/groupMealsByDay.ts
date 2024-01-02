export interface GroupedMealsByDay<Meal> {
  date: string;
  meals: Meal[];
}

export const groupMealsByDay = <Meal extends { date: string }>(
  meals: Meal[],
): GroupedMealsByDay<Meal>[] => {
  const daysMap = new Map<string, GroupedMealsByDay<Meal>>();

  for (const meal of meals) {
    const current = daysMap.get(meal.date);

    if (current) {
      current.meals.push(meal);
    } else {
      daysMap.set(meal.date, {
        date: meal.date,
        meals: [meal],
      });
    }
  }

  return Array.from(daysMap.values());
};
