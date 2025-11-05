-- Insert site settings
INSERT INTO site_settings (site_title, site_description)
VALUES ('Muhammad Noman Portfolio', 'Full Stack Developer & Cloud Architect')
ON CONFLICT DO NOTHING;

-- Insert about information
INSERT INTO about (
  name,
  tagline,
  bio,
  github_url,
  linkedin_url,
  twitter_url,
  youtube_url,
  instagram_url,
  facebook_url,
  google_url
)
VALUES (
  'Muhammad Noman',
  'A passionate individual who always thrives to work on end to end products which develop sustainable and scalable social and technical systems to create impact.',
  'Full Stack Developer with expertise in Cloud Architecture, Data Science, and UI/UX Design',
  'https://github.com',
  'https://linkedin.com',
  'https://twitter.com',
  'https://youtube.com',
  'https://instagram.com',
  'https://facebook.com',
  'https://google.com'
)
ON CONFLICT DO NOTHING;

-- Insert home sections
INSERT INTO home_sections (title, description, order_index)
VALUES 
  ('Data Science & AI', 'Building intelligent systems with machine learning and deep learning', 1),
  ('Full Stack Development', 'Creating modern web applications with cutting-edge technologies', 2),
  ('Cloud Infra-Architecture', 'Designing scalable cloud solutions on multiple platforms', 3),
  ('UI/UX Design', 'Crafting beautiful and intuitive user experiences', 4)
ON CONFLICT DO NOTHING;

-- Get section IDs for inserting related data
DO $$
DECLARE
  data_science_id UUID;
  full_stack_id UUID;
  cloud_id UUID;
  ui_ux_id UUID;
BEGIN
  SELECT id INTO data_science_id FROM home_sections WHERE title = 'Data Science & AI';
  SELECT id INTO full_stack_id FROM home_sections WHERE title = 'Full Stack Development';
  SELECT id INTO cloud_id FROM home_sections WHERE title = 'Cloud Infra-Architecture';
  SELECT id INTO ui_ux_id FROM home_sections WHERE title = 'UI/UX Design';

  -- Added skill_icon_url for technology icons
  -- Insert skills for Data Science & AI with icon URLs
  INSERT INTO skills (section_id, skill_name, skill_icon_url, order_index)
  VALUES 
    (data_science_id, 'TensorFlow', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', 1),
    (data_science_id, 'Keras', 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Keras_logo.svg', 2),
    (data_science_id, 'PyTorch', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', 3),
    (data_science_id, 'Python', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', 4),
    (data_science_id, 'Scikit-learn', 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg', 5)
  ON CONFLICT DO NOTHING;

  -- Insert section items for Data Science & AI
  INSERT INTO section_items (section_id, content, order_index)
  VALUES 
    (data_science_id, 'Developing highly scalable production ready models for various deeplearning and statistical use cases', 1),
    (data_science_id, 'Experience of working with Computer Vision and NLP projects', 2),
    (data_science_id, 'Complex quantitative modelling for dynamic forecasting and time series analysis', 3)
  ON CONFLICT DO NOTHING;

  -- Insert skills for Full Stack Development with icon URLs
  INSERT INTO skills (section_id, skill_name, skill_icon_url, order_index)
  VALUES 
    (full_stack_id, 'HTML5', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', 1),
    (full_stack_id, 'CSS3', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', 2),
    (full_stack_id, 'Sass', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg', 3),
    (full_stack_id, 'JavaScript', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', 4),
    (full_stack_id, 'React', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 5),
    (full_stack_id, 'Node.js', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', 6),
    (full_stack_id, 'npm', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg', 7),
    (full_stack_id, 'Flutter', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', 8)
  ON CONFLICT DO NOTHING;

  -- Insert section items for Full Stack Development
  INSERT INTO section_items (section_id, content, order_index)
  VALUES 
    (full_stack_id, 'Building responsive website front end using React-Redux', 1),
    (full_stack_id, 'Developing mobile applications using Flutter, React Native and solo android apps using Kotlin', 2),
    (full_stack_id, 'Creating application backend in Node, Express & Flask', 3)
  ON CONFLICT DO NOTHING;

  -- Insert skills for Cloud Infra-Architecture with icon URLs
  INSERT INTO skills (section_id, skill_name, skill_icon_url, order_index)
  VALUES 
    (cloud_id, 'Google Cloud', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg', 1),
    (cloud_id, 'AWS', 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg', 2),
    (cloud_id, 'Azure', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', 3),
    (cloud_id, 'Firebase', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', 4),
    (cloud_id, 'PostgreSQL', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', 5),
    (cloud_id, 'MongoDB', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', 6),
    (cloud_id, 'Docker', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', 7),
    (cloud_id, 'Kubernetes', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', 8)
  ON CONFLICT DO NOTHING;

  -- Insert section items for Cloud Infra-Architecture
  INSERT INTO section_items (section_id, content, order_index)
  VALUES 
    (cloud_id, 'Experience working on multiple cloud platforms', 1),
    (cloud_id, 'Hosting and maintaining websites on virtual machine instances along with integration of databases', 2),
    (cloud_id, 'Deploying deep learning models on cloud to use on mobile devices', 3),
    (cloud_id, 'Setting up streaming jobs from DB to Server or vice-versa on GCP and AWS', 4)
  ON CONFLICT DO NOTHING;

  -- Insert skills for UI/UX Design with icon URLs
  INSERT INTO skills (section_id, skill_name, skill_icon_url, order_index)
  VALUES 
    (ui_ux_id, 'Adobe XD', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg', 1),
    (ui_ux_id, 'Figma', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', 2),
    (ui_ux_id, 'Adobe Illustrator', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg', 3),
    (ui_ux_id, 'Inkscape', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/inkscape/inkscape-original.svg', 4),
    (ui_ux_id, 'Sketch', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg', 5)
  ON CONFLICT DO NOTHING;

  -- Insert section items for UI/UX Design
  INSERT INTO section_items (section_id, content, order_index)
  VALUES 
    (ui_ux_id, 'Designing highly attractive user interface for mobile and web applications', 1),
    (ui_ux_id, 'Customizing logo designs and building logos from scratch', 2),
    (ui_ux_id, 'Creating the flow of application functionalities to optimize user experience', 3)
  ON CONFLICT DO NOTHING;
END $$;
