-- Create degrees table for educational qualifications
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

-- Create degree_items table for bullet points in each degree
CREATE TABLE IF NOT EXISTS degree_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  degree_id UUID REFERENCES degrees(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create certifications table
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

-- Enable RLS on education tables
ALTER TABLE degrees ENABLE ROW LEVEL SECURITY;
ALTER TABLE degree_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to degrees" ON degrees FOR SELECT USING (true);
CREATE POLICY "Allow public read access to degree_items" ON degree_items FOR SELECT USING (true);
CREATE POLICY "Allow public read access to certifications" ON certifications FOR SELECT USING (true);

-- Create policies for authenticated write access (dashboard)
CREATE POLICY "Allow authenticated insert to degrees" ON degrees FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to degrees" ON degrees FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete to degrees" ON degrees FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert to degree_items" ON degree_items FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to degree_items" ON degree_items FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete to degree_items" ON degree_items FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert to certifications" ON certifications FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to certifications" ON certifications FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete to certifications" ON certifications FOR DELETE USING (auth.role() = 'authenticated');

-- Add authenticated write policies for existing tables (for dashboard)
CREATE POLICY "Allow authenticated insert to site_settings" ON site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to site_settings" ON site_settings FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert to about" ON about FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to about" ON about FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert to home_sections" ON home_sections FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to home_sections" ON home_sections FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete to home_sections" ON home_sections FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert to skills" ON skills FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to skills" ON skills FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete to skills" ON skills FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert to section_items" ON section_items FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update to section_items" ON section_items FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete to section_items" ON section_items FOR DELETE USING (auth.role() = 'authenticated');
