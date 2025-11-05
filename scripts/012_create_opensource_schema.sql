-- Create open_source table
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

-- Create languages table
CREATE TABLE IF NOT EXISTS languages (
  id SERIAL PRIMARY KEY,
  open_source_id INTEGER REFERENCES open_source(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  percentage DECIMAL(5,2) NOT NULL,
  color TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contributed_organizations table
CREATE TABLE IF NOT EXISTS contributed_organizations (
  id SERIAL PRIMARY KEY,
  open_source_id INTEGER REFERENCES open_source(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE open_source ENABLE ROW LEVEL SECURITY;
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributed_organizations ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to open_source" ON open_source FOR SELECT USING (true);
CREATE POLICY "Allow public read access to languages" ON languages FOR SELECT USING (true);
CREATE POLICY "Allow public read access to contributed_organizations" ON contributed_organizations FOR SELECT USING (true);

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated users to insert open_source" ON open_source FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update open_source" ON open_source FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete open_source" ON open_source FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to insert languages" ON languages FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update languages" ON languages FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete languages" ON languages FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to insert contributed_organizations" ON contributed_organizations FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update contributed_organizations" ON contributed_organizations FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete contributed_organizations" ON contributed_organizations FOR DELETE TO authenticated USING (true);
