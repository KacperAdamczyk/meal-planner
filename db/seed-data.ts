import { db } from '@/db';
import {
  sharedCalendars,
  type Calendar,
  type SharedCalendar,
  type User,
  calendars,
  users,
} from '@/db/schema';

export const user1: User = {
  id: '7d3b0fae-7666-4008-b232-fe0f9107a91f',
  email: 'user1@test.zz',
};

export const user2: User = {
  id: 'de3bb9c3-5798-4659-ad6f-f7f44c7028c8',
  email: 'user1@test.zz',
};

export const calendar1: Calendar = {
  id: 'f00de96c-5670-4f7b-85b6-51a6264d2872',
  name: 'Calendar 1 - user 1',
  userId: user1.id,
};
export const calendar2: Calendar = {
  id: 'eebe6bb1-a29d-40cf-ba3a-cb281c19b665',
  name: 'Calendar 2 - user 1',
  userId: user1.id,
};
export const calendar3: Calendar = {
  id: '1ebe176f-ee6d-4dd9-94b4-fb12852ee1a8',
  name: 'Calendar 3 - user 2',
  userId: user2.id,
};
export const calendar4: Calendar = {
  id: 'b52722cb-4ef1-4844-bf4b-8f7584e12477',
  name: 'Calendar 4 - user 2',
  userId: user2.id,
};

export const sharedCalendar1: SharedCalendar = {
  userId: user1.id,
  calendarId: calendar3.id,
};

export const seed = async () => {
  if (!process.env.DATABASE_URL?.endsWith('/test-db')) {
    throw new Error("DATABASE_URL doesn't seem to be a test database");
  }

  await db.delete(sharedCalendars);
  await db.delete(calendars);
  await db.delete(users);

  await db.insert(users).values([user1, user2]);
  await db
    .insert(calendars)
    .values([calendar1, calendar2, calendar3, calendar4]);
  await db.insert(sharedCalendars).values([sharedCalendar1]);
};
