-- Master script to run all database setup scripts in order
-- This script will create all tables, seed data, and set up RLS policies

-- 1. Create initial schema (site_settings, about, home_sections, skills, section_items)
\i 001_create_schema.sql

-- 2. Seed initial data
\i 002_seed_data.sql

-- 3. Create education schema (degrees, degree_items, certifications)
\i 003_create_education_schema.sql

-- 4. Seed education data
\i 004_seed_education_data.sql

-- 5. Create experience schema (experiences, experience_items)
\i 005_create_experience_schema.sql

-- 6. Seed experience data
\i 006_seed_experience_data.sql

-- 7. Create projects schema (projects, project_technologies)
\i 007_create_projects_schema.sql

-- 8. Seed projects data
\i 008_seed_projects_data.sql

-- 9. Create contact schema (contact, social_links)
\i 009_create_contact_schema.sql

-- 10. Seed contact data
\i 010_seed_contact_data.sql

-- 11. Fix projects RLS policies
\i 011_fix_projects_rls.sql

-- 12. Create open source schema (open_source, languages, contributed_organizations)
\i 012_create_opensource_schema.sql

-- 13. Seed open source data
\i 013_seed_opensource_data.sql

-- 14. Update open source schema (github_achievements, professional_certifications)
\i 014_update_opensource_schema.sql

-- 15. Seed achievements and certifications
\i 015_seed_achievements_certifications.sql

-- Add new RLS fix script to enable INSERT, UPDATE, DELETE for authenticated users
-- 16. Fix all RLS policies for authenticated users
\i 016_fix_all_rls_policies.sql
</merged_code
