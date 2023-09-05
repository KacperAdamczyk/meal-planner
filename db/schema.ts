import {
  pgSchema,
  uuid,
  varchar,
  pgTable,
  text,
  date,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';

const authSchema = pgSchema('auth');

export const users = authSchema.table('users', {
  id: uuid('id').primaryKey(),
  email: varchar('email'),
});

export type User = InferSelectModel<typeof users>;

export const calendars = pgTable('calendars', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
});

export type Calendar = InferSelectModel<typeof calendars>;

export const sharedCalendars = pgTable(
  'shared_calendars',
  {
    calendarId: uuid('calendar_id')
      .references(() => calendars.id)
      .notNull(),
    userId: uuid('user_id')
      .references(() => users.id)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey(table.calendarId, table.userId),
  }),
);

export type SharedCalendar = InferSelectModel<typeof sharedCalendars>;

export const mealTypes = pgTable('meal_types', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  calendarId: uuid('calendar_id')
    .references(() => calendars.id)
    .notNull(),
});

export type MealType = InferSelectModel<typeof mealTypes>;

export const meals = pgTable('meals', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  calendarId: uuid('calendar_id')
    .references(() => calendars.id)
    .notNull(),
  defaultMealTypeId: uuid('default_meal_type_id').references(
    () => mealTypes.id,
  ),
});

export type Meal = InferSelectModel<typeof meals>;

export const dayMeals = pgTable(
  'day_meals',
  {
    date: date('date', { mode: 'date' }).notNull(),
    calendarId: uuid('calendar_id')
      .references(() => calendars.id)
      .notNull(),
    mealId: uuid('meal_id')
      .references(() => meals.id)
      .notNull(),
    mealTypeId: uuid('meal_type_id')
      .references(() => mealTypes.id)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey(
      table.date,
      table.calendarId,
      table.mealId,
      table.mealTypeId,
    ),
  }),
);

export type DayMeal = InferSelectModel<typeof dayMeals>;
