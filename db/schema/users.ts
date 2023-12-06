import { calendars } from '@/db/schema/calendars';
import { sharedCalendars } from './sharedCalendars';

import { relations, InferSelectModel } from 'drizzle-orm';
import { pgSchema, uuid, varchar } from 'drizzle-orm/pg-core';

export const authSchema = pgSchema('auth');

export const users = authSchema.table('users', {
  id: uuid('id').primaryKey(),
  email: varchar('email'),
});

export const usersRelations = relations(users, ({ many }) => ({
  calendars: many(calendars),
  sharedCalendars: many(sharedCalendars),
}));

export type User = InferSelectModel<typeof users>;
