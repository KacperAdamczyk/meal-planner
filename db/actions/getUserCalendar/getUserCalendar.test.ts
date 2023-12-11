import { getUserCalendar } from '@/db/actions/getUserCalendar';
import { calendar1, calendar3, user1, user2 } from '@/db/seed-data';
import { describe, expect, test } from 'bun:test';

describe('getUserCalendar', () => {
  test('should return user calendar', async () => {
    const calendar = await getUserCalendar(user1, calendar1.id);

    expect(calendar).toEqual(calendar1);
  });

  test('should return calendar if is shared with the user', async () => {
    const calendar = await getUserCalendar(user1, calendar3.id);

    expect(calendar).toEqual(calendar3);
  });

  test('should return undefined if calendar does not belong to the user', async () => {
    const calendar = await getUserCalendar(user2, calendar1.id);

    expect(calendar).toBeUndefined();
  });
});
