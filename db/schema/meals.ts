import { dayMeals } from '@/db/schema';
import { calendars } from '@/db/schema/calendars';
import { mealTypes } from '@/db/schema/mealTypes';
import { InferSelectModel, relations } from 'drizzle-orm';
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

export const mealsRelations = relations(meals, ({ one, many }) => ({
  calendar: one(calendars, {
    fields: [meals.calendarId],
    references: [calendars.id],
  }),
  defaultMealType: one(mealTypes, {
    fields: [meals.defaultMealTypeId],
    references: [mealTypes.id],
  }),
  dayMeals: many(dayMeals),
}));

export type Meal = InferSelectModel<typeof meals>;
