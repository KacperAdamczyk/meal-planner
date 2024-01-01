import { getDayMealsInBetween } from '@/db/queries/getDayMealsInBetween';
import {
  calendar1,
  dayMeal1,
  dayMeal2,
  meal1,
  unusedId,
  user1,
} from '@/db/seed-data';
import { expect, describe, test } from 'bun:test';

describe('getDayMealsInBetween', () => {
  test('returns empty array if calendar does not exist', async () => {
    const dayMeals = await getDayMealsInBetween(
      user1,
      unusedId,
      '2020-01-01',
      '2020-01-31',
    );

    expect(dayMeals).toEqual([]);
  });

  test('returns empty array if no day meals in between', async () => {
    const dayMeals = await getDayMealsInBetween(
      user1,
      calendar1.id,
      '1999-01-01',
      '1999-01-31',
    );

    expect(dayMeals).toEqual([]);
  });

  test('returns day meals in between dates', async () => {
    const dayMeals = await getDayMealsInBetween(
      user1,
      calendar1.id,
      '2020-01-01',
      '2020-01-31',
    );

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

  test('return day meals for exact date', async () => {
    const dayMeals = await getDayMealsInBetween(
      user1,
      calendar1.id,
      '2020-01-15',
      '2020-01-15',
    );

    expect(dayMeals).toEqual([
      {
        ...dayMeal1,
        name: meal1.name,
      },
    ]);
  });
});
