import { calendars } from '@/db/schema/calendars';
import { mealTypes } from '@/db/schema/mealTypes';
import { meals } from '@/db/schema/meals';
import { InferSelectModel, relations } from 'drizzle-orm';
import { pgTable, date, uuid, primaryKey } from 'drizzle-orm/pg-core';

export const dayMeals = pgTable(
  'day_meals',
  {
    date: date('date').notNull(),
    calendarId: uuid('calendar_id')
      .references(() => calendars.id)
      .notNull(),
    mealId: uuid('meal_id')
      .references(() => meals.id)
      .notNull(),
    mealTypeId: uuid('meal_type_id')
      .references(() => mealTypes.id)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.date, table.calendarId, table.mealId, table.mealTypeId],
    }),
  }),
);

export const dayMealsRelations = relations(dayMeals, ({ one }) => ({
  calendar: one(calendars, {
    fields: [dayMeals.calendarId],
    references: [calendars.id],
  }),
  meal: one(meals, {
    fields: [dayMeals.mealId],
    references: [meals.id],
  }),
  mealType: one(mealTypes, {
    fields: [dayMeals.mealTypeId],
    references: [mealTypes.id],
  }),
}));

export type DayMeal = InferSelectModel<typeof dayMeals>;
