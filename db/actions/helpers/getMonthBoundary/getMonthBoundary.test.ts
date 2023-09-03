import { getMonthBoundary } from '@/db/actions/helpers/getMonthBoundary';
import { describe, expect, test } from 'vitest';

describe('getMonthBoundary', () => {
  test.each`
    month     | year    | from            | to
    ${9 - 1}  | ${2023} | ${'2023-08-27'} | ${'2023-09-30'}
    ${8 - 1}  | ${2023} | ${'2023-07-30'} | ${'2023-09-02'}
    ${10 - 1} | ${2023} | ${'2023-10-01'} | ${'2023-11-04'}
  `(
    'calculates boundary dates for $month + 1/$year',
    ({
      month,
      year,
      from,
      to,
    }: {
      month: number;
      year: number;
      from: string;
      to: string;
    }) => {
      const [start, end] = getMonthBoundary(month, year);

      expect(start).toBe(from);
      expect(end).toBe(to);
    },
  );
});
