-- =====================================================
-- FIX ALL RLS POLICIES
-- Add missing INSERT, UPDATE, DELETE policies for authenticated users
-- =====================================================

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Allow authenticated insert to experiences" ON experiences;
DROP POLICY IF EXISTS "Allow authenticated update to experiences" ON experiences;
DROP POLICY IF EXISTS "Allow authenticated delete to experiences" ON experiences;

DROP POLICY IF EXISTS "Allow authenticated insert to experience_items" ON experience_items;
DROP POLICY IF EXISTS "Allow authenticated update to experience_items" ON experience_items;
DROP POLICY IF EXISTS "Allow authenticated delete to experience_items" ON experience_items;

DROP POLICY IF EXISTS "Allow authenticated insert to degrees" ON degrees;
DROP POLICY IF EXISTS "Allow authenticated update to degrees" ON degrees;
DROP POLICY IF EXISTS "Allow authenticated delete to degrees" ON degrees;

DROP POLICY IF EXISTS "Allow authenticated insert to degree_items" ON degree_items;
DROP POLICY IF EXISTS "Allow authenticated update to degree_items" ON degree_items;
DROP POLICY IF EXISTS "Allow authenticated delete to degree_items" ON degree_items;

DROP POLICY IF EXISTS "Allow authenticated insert to certifications" ON certifications;
DROP POLICY IF EXISTS "Allow authenticated update to certifications" ON certifications;
DROP POLICY IF EXISTS "Allow authenticated delete to certifications" ON certifications;

DROP POLICY IF EXISTS "Allow authenticated insert to projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated update to projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated delete to projects" ON projects;

DROP POLICY IF EXISTS "Allow authenticated insert to project_technologies" ON project_technologies;
DROP POLICY IF EXISTS "Allow authenticated update to project_technologies" ON project_technologies;
DROP POLICY IF EXISTS "Allow authenticated delete to project_technologies" ON project_technologies;

DROP POLICY IF EXISTS "Allow authenticated insert to home_sections" ON home_sections;
DROP POLICY IF EXISTS "Allow authenticated update to home_sections" ON home_sections;
DROP POLICY IF EXISTS "Allow authenticated delete to home_sections" ON home_sections;

DROP POLICY IF EXISTS "Allow authenticated insert to skills" ON skills;
DROP POLICY IF EXISTS "Allow authenticated update to skills" ON skills;
DROP POLICY IF EXISTS "Allow authenticated delete to skills" ON skills;

DROP POLICY IF EXISTS "Allow authenticated insert to section_items" ON section_items;
DROP POLICY IF EXISTS "Allow authenticated update to section_items" ON section_items;
DROP POLICY IF EXISTS "Allow authenticated delete to section_items" ON section_items;

DROP POLICY IF EXISTS "Allow authenticated insert to about" ON about;
DROP POLICY IF EXISTS "Allow authenticated update to about" ON about;

DROP POLICY IF EXISTS "Allow authenticated insert to contact" ON contact;
DROP POLICY IF EXISTS "Allow authenticated update to contact" ON contact;
DROP POLICY IF EXISTS "Allow authenticated delete to contact" ON contact;

DROP POLICY IF EXISTS "Allow authenticated insert to social_links" ON social_links;
DROP POLICY IF EXISTS "Allow authenticated update to social_links" ON social_links;
DROP POLICY IF EXISTS "Allow authenticated delete to social_links" ON social_links;

DROP POLICY IF EXISTS "Allow authenticated insert to open_source" ON open_source;
DROP POLICY IF EXISTS "Allow authenticated update to open_source" ON open_source;
DROP POLICY IF EXISTS "Allow authenticated delete to open_source" ON open_source;

DROP POLICY IF EXISTS "Allow authenticated insert to languages" ON languages;
DROP POLICY IF EXISTS "Allow authenticated update to languages" ON languages;
DROP POLICY IF EXISTS "Allow authenticated delete to languages" ON languages;

DROP POLICY IF EXISTS "Allow authenticated insert to contributed_organizations" ON contributed_organizations;
DROP POLICY IF EXISTS "Allow authenticated update to contributed_organizations" ON contributed_organizations;
DROP POLICY IF EXISTS "Allow authenticated delete to contributed_organizations" ON contributed_organizations;

DROP POLICY IF EXISTS "Allow authenticated insert to github_achievements" ON github_achievements;
DROP POLICY IF EXISTS "Allow authenticated update to github_achievements" ON github_achievements;
DROP POLICY IF EXISTS "Allow authenticated delete to github_achievements" ON github_achievements;

DROP POLICY IF EXISTS "Allow authenticated insert to professional_certifications" ON professional_certifications;
DROP POLICY IF EXISTS "Allow authenticated update to professional_certifications" ON professional_certifications;
DROP POLICY IF EXISTS "Allow authenticated delete to professional_certifications" ON professional_certifications;

-- =====================================================
-- CREATE NEW POLICIES FOR AUTHENTICATED USERS
-- =====================================================

-- Experiences
CREATE POLICY "Allow authenticated insert to experiences" ON experiences FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update to experiences" ON experiences FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete to experiences" ON experiences FOR DELETE TO authenticated USING (true);

-- Experience Items
CREATE POLICY "Allow authenticated insert to experience_items" ON experience_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update to experience_items" ON experience_items FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete to experience_items" ON experience_items FOR DELETE TO authenticated USING (true);

-- Degrees
CREATE POLICY "Allow authenticated insert to degrees" ON degrees FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update to degrees" ON degrees FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete to degrees" ON degrees FOR DELETE TO authenticated USING (true);

-- Degree Items
CREATE POLICY "Allow authenticated insert to degree_items" ON degree_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update to degree_items" ON degree_items FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete to degree_items" ON degree_items FOR DELETE TO authenticated USING (true);

-- Certifications
CREATE POLICY "Allow authenticated insert to certifications" ON certifications FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update to certifications" ON certifications FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete to certifications" ON certifications FOR DELETE TO authenticated USING (true);

-- Projects
CREATE POLICY "Allow authenticated insert to projects" ON projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update to projects" ON projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete to projects" ON projects FOR DELETE TO authenticated USING (true);

-- Project Technologies
CREATE POLICY "Allow authenticated insert to project_technologies" ON project_technologies FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update to project_technologies" ON project_technologies FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete to project_technologies" ON project_technologies FOR DELETE TO authenticated USING (true);

-- Home Sections
CREATE POLICY "Allow authenticated insert to home_sections" ON home_sections FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update to home_sections" ON home_sections FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete to home_sections" ON home_sections FOR DELETE TO authenticated USING (true);

-- Skills
CREATE POLICY "Allow authenticated insert to skills" ON skills FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update to skills" ON skills FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete to skills" ON skills FOR DELETE TO authenticated USING (true);

-- Section Items
CREATE POLICY "Allow authenticated insert to section_items" ON section_items FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update to section_items" ON section_items FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete to section_items" ON section_items FOR DELETE TO authenticated USING (true);

-- About
CREATE POLICY "Allow authenticated insert to about" ON about FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update to about" ON about FOR UPDATE TO authenticated USING (true);

-- Contact
CREATE POLICY "Allow authenticated insert to contact" ON contact FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update to contact" ON contact FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete to contact" ON contact FOR DELETE TO authenticated USING (true);

-- Social Links
CREATE POLICY "Allow authenticated insert to social_links" ON social_links FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update to social_links" ON social_links FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete to social_links" ON social_links FOR DELETE TO authenticated USING (true);

-- Open Source
CREATE POLICY "Allow authenticated insert to open_source" ON open_source FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update to open_source" ON open_source FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete to open_source" ON open_source FOR DELETE TO authenticated USING (true);

-- Languages
CREATE POLICY "Allow authenticated insert to languages" ON languages FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update to languages" ON languages FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete to languages" ON languages FOR DELETE TO authenticated USING (true);

-- Contributed Organizations
CREATE POLICY "Allow authenticated insert to contributed_organizations" ON contributed_organizations FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update to contributed_organizations" ON contributed_organizations FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete to contributed_organizations" ON contributed_organizations FOR DELETE TO authenticated USING (true);

-- GitHub Achievements
CREATE POLICY "Allow authenticated insert to github_achievements" ON github_achievements FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update to github_achievements" ON github_achievements FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete to github_achievements" ON github_achievements FOR DELETE TO authenticated USING (true);

-- Professional Certifications
CREATE POLICY "Allow authenticated insert to professional_certifications" ON professional_certifications FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update to professional_certifications" ON professional_certifications FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete to professional_certifications" ON professional_certifications FOR DELETE TO authenticated USING (true);

-- =====================================================
-- VERIFICATION
-- =====================================================
-- Run this to verify policies are created:
-- SELECT tablename, policyname FROM pg_policies WHERE schemaname = 'public' ORDER BY tablename, policyname;
