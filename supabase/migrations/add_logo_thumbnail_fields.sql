-- Migration: Add logo/thumbnail fields and remove color fields
-- Date: 2024

-- Update experiences table: rename logo_url to logo_filename, remove color field
ALTER TABLE experiences RENAME COLUMN logo_url TO logo_filename;
ALTER TABLE experiences DROP COLUMN IF EXISTS color;
ALTER TABLE experiences DROP COLUMN IF EXISTS logo_path;

-- Update projects table: rename thumbnail_url to thumbnail_filename
ALTER TABLE projects RENAME COLUMN thumbnail_url TO thumbnail_filename;

-- Update education table: rename logo_url to logo_filename
ALTER TABLE education RENAME COLUMN logo_url TO logo_filename;
ALTER TABLE education DROP COLUMN IF EXISTS logo_path;

-- Update certifications table: rename logo_url to logo_filename, remove color_code field
ALTER TABLE certifications RENAME COLUMN logo_url TO logo_filename;
ALTER TABLE certifications DROP COLUMN IF EXISTS color_code;
ALTER TABLE certifications DROP COLUMN IF EXISTS logo_path;
