import { pgSchema, uuid, varchar, pgTable, text } from 'drizzle-orm/pg-core';

const authSchema = pgSchema('auth');

export const users = authSchema.table('users', {
  id: uuid('id').primaryKey(),
  email: varchar('email'),
});

export const calendars = pgTable('calendars', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
});

export const sharedCalendars = pgTable('shared_calendars', {
  id: uuid('id').primaryKey().defaultRandom(),
  calendarId: uuid('calendar_id')
    .references(() => calendars.id)
    .notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
});
