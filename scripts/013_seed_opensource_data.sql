-- Insert sample open source data
INSERT INTO open_source (
  github_username,
  total_stars,
  total_commits,
  total_prs,
  total_issues,
  total_contributions,
  current_streak,
  longest_streak,
  grade,
  profile_image_url,
  contribution_graph_url
) VALUES (
  'muhammadnoman',
  58,
  2249,
  77,
  7,
  2249,
  0,
  90,
  'B',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iiqY5ZnyGNMtmziWQcnpWmM5xc5GPc.png',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xO0vGhUnkfatLNdFvJo0h3Wy3iJXTy.png'
) ON CONFLICT DO NOTHING;

-- Insert sample languages
INSERT INTO languages (open_source_id, name, percentage, color, display_order) VALUES
(1, 'Jupyter Notebook', 87.29, '#DA5B0B', 1),
(1, 'JavaScript', 5.46, '#F7DF1E', 2),
(1, 'HTML', 3.58, '#E34F26', 3),
(1, 'SCSS', 2.29, '#CC6699', 4),
(1, 'CSS', 1.17, '#1572B6', 5),
(1, 'PHP', 0.21, '#777BB4', 6)
ON CONFLICT DO NOTHING;

-- Insert sample contributed organizations
INSERT INTO contributed_organizations (open_source_id, name, logo_url, url, display_order) VALUES
(1, 'Python', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', 'https://github.com/python', 1),
(1, 'Meta', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg', 'https://github.com/facebook', 2),
(1, 'React', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 'https://github.com/facebook/react', 3),
(1, 'Keras', 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Keras_logo.svg', 'https://github.com/keras-team', 4),
(1, 'TensorFlow', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', 'https://github.com/tensorflow', 5),
(1, 'Google', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg', 'https://github.com/google', 6)
ON CONFLICT DO NOTHING;
