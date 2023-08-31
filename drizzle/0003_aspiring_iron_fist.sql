CREATE TABLE IF NOT EXISTS "day_meals" (
	"day_id" uuid NOT NULL,
	"meal_id" uuid NOT NULL,
	"meal_type_id" uuid,
	CONSTRAINT day_meals_day_id_meal_id_meal_type_id PRIMARY KEY("day_id","meal_id","meal_type_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "days" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" date NOT NULL,
	"calendar_id" uuid
);
--> statement-breakpoint
ALTER TABLE "shared_calendars" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "day_meals" ADD CONSTRAINT "day_meals_day_id_days_id_fk" FOREIGN KEY ("day_id") REFERENCES "days"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "day_meals" ADD CONSTRAINT "day_meals_meal_id_meals_id_fk" FOREIGN KEY ("meal_id") REFERENCES "meals"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "day_meals" ADD CONSTRAINT "day_meals_meal_type_id_meal_types_id_fk" FOREIGN KEY ("meal_type_id") REFERENCES "meal_types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "shared_calendars" ADD CONSTRAINT "shared_calendars_calendar_id_user_id" PRIMARY KEY("calendar_id","user_id");