import { calendars } from '@/db/schema/calendars';
import { mealTypes } from '@/db/schema/mealTypes';
import { InferSelectModel } from 'drizzle-orm';
import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

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
