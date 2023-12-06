import { calendars } from '@/db/schema/calendars';
import { users } from '@/db/schema/users';
import { relations, InferSelectModel } from 'drizzle-orm';
import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core';

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
    pk: primaryKey({ columns: [table.calendarId, table.userId] }),
  }),
);

export const sharedCalendarRelations = relations(
  sharedCalendars,
  ({ one }) => ({
    calendar: one(calendars, {
      fields: [sharedCalendars.calendarId],
      references: [calendars.id],
    }),
    user: one(users, {
      fields: [sharedCalendars.userId],
      references: [users.id],
    }),
  }),
);

export type SharedCalendar = InferSelectModel<typeof sharedCalendars>;
