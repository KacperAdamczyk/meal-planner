import { calendars } from '@/db/schema/calendars';
import { InferSelectModel } from 'drizzle-orm';
import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

export const mealTypes = pgTable('meal_types', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  calendarId: uuid('calendar_id')
    .references(() => calendars.id)
    .notNull(),
});

export type MealType = InferSelectModel<typeof mealTypes>;
