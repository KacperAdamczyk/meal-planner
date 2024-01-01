import { db } from '@/db';
import {
  sharedCalendars,
  type Calendar,
  type SharedCalendar,
  type User,
  calendars,
  users,
  MealType,
  mealTypes,
  Meal,
  meals,
  DayMeal,
  dayMeals,
} from '@/db/schema';

export const unusedId = '4feddbe8-0af1-40a4-85aa-fc3aef1954d5';

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

export const mealType1: MealType = {
  id: '02e1d8a3-a8ce-4664-bfe3-315e3212578b',
  name: 'Meal type 1',
  calendarId: calendar1.id,
};
export const mealType2: MealType = {
  id: '40415da8-e4ba-4049-9cf8-9276b938295c',
  name: 'Meal type 2',
  calendarId: calendar1.id,
};
export const mealType3: MealType = {
  id: 'ea961afb-6ec9-4f52-bbd3-09c3d4e00285',
  name: 'Meal type 3',
  calendarId: calendar2.id,
};

export const meal1: Meal = {
  id: '5f4afb53-59cc-4685-9d20-2be73485c003',
  name: 'Meal 1',
  calendarId: calendar1.id,
  defaultMealTypeId: mealType1.id,
};
export const meal2: Meal = {
  id: '3c3fd36d-e025-44e0-851e-b9acf0b27a25',
  name: 'Meal 2',
  calendarId: calendar1.id,
  defaultMealTypeId: null,
};
export const meal3: Meal = {
  id: 'd8ebb89a-4234-40b7-a470-9f433346887e',
  name: 'Meal 3',
  calendarId: calendar1.id,
  defaultMealTypeId: mealType3.id,
};

export const dayMeal1: DayMeal = {
  calendarId: calendar1.id,
  mealId: meal1.id,
  mealTypeId: mealType1.id,
  date: '2020-01-15',
};

export const dayMeal2: DayMeal = {
  calendarId: calendar1.id,
  mealId: meal1.id,
  mealTypeId: mealType1.id,
  date: '2020-01-20',
};

const operations = [
  [users, [user1, user2]],
  [calendars, [calendar1, calendar2, calendar3, calendar4]],
  [sharedCalendars, [sharedCalendar1]],
  [mealTypes, [mealType1, mealType2, mealType3]],
  [meals, [meal1, meal2, meal3]],
  [dayMeals, [dayMeal1, dayMeal2]],
] as const;

export const seed = async () => {
  if (!process.env.DATABASE_URL?.endsWith('/test-db')) {
    throw new Error("DATABASE_URL doesn't seem to be a test database");
  }

  for (const [table] of operations.toReversed()) {
    await db.delete(table);
  }

  for (const [table, data] of operations) {
    await db.insert(table).values(data);
  }
};
