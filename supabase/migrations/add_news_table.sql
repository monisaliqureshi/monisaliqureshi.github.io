-- Migration: Add News Table
-- Description: Creates news table for blog/news functionality
-- Created: 2025-11-06

-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT,
  date_from TEXT NOT NULL,
  date_to TEXT,
  location TEXT,
  thumbnail_filename TEXT,
  photos JSONB DEFAULT '[]',
  description TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_news_order ON news(order_index);

-- Enable Row Level Security (RLS)
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Public read access
DROP POLICY IF EXISTS "Public read access" ON news;
CREATE POLICY "Public read access" ON news FOR SELECT USING (true);

-- Admin write access (authenticated users only)
DROP POLICY IF EXISTS "Admin write access" ON news;
CREATE POLICY "Admin write access" ON news FOR ALL USING (auth.role() = 'authenticated');

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_news_updated_at ON news;
CREATE TRIGGER update_news_updated_at 
  BEFORE UPDATE ON news
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional - remove if not needed)
INSERT INTO news (title, subtitle, date_from, location, description, order_index)
VALUES 
  (
    'Welcome to My Portfolio',
    'Introducing the new portfolio website',
    'Nov 2025',
    'Online',
    '<p>I''m excited to announce the launch of my new portfolio website! This platform showcases my work, skills, and achievements in a modern, interactive format.</p><p>The site features a futuristic design with smooth animations and an intuitive user experience. Stay tuned for regular updates on my latest projects and achievements.</p>',
    0
  )
ON CONFLICT DO NOTHING;
