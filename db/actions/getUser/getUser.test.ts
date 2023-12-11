import { getUser } from '@/db/actions/getUser';
import { user1 } from '@/db/seed-data';
import { describe, expect, test } from 'bun:test';

describe('getUser', () => {
  test('should return the user', async () => {
    const user = await getUser(user1.id);

    expect(user).toEqual(user1);
  });
});
