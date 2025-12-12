-- Migration script for Resources table field updates
-- Execute this in Supabase SQL Editor

-- Step 1: Add new columns
ALTER TABLE resources 
ADD COLUMN IF NOT EXISTS highlights TEXT,
ADD COLUMN IF NOT EXISTS "resourceInfo" TEXT,
ADD COLUMN IF NOT EXISTS region TEXT;

-- Step 2: Migrate existing data (if any)
-- Copy description to highlights
UPDATE resources 
SET highlights = description 
WHERE highlights IS NULL AND description IS NOT NULL;

-- Copy duration to region  
UPDATE resources
SET region = duration
WHERE region IS NULL AND duration IS NOT NULL;

-- Step 3: Drop old columns
ALTER TABLE resources
DROP COLUMN IF EXISTS description,
DROP COLUMN IF EXISTS duration,
DROP COLUMN IF EXISTS "vipPrice";

-- Step 4: Update category column to allow custom text (already TEXT type, no change needed)

-- Step 5: Verify the changes
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'resources'
ORDER BY ordinal_position;
