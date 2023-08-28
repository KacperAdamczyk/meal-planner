CREATE TABLE IF NOT EXISTS "meals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"calendar_id" uuid NOT NULL,
	"default_meal_type_id" uuid
);
--> statement-breakpoint
ALTER TABLE "auth"."users" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "meals" ADD CONSTRAINT "meals_calendar_id_calendars_id_fk" FOREIGN KEY ("calendar_id") REFERENCES "calendars"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "meals" ADD CONSTRAINT "meals_default_meal_type_id_meal_types_id_fk" FOREIGN KEY ("default_meal_type_id") REFERENCES "meal_types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
