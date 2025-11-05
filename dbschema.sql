-- =====================================================
-- PORTFOLIO DATABASE SCHEMA
-- Complete database schema for Muhammad Noman's Portfolio
-- =====================================================
-- This file contains all table definitions, indexes, RLS policies
-- Run this file in your Supabase SQL editor to set up the complete database
-- =====================================================

-- =====================================================
-- SITE SETTINGS & ABOUT
-- =====================================================

-- Site settings table for global configuration
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_title TEXT NOT NULL,
  site_description TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- About table for personal information
CREATE TABLE IF NOT EXISTS about (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  bio TEXT,
  profile_image_url TEXT,
  resume_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  youtube_url TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  google_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- HOME PAGE SECTIONS
-- =====================================================

-- Home sections table for "What I Do?" sections
CREATE TABLE IF NOT EXISTS home_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills table for individual skills within each section
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES home_sections(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  skill_icon_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Section items table for bullet points in each section
CREATE TABLE IF NOT EXISTS section_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES home_sections(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- EDUCATION
-- =====================================================

-- Degrees table for educational qualifications
CREATE TABLE IF NOT EXISTS degrees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_name TEXT NOT NULL,
  institution_logo_url TEXT,
  degree_name TEXT NOT NULL,
  field_of_study TEXT,
  start_year INTEGER NOT NULL,
  end_year INTEGER,
  description TEXT,
  website_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Degree items table for bullet points in each degree
CREATE TABLE IF NOT EXISTS degree_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  degree_id UUID REFERENCES degrees(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issuer_logo_url TEXT,
  issue_date DATE,
  expiry_date DATE,
  credential_id TEXT,
  credential_url TEXT,
  description TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- EXPERIENCE
-- =====================================================

-- Experiences table for work, internships, and volunteerships
CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  company_logo_url TEXT,
  location TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT FALSE,
  description TEXT,
  experience_type TEXT NOT NULL CHECK (experience_type IN ('work', 'internship', 'volunteer')),
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Experience items table for bullet points in each experience
CREATE TABLE IF NOT EXISTS experience_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id UUID REFERENCES experiences(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- PROJECTS
-- =====================================================

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  demo_url TEXT,
  code_url TEXT,
  created_date DATE NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project technologies table for many-to-many relationship
CREATE TABLE IF NOT EXISTS project_technologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  technology_name TEXT NOT NULL,
  technology_icon_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- CONTACT
-- =====================================================

-- Contact table
CREATE TABLE IF NOT EXISTS contact (
  id SERIAL PRIMARY KEY,
  profile_image_url TEXT,
  heading TEXT NOT NULL,
  description TEXT NOT NULL,
  resume_url TEXT,
  blog_url TEXT,
  blog_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social links table
CREATE TABLE IF NOT EXISTS social_links (
  id SERIAL PRIMARY KEY,
  contact_id INTEGER REFERENCES contact(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- OPEN SOURCE
-- =====================================================

-- Open source table
CREATE TABLE IF NOT EXISTS open_source (
  id SERIAL PRIMARY KEY,
  github_username TEXT NOT NULL,
  total_stars INTEGER DEFAULT 0,
  total_commits INTEGER DEFAULT 0,
  total_prs INTEGER DEFAULT 0,
  total_issues INTEGER DEFAULT 0,
  total_contributions INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  grade TEXT DEFAULT 'A',
  profile_image_url TEXT,
  contribution_graph_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Languages table
CREATE TABLE IF NOT EXISTS languages (
  id SERIAL PRIMARY KEY,
  open_source_id INTEGER REFERENCES open_source(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  percentage DECIMAL(5,2) NOT NULL,
  color TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contributed organizations table
CREATE TABLE IF NOT EXISTS contributed_organizations (
  id SERIAL PRIMARY KEY,
  open_source_id INTEGER REFERENCES open_source(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- GitHub achievements table
CREATE TABLE IF NOT EXISTS github_achievements (
  id SERIAL PRIMARY KEY,
  badge_name TEXT NOT NULL,
  badge_description TEXT,
  badge_image_url TEXT NOT NULL,
  verification_link TEXT,
  unlocked_date DATE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Professional certifications table
CREATE TABLE IF NOT EXISTS professional_certifications (
  id SERIAL PRIMARY KEY,
  cert_name TEXT NOT NULL,
  cert_description TEXT,
  cert_image_url TEXT NOT NULL,
  verification_link TEXT,
  issued_date DATE,
  issuer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_home_sections_order ON home_sections(order_index);
CREATE INDEX IF NOT EXISTS idx_skills_section ON skills(section_id);
CREATE INDEX IF NOT EXISTS idx_section_items_section ON section_items(section_id);
CREATE INDEX IF NOT EXISTS idx_degrees_order ON degrees(order_index);
CREATE INDEX IF NOT EXISTS idx_degree_items_degree ON degree_items(degree_id);
CREATE INDEX IF NOT EXISTS idx_certifications_order ON certifications(order_index);
CREATE INDEX IF NOT EXISTS idx_experiences_order ON experiences(order_index);
CREATE INDEX IF NOT EXISTS idx_experience_items_experience ON experience_items(experience_id);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_project_technologies_project ON project_technologies(project_id);
CREATE INDEX IF NOT EXISTS idx_social_links_contact ON social_links(contact_id);
CREATE INDEX IF NOT EXISTS idx_languages_opensource ON languages(open_source_id);
CREATE INDEX IF NOT EXISTS idx_organizations_opensource ON contributed_organizations(open_source_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE degrees ENABLE ROW LEVEL SECURITY;
ALTER TABLE degree_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE open_source ENABLE ROW LEVEL SECURITY;
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributed_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE github_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE professional_certifications ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- PUBLIC READ POLICIES (Portfolio is public)
-- =====================================================

CREATE POLICY "Allow public read access to site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read access to about" ON about FOR SELECT USING (true);
CREATE POLICY "Allow public read access to home_sections" ON home_sections FOR SELECT USING (true);
CREATE POLICY "Allow public read access to skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access to section_items" ON section_items FOR SELECT USING (true);
CREATE POLICY "Allow public read access to degrees" ON degrees FOR SELECT USING (true);
CREATE POLICY "Allow public read access to degree_items" ON degree_items FOR SELECT USING (true);
CREATE POLICY "Allow public read access to certifications" ON certifications FOR SELECT USING (true);
CREATE POLICY "Allow public read access to experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Allow public read access to experience_items" ON experience_items FOR SELECT USING (true);
CREATE POLICY "Allow public read access to projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access to project_technologies" ON project_technologies FOR SELECT USING (true);
CREATE POLICY "Allow public read access to contact" ON contact FOR SELECT USING (true);
CREATE POLICY "Allow public read access to social_links" ON social_links FOR SELECT USING (true);
CREATE POLICY "Allow public read access to open_source" ON open_source FOR SELECT USING (true);
CREATE POLICY "Allow public read access to languages" ON languages FOR SELECT USING (true);
CREATE POLICY "Allow public read access to contributed_organizations" ON contributed_organizations FOR SELECT USING (true);
CREATE POLICY "Allow public read access to github_achievements" ON github_achievements FOR SELECT USING (true);
CREATE POLICY "Allow public read access to professional_certifications" ON professional_certifications FOR SELECT USING (true);

-- =====================================================
-- AUTHENTICATED WRITE POLICIES (Dashboard access)
-- =====================================================

-- Site Settings
CREATE POLICY "Allow authenticated insert to site_settings" ON site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to site_settings" ON site_settings FOR UPDATE USING (auth.role() = 'authenticated');

-- About
CREATE POLICY "Allow authenticated insert to about" ON about FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to about" ON about FOR UPDATE USING (auth.role() = 'authenticated');

-- Home Sections
CREATE POLICY "Allow authenticated insert to home_sections" ON home_sections FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to home_sections" ON home_sections FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete to home_sections" ON home_sections FOR DELETE USING (auth.role() = 'authenticated');

-- Skills
CREATE POLICY "Allow authenticated insert to skills" ON skills FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to skills" ON skills FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete to skills" ON skills FOR DELETE USING (auth.role() = 'authenticated');

-- Section Items
CREATE POLICY "Allow authenticated insert to section_items" ON section_items FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to section_items" ON section_items FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete to section_items" ON section_items FOR DELETE USING (auth.role() = 'authenticated');

-- Degrees
CREATE POLICY "Allow authenticated insert to degrees" ON degrees FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to degrees" ON degrees FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete to degrees" ON degrees FOR DELETE USING (auth.role() = 'authenticated');

-- Degree Items
CREATE POLICY "Allow authenticated insert to degree_items" ON degree_items FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to degree_items" ON degree_items FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete to degree_items" ON degree_items FOR DELETE USING (auth.role() = 'authenticated');

-- Certifications
CREATE POLICY "Allow authenticated insert to certifications" ON certifications FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to certifications" ON certifications FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete to certifications" ON certifications FOR DELETE USING (auth.role() = 'authenticated');

-- Experiences
CREATE POLICY "Allow authenticated insert to experiences" ON experiences FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to experiences" ON experiences FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete to experiences" ON experiences FOR DELETE USING (auth.role() = 'authenticated');

-- Experience Items
CREATE POLICY "Allow authenticated insert to experience_items" ON experience_items FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to experience_items" ON experience_items FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete to experience_items" ON experience_items FOR DELETE USING (auth.role() = 'authenticated');

-- Projects
CREATE POLICY "Allow authenticated insert to projects" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to projects" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete to projects" ON projects FOR DELETE USING (auth.role() = 'authenticated');

-- Project Technologies
CREATE POLICY "Allow authenticated insert to project_technologies" ON project_technologies FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to project_technologies" ON project_technologies FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete to project_technologies" ON project_technologies FOR DELETE USING (auth.role() = 'authenticated');

-- Contact
CREATE POLICY "Allow authenticated insert to contact" ON contact FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to contact" ON contact FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete to contact" ON contact FOR DELETE USING (auth.role() = 'authenticated');

-- Social Links
CREATE POLICY "Allow authenticated insert to social_links" ON social_links FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to social_links" ON social_links FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete to social_links" ON social_links FOR DELETE USING (auth.role() = 'authenticated');

-- Open Source
CREATE POLICY "Allow authenticated insert to open_source" ON open_source FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to open_source" ON open_source FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete to open_source" ON open_source FOR DELETE USING (auth.role() = 'authenticated');

-- Languages
CREATE POLICY "Allow authenticated insert to languages" ON languages FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to languages" ON languages FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete to languages" ON languages FOR DELETE USING (auth.role() = 'authenticated');

-- Contributed Organizations
CREATE POLICY "Allow authenticated insert to contributed_organizations" ON contributed_organizations FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to contributed_organizations" ON contributed_organizations FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete to contributed_organizations" ON contributed_organizations FOR DELETE USING (auth.role() = 'authenticated');

-- GitHub Achievements
CREATE POLICY "Allow authenticated insert to github_achievements" ON github_achievements FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to github_achievements" ON github_achievements FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete to github_achievements" ON github_achievements FOR DELETE USING (auth.role() = 'authenticated');

-- Professional Certifications
CREATE POLICY "Allow authenticated insert to professional_certifications" ON professional_certifications FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to professional_certifications" ON professional_certifications FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete to professional_certifications" ON professional_certifications FOR DELETE USING (auth.role() = 'authenticated');

-- =====================================================
-- END OF SCHEMA
-- =====================================================
