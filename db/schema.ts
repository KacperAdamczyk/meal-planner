import { pgSchema, uuid, varchar, pgTable, text } from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';

const authSchema = pgSchema('auth');

export const users = authSchema.table('users', {
  id: uuid('id').primaryKey(),
  email: varchar('email'),
});

export type User = InferModel<typeof users>;

export const calendars = pgTable('calendars', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
});

export type Calendar = InferModel<typeof calendars>;
export type NewCalendar = InferModel<typeof calendars, 'insert'>;

export const sharedCalendars = pgTable('shared_calendars', {
  id: uuid('id').primaryKey().defaultRandom(),
  calendarId: uuid('calendar_id')
    .references(() => calendars.id)
    .notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
});

export type SharedCalendar = InferModel<typeof sharedCalendars>;

export const mealTypes = pgTable('meal_types', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  calendarId: uuid('calendar_id')
    .references(() => calendars.id)
    .notNull(),
});
