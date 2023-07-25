import { pgSchema, uuid, varchar, pgTable, text } from 'drizzle-orm/pg-core';

const authSchema = pgSchema('auth');

export const users = authSchema.table('users', {
  id: uuid('id').primaryKey(),
  email: varchar('email'),
});

export const pilots = pgTable('planes', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  createdBy: uuid('created_by')
    .references(() => users.id)
    .notNull(),
});

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
});
