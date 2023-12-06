import { uuid, pgTable, text } from 'drizzle-orm/pg-core';
import { InferSelectModel, relations } from 'drizzle-orm';
import { sharedCalendars } from './sharedCalendars';
import { users } from '@/db/schema/users';
import { dayMeals } from '@/db/schema';

export const calendars = pgTable('calendars', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
});

export const calendarRelations = relations(calendars, ({ one, many }) => ({
  user: one(users, {
    fields: [calendars.userId],
    references: [users.id],
  }),
  sharedCalendars: many(sharedCalendars),
  dayMeals: many(dayMeals),
}));

export type Calendar = InferSelectModel<typeof calendars>;
