-- ================================================
-- COMPLETE DATABASE SETUP SCRIPT
-- ================================================
-- Run this ENTIRE file in Supabase SQL Editor
-- This will:
-- 1. Drop and recreate all tables
-- 2. Seed all initial data
-- 3. Set up Row Level Security
-- ================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================
-- STEP 1: DROP EXISTING TABLES
-- ================================================
DROP TABLE IF EXISTS greeting CASCADE;
DROP TABLE IF EXISTS social_media CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS experiences CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS education CASCADE;
DROP TABLE IF EXISTS certifications CASCADE;
DROP TABLE IF EXISTS contact CASCADE;
DROP TABLE IF EXISTS settings CASCADE;

-- ================================================
-- STEP 2: CREATE ALL TABLES
-- ================================================

-- This section is a placeholder
-- Copy the ENTIRE content of schema.sql here
-- OR run schema.sql separately first

-- ================================================
-- STEP 3: SEED ALL DATA
-- ================================================

-- This section is a placeholder  
-- Copy the ENTIRE content of seed.sql here
-- OR run seed.sql separately second

-- ================================================
-- STEP 4: SEED PROJECTS & CERTIFICATIONS
-- ================================================

-- This section is a placeholder
-- Copy the ENTIRE content of seed-projects-certs.sql here
-- OR run seed-projects-certs.sql separately third

-- ================================================
-- VERIFICATION QUERY
-- ================================================
-- Run this after all migrations to verify

SELECT 'Database Setup Complete!' as status;

SELECT 
  'greeting' as table_name, 
  COUNT(*) as row_count,
  CASE WHEN COUNT(*) = 1 THEN '✅ Correct' ELSE '❌ Should be 1' END as status
FROM greeting
UNION ALL
SELECT 'social_media', COUNT(*), CASE WHEN COUNT(*) > 0 THEN '✅ Has data' ELSE '❌ Empty' END FROM social_media
UNION ALL
SELECT 'skills', COUNT(*), CASE WHEN COUNT(*) > 0 THEN '✅ Has data' ELSE '❌ Empty' END FROM skills
UNION ALL
SELECT 'experiences', COUNT(*), CASE WHEN COUNT(*) > 0 THEN '✅ Has data' ELSE '❌ Empty' END FROM experiences
UNION ALL
SELECT 'projects', COUNT(*), CASE WHEN COUNT(*) > 0 THEN '✅ Has data' ELSE '❌ Empty' END FROM projects
UNION ALL
SELECT 'education', COUNT(*), CASE WHEN COUNT(*) > 0 THEN '✅ Has data' ELSE '❌ Empty' END FROM education
UNION ALL
SELECT 'certifications', COUNT(*), CASE WHEN COUNT(*) > 0 THEN '✅ Has data' ELSE '❌ Empty' END FROM certifications
UNION ALL
SELECT 'contact', COUNT(*), CASE WHEN COUNT(*) = 1 THEN '✅ Correct' ELSE '❌ Should be 1' END FROM contact
UNION ALL
SELECT 'settings', COUNT(*), CASE WHEN COUNT(*) = 1 THEN '✅ Correct' ELSE '❌ Should be 1' END FROM settings;
