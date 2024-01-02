import { getDayMeals } from '@/db/queries/getDayMeals';
import { calendar1, dayMeal1, meal1, user1 } from '@/db/seed-data';
import { describe, expect, test } from 'bun:test';

describe('getDayMeals', () => {
  test('returns empty array if no day meals in the date', async () => {
    const dayMeals = await getDayMeals(user1, calendar1.id, 1999, 1, 1);

    expect(dayMeals).toEqual([]);
  });

  test('returns day meals for exact date', async () => {
    const dayMeals = await getDayMeals(user1, calendar1.id, 2020, 0, 15);

    expect(dayMeals).toEqual([
      {
        ...dayMeal1,
        name: meal1.name,
      },
    ]);
  });
});
