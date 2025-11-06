-- Migration: Update to use filename-based image storage
-- Date: November 2025
-- This migration updates all image fields to store filenames instead of URLs

-- Update experiences table
DO $$
BEGIN
  -- Rename logo_url to logo_filename if it exists
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name='experiences' AND column_name='logo_url') THEN
    ALTER TABLE experiences RENAME COLUMN logo_url TO logo_filename;
  END IF;
  
  -- Drop legacy columns if they exist
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name='experiences' AND column_name='logo_path') THEN
    ALTER TABLE experiences DROP COLUMN logo_path;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name='experiences' AND column_name='color') THEN
    ALTER TABLE experiences DROP COLUMN color;
  END IF;
  
  -- Add logo_filename if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='experiences' AND column_name='logo_filename') THEN
    ALTER TABLE experiences ADD COLUMN logo_filename TEXT;
  END IF;
END $$;

-- Update projects table
DO $$
BEGIN
  -- Rename thumbnail_url to thumbnail_filename if it exists
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name='projects' AND column_name='thumbnail_url') THEN
    ALTER TABLE projects RENAME COLUMN thumbnail_url TO thumbnail_filename;
  END IF;
  
  -- Add thumbnail_filename if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='projects' AND column_name='thumbnail_filename') THEN
    ALTER TABLE projects ADD COLUMN thumbnail_filename TEXT;
  END IF;
END $$;

-- Update education table
DO $$
BEGIN
  -- Rename logo_url to logo_filename if it exists
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name='education' AND column_name='logo_url') THEN
    ALTER TABLE education RENAME COLUMN logo_url TO logo_filename;
  END IF;
  
  -- Drop legacy logo_path if it exists
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name='education' AND column_name='logo_path') THEN
    ALTER TABLE education DROP COLUMN logo_path;
  END IF;
  
  -- Add logo_filename if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='education' AND column_name='logo_filename') THEN
    ALTER TABLE education ADD COLUMN logo_filename TEXT;
  END IF;
END $$;

-- Update certifications table
DO $$
BEGIN
  -- Rename logo_url to logo_filename if it exists
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name='certifications' AND column_name='logo_url') THEN
    ALTER TABLE certifications RENAME COLUMN logo_url TO logo_filename;
  END IF;
  
  -- Drop legacy columns if they exist
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name='certifications' AND column_name='logo_path') THEN
    ALTER TABLE certifications DROP COLUMN logo_path;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name='certifications' AND column_name='color_code') THEN
    ALTER TABLE certifications DROP COLUMN color_code;
  END IF;
  
  -- Add logo_filename if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='certifications' AND column_name='logo_filename') THEN
    ALTER TABLE certifications ADD COLUMN logo_filename TEXT;
  END IF;
END $$;
