import { getMonthBoundary } from '@/db/actions/helpers/getMonthBoundary';
import { describe, test, expect } from 'bun:test';

describe('getMonthBoundary', () => {
  test.each<[number, number, string, string]>([
    [9 - 1, 2023, '2023-08-27', '2023-09-30'],
    [8 - 1, 2023, '2023-07-30', '2023-09-02'],
    [10 - 1, 2023, '2023-10-01', '2023-11-04'],
  ])('calculates boundary dates for %i + 1/%i', (month, year, from, to) => {
    const [start, end] = getMonthBoundary(month, year);

    expect(start).toBe(from);
    expect(end).toBe(to);
  });
});
