ALTER TABLE "day_meals" DROP CONSTRAINT "day_meals_day_id_meal_id_meal_type_id";--> statement-breakpoint
ALTER TABLE "day_meals" DROP CONSTRAINT "day_meals_day_id_days_id_fk";
--> statement-breakpoint
ALTER TABLE "day_meals" ADD COLUMN "date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "day_meals" ADD COLUMN "calendar_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "day_meals" DROP COLUMN IF EXISTS "day_id";--> statement-breakpoint
ALTER TABLE "day_meals" ADD CONSTRAINT "day_meals_date_calendar_id_meal_id_meal_type_id" PRIMARY KEY("date","calendar_id","meal_id","meal_type_id");

DROP TABLE "days";--> statement-breakpoint