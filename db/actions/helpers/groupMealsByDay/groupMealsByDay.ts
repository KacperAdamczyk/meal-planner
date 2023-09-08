export interface GroupedMealsByDay<Meal> {
  date: Date;
  meals: Meal[];
}

export const groupMealsByDay = <Meal extends { date: Date }>(
  meals: Meal[],
): GroupedMealsByDay<Meal>[] => {
  const daysMap = new Map<string, GroupedMealsByDay<Meal>>();

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
