import { getMeals } from '@/db/queries/getMeals';
import {
  calendar1,
  meal1,
  meal2,
  meal3,
  mealType1,
  mealType3,
  unusedId,
  user1,
} from '@/db/seed-data';
import { describe, expect, test } from 'bun:test';

describe('getMeals', () => {
  test('returns meals for calendar', async () => {
    const meals = await getMeals(user1, calendar1.id);

    expect(meals).toEqual([
      {
        ...meal1,
        defaultMealType: mealType1.name,
      },
      {
        ...meal2,
        defaultMealType: undefined,
      },
      {
        ...meal3,
        defaultMealType: mealType3.name,
      },
    ]);
  });

  test('returns empty array if calendar does not exist', async () => {
    const meals = await getMeals(user1, unusedId);

    expect(meals).toEqual([]);
  });
});
