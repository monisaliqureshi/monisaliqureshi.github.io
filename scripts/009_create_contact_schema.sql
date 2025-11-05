-- Create contact table
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

-- Create social_links table
CREATE TABLE IF NOT EXISTS social_links (
  id SERIAL PRIMARY KEY,
  contact_id INTEGER REFERENCES contact(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- Create policies for contact
CREATE POLICY "Allow public read access to contact"
  ON contact FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage contact"
  ON contact FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for social_links
CREATE POLICY "Allow public read access to social_links"
  ON social_links FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage social_links"
  ON social_links FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
