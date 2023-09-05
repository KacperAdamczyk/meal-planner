import {
  GroupedMealsByType,
  groupMealsByType,
} from '@/db/actions/helpers/groupMealsByType';
import { DayMeal } from '@/db/schema';
import { parseISO } from 'date-fns';

export interface GroupedMealsByDay {
  date: Date;
  types: GroupedMealsByType[];
}

export const groupMealsByDay = (meals: DayMeal[]): GroupedMealsByDay[] => {
  const daysMap = new Map<string, DayMeal[]>();

  for (const meal of meals) {
    const current = daysMap.get(meal.date.toISOString());

    if (current) {
      current.push(meal);
    } else {
      daysMap.set(meal.date.toISOString(), [meal]);
    }
  }

  return Array.from(daysMap.entries()).map(([date, meals]) => ({
    date: parseISO(date),
    types: groupMealsByType(meals),
  }));
};
