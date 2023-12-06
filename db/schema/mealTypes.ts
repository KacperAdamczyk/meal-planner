import { dayMeals, meals } from '@/db/schema';
import { calendars } from '@/db/schema/calendars';
import { InferSelectModel, relations } from 'drizzle-orm';
import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

export const mealTypes = pgTable('meal_types', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  calendarId: uuid('calendar_id')
    .references(() => calendars.id)
    .notNull(),
});

export const mealTypesRelations = relations(mealTypes, ({ one, many }) => ({
  calendar: one(calendars, {
    fields: [mealTypes.calendarId],
    references: [calendars.id],
  }),
  dayMeals: many(dayMeals),
  meals: many(meals),
}));

export type MealType = InferSelectModel<typeof mealTypes>;
