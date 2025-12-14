-- Add assigned_page column to resources table
ALTER TABLE resources ADD COLUMN IF NOT EXISTS assigned_page VARCHAR(50);

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_resources_assigned_page ON resources(assigned_page);

-- Update existing resources to have a default assigned_page value (optional)
-- UPDATE resources SET assigned_page = '幼儿英语' WHERE assigned_page IS NULL;
