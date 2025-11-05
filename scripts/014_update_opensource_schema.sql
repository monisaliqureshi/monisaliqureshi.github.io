-- Add GitHub achievements table
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

-- Add professional certifications table
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

-- Enable RLS
ALTER TABLE github_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE professional_certifications ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to github_achievements" ON github_achievements FOR SELECT USING (true);
CREATE POLICY "Allow public read access to professional_certifications" ON professional_certifications FOR SELECT USING (true);

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated users to insert github_achievements" ON github_achievements FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update github_achievements" ON github_achievements FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete github_achievements" ON github_achievements FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to insert professional_certifications" ON professional_certifications FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update professional_certifications" ON professional_certifications FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete professional_certifications" ON professional_certifications FOR DELETE TO authenticated USING (true);
