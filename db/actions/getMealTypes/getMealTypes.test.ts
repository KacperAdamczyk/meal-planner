import { getMealTypes } from '@/db/actions/getMealTypes';
import {
  calendar1,
  mealType1,
  mealType2,
  unusedId,
  user1,
} from '@/db/seed-data';
import { describe, expect, test } from 'bun:test';

describe('getMealTypes', () => {
  test('returns meal types for calendar', async () => {
    const mealTypes = await getMealTypes(user1, calendar1.id);

    expect(mealTypes).toEqual([mealType1, mealType2]);
  });

  test('returns empty array if calendar does not exist', async () => {
    const mealTypes = await getMealTypes(user1, unusedId);

    expect(mealTypes).toEqual([]);
  });
});
