-- =====================================================
-- QUICK RLS FIX - Run this script to fix permissions
-- =====================================================
-- This is a simplified version that just adds the essential policies

-- Enable RLS on all tables (if not already enabled)
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE degrees ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Allow authenticated insert to experiences" ON experiences;
DROP POLICY IF EXISTS "Allow authenticated update to experiences" ON experiences;
DROP POLICY IF EXISTS "Allow authenticated delete to experiences" ON experiences;

DROP POLICY IF EXISTS "Allow authenticated insert to degrees" ON degrees;
DROP POLICY IF EXISTS "Allow authenticated update to degrees" ON degrees;
DROP POLICY IF EXISTS "Allow authenticated delete to degrees" ON degrees;

DROP POLICY IF EXISTS "Allow authenticated insert to certifications" ON certifications;
DROP POLICY IF EXISTS "Allow authenticated update to certifications" ON certifications;
DROP POLICY IF EXISTS "Allow authenticated delete to certifications" ON certifications;

DROP POLICY IF EXISTS "Allow authenticated insert to projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated update to projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated delete to projects" ON projects;

DROP POLICY IF EXISTS "Allow authenticated insert to home_sections" ON home_sections;
DROP POLICY IF EXISTS "Allow authenticated update to home_sections" ON home_sections;
DROP POLICY IF EXISTS "Allow authenticated delete to home_sections" ON home_sections;

DROP POLICY IF EXISTS "Allow authenticated update to about" ON about;
DROP POLICY IF EXISTS "Allow authenticated update to contact" ON contact;

-- Create permissive policies for authenticated users
CREATE POLICY "Allow authenticated insert to experiences" ON experiences FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update to experiences" ON experiences FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete to experiences" ON experiences FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert to degrees" ON degrees FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update to degrees" ON degrees FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete to degrees" ON degrees FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert to certifications" ON certifications FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update to certifications" ON certifications FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete to certifications" ON certifications FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert to projects" ON projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update to projects" ON projects FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete to projects" ON projects FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert to home_sections" ON home_sections FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update to home_sections" ON home_sections FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete to home_sections" ON home_sections FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated update to about" ON about FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated update to contact" ON contact FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Verify policies were created
SELECT tablename, policyname, cmd FROM pg_policies WHERE schemaname = 'public' AND tablename IN ('experiences', 'degrees', 'certifications', 'projects') ORDER BY tablename;
