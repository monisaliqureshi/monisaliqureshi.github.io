-- Quick Database Verification
-- Run this in Supabase SQL Editor after running all migrations

-- 1. Check greeting (should return 1 row)
SELECT 'greeting' as table_name, COUNT(*) as row_count FROM greeting
UNION ALL
-- 2. Check social_media
SELECT 'social_media', COUNT(*) FROM social_media
UNION ALL
-- 3. Check skills
SELECT 'skills', COUNT(*) FROM skills
UNION ALL
-- 4. Check experiences
SELECT 'experiences', COUNT(*) FROM experiences
UNION ALL
-- 5. Check projects
SELECT 'projects', COUNT(*) FROM projects
UNION ALL
-- 6. Check education
SELECT 'education', COUNT(*) FROM education
UNION ALL
-- 7. Check certifications
SELECT 'certifications', COUNT(*) FROM certifications
UNION ALL
-- 8. Check contact (should return 1 row)
SELECT 'contact', COUNT(*) FROM contact
UNION ALL
-- 9. Check settings (should return 1 row)
SELECT 'settings', COUNT(*) FROM settings;

-- Expected Results:
-- greeting: 1
-- social_media: 7
-- skills: 4
-- experiences: (your work history count)
-- projects: (your projects count)
-- education: 2
-- certifications: (your certs count)
-- contact: 1
-- settings: 1
