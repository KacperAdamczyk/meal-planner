import { getSharableUsers } from '@/db/actions/getSharableUsers';
import { user1, user2 } from '@/db/seed-data';
import { describe, expect, test } from 'bun:test';

describe('getSharableUsers', () => {
  test('returns all users if includeSelf is true', async () => {
    const users = await getSharableUsers(user1, true);

    expect(users).toEqual([user1, user2]);
  });

  test('returns all users except the given user', async () => {
    const users = await getSharableUsers(user1);

    expect(users).toEqual([user2]);
  });
});
