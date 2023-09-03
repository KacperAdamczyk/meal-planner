DO $$ BEGIN
 ALTER TABLE "day_meals" ADD CONSTRAINT "day_meals_calendar_id_calendars_id_fk" FOREIGN KEY ("calendar_id") REFERENCES "calendars"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
