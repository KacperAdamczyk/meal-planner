import { getCalendarShares } from '@/db/queries/getCalendarShares';
import { calendar3, user1 } from '@/db/seed-data';
import { describe, expect, test } from 'bun:test';

describe('getCalendarShares', () => {
  test('returns the calendar shares', async () => {
    const calendarShares = await getCalendarShares(calendar3.id);

    expect(calendarShares).toEqual([{ userId: user1.id }]);
  });
});
