-- Add missing columns to resources table for the new field structure

-- Add isWeeklyHot column (renamed from isEnglishAudio)
ALTER TABLE resources ADD COLUMN IF NOT EXISTS "isWeeklyHot" BOOLEAN DEFAULT false;

-- Add isNew column (renamed from isHot)
ALTER TABLE resources ADD COLUMN IF NOT EXISTS "isNew" BOOLEAN DEFAULT false;

-- Add coverImage column
ALTER TABLE resources ADD COLUMN IF NOT EXISTS "coverImage" TEXT;

-- Add resourceUrl column
ALTER TABLE resources ADD COLUMN IF NOT EXISTS "resourceUrl" TEXT;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_resources_is_weekly_hot ON resources("isWeeklyHot");
CREATE INDEX IF NOT EXISTS idx_resources_is_new ON resources("isNew");

-- Optional: Update existing data if you have old fields
-- UPDATE resources SET "isWeeklyHot" = "isEnglishAudio" WHERE "isEnglishAudio" IS NOT NULL;
-- UPDATE resources SET "isNew" = "isHot" WHERE "isHot" IS NOT NULL;
