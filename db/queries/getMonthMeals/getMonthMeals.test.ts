import { getMonthMeals } from '@/db/queries/getMonthMeals';
import { calendar1, dayMeal1, dayMeal2, meal1, user1 } from '@/db/seed-data';
import { describe, expect, test } from 'bun:test';

describe('getMonthMeals', () => {
  test('returns empty array if no day meals in the month', async () => {
    const dayMeals = await getMonthMeals(user1, calendar1.id, 1999, 1);

    expect(dayMeals).toEqual([]);
  });

  test('returns day meals for exact month', async () => {
    const dayMeals = await getMonthMeals(user1, calendar1.id, 2020, 0);

    expect(dayMeals).toEqual([
      {
        ...dayMeal1,
        name: meal1.name,
      },
      {
        ...dayMeal2,
        name: meal1.name,
      },
    ]);
  });
});
