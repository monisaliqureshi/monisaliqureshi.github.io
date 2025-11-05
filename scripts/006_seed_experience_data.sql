-- Insert sample work experiences
INSERT INTO experiences (title, company_name, company_logo_url, location, start_date, end_date, is_current, description, experience_type, order_index)
VALUES
  ('Senior Full Stack Developer', 'Tech Innovations Inc', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg', 'San Francisco, CA', '2022-01-01', NULL, true, 'Leading development of scalable web applications', 'work', 1),
  ('Machine Learning Engineer', 'AI Solutions Ltd', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', 'New York, NY', '2020-06-01', '2021-12-31', false, 'Developed ML models for production systems', 'work', 2);

-- Insert sample internship experiences
INSERT INTO experiences (title, company_name, company_logo_url, location, start_date, end_date, is_current, description, experience_type, order_index)
VALUES
  ('Software Engineering Intern', 'Startup Hub', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', 'Remote', '2019-06-01', '2019-08-31', false, 'Built features for mobile application', 'internship', 1);

-- Insert sample volunteer experiences
INSERT INTO experiences (title, company_name, company_logo_url, location, start_date, end_date, is_current, description, experience_type, order_index)
VALUES
  ('Open Source Contributor', 'React Community', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 'Remote', '2021-01-01', NULL, true, 'Contributing to React ecosystem projects', 'volunteer', 1);

-- Insert experience items (bullet points)
INSERT INTO experience_items (experience_id, content, order_index)
SELECT id, 'Led a team of 5 developers in building microservices architecture', 1
FROM experiences WHERE title = 'Senior Full Stack Developer';

INSERT INTO experience_items (experience_id, content, order_index)
SELECT id, 'Implemented CI/CD pipelines reducing deployment time by 60%', 2
FROM experiences WHERE title = 'Senior Full Stack Developer';

INSERT INTO experience_items (experience_id, content, order_index)
SELECT id, 'Developed deep learning models achieving 95% accuracy', 1
FROM experiences WHERE title = 'Machine Learning Engineer';

INSERT INTO experience_items (experience_id, content, order_index)
SELECT id, 'Deployed models to production serving 1M+ users', 2
FROM experiences WHERE title = 'Machine Learning Engineer';
