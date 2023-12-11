import { getUserCalendars } from '@/db/actions/getUserCalendars';
import { calendar1, calendar2, calendar3, user1 } from '@/db/seed-data';
import { describe, expect, test } from 'bun:test';

describe('getUserCalendars', () => {
  test('should return calendars for user', async () => {
    const calendars = await getUserCalendars(user1);

    expect(calendars).toEqual({
      calendars: [
        {
          id: calendar1.id,
          name: calendar1.name,
        },
        {
          id: calendar2.id,
          name: calendar2.name,
        },
      ],
      sharedCalendars: [
        {
          id: calendar3.id,
          name: calendar3.name,
        },
      ],
    });
  });
});
