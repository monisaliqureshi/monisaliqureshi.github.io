-- Insert default contact data
INSERT INTO contact (
  profile_image_url,
  heading,
  description,
  resume_url,
  blog_url,
  blog_description
) VALUES (
  '/images/profile.jpg',
  'Contact Me',
  'I am available on almost every social media. You can message me, I will reply within 24 hours. I can help you with ML, AI, React, Android, Cloud and Opensource Development.',
  'https://example.com/resume.pdf',
  'https://blog.example.com',
  'I like to document some of my experiences in professional career journey as well as some technical knowledge sharing.'
) ON CONFLICT DO NOTHING;

-- Insert social links
INSERT INTO social_links (contact_id, platform, url, icon_name, display_order) VALUES
  (1, 'GitHub', 'https://github.com/yourusername', 'github', 1),
  (1, 'LinkedIn', 'https://linkedin.com/in/yourusername', 'linkedin', 2),
  (1, 'YouTube', 'https://youtube.com/@yourusername', 'youtube', 3),
  (1, 'Google', 'mailto:your.email@gmail.com', 'mail', 4),
  (1, 'Twitter', 'https://twitter.com/yourusername', 'twitter', 5),
  (1, 'Facebook', 'https://facebook.com/yourusername', 'facebook', 6),
  (1, 'Instagram', 'https://instagram.com/yourusername', 'instagram', 7)
ON CONFLICT DO NOTHING;
