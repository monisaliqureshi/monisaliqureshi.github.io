-- Seed education data
INSERT INTO degrees (institution_name, institution_logo_url, degree_name, field_of_study, start_year, end_year, description, website_url, order_index)
VALUES 
(
  'University of Technology',
  '/images/university-logo.png',
  'Bachelor of Technology',
  'Computer Science and Engineering',
  2018,
  2022,
  'Completed undergraduate studies in Computer Science with focus on software engineering, algorithms, and data structures.',
  'https://university.edu',
  1
),
(
  'Institute of Advanced Studies',
  '/images/institute-logo.png',
  'Master of Science',
  'Artificial Intelligence',
  2022,
  2024,
  'Specialized in machine learning, deep learning, and AI applications.',
  'https://institute.edu',
  2
);

-- Seed degree items (bullet points)
INSERT INTO degree_items (degree_id, content, order_index)
SELECT 
  d.id,
  'I have studied basic software engineering subjects like DS, Algorithms, DBMS, OS, CA, AI etc.',
  1
FROM degrees d WHERE d.degree_name = 'Bachelor of Technology';

INSERT INTO degree_items (degree_id, content, order_index)
SELECT 
  d.id,
  'Apart from this, I have done courses on Deep Learning, Data Science, Cloud Computing and Full Stack Development.',
  2
FROM degrees d WHERE d.degree_name = 'Bachelor of Technology';

INSERT INTO degree_items (degree_id, content, order_index)
SELECT 
  d.id,
  'I was selected for Merit cum Means Scholarship which is given to top 10% of students in college.',
  3
FROM degrees d WHERE d.degree_name = 'Bachelor of Technology';

INSERT INTO degree_items (degree_id, content, order_index)
SELECT 
  d.id,
  'I have taken variety of courses related to Artificial Intelligence which correspond to Explainable AI, Graph Machine Learning, Computer Vision etc.',
  1
FROM degrees d WHERE d.degree_name = 'Master of Science';

INSERT INTO degree_items (degree_id, content, order_index)
SELECT 
  d.id,
  'Apart from this, I have also done research assistantship. As part of it, I have worked on creating new algorithms in Graph ML and Network Science.',
  2
FROM degrees d WHERE d.degree_name = 'Master of Science';

-- Seed certifications
INSERT INTO certifications (title, issuer, issuer_logo_url, issue_date, credential_url, description, order_index)
VALUES 
(
  'Deep Learning Specialization',
  'Coursera',
  '/images/coursera-icon.png',
  '2021-06-15',
  'https://coursera.org/verify/specialization/ABC123',
  'Completed comprehensive deep learning specialization covering neural networks, CNNs, RNNs, and more.',
  1
),
(
  'AWS Certified Solutions Architect',
  'Amazon Web Services',
  '/images/aws-icon.png',
  '2022-03-20',
  'https://aws.amazon.com/verification',
  'Professional certification for designing distributed systems on AWS.',
  2
),
(
  'Full Stack Web Development',
  'Udemy',
  '/images/udemy-icon.png',
  '2020-11-10',
  'https://udemy.com/certificate/XYZ789',
  'Comprehensive course covering HTML, CSS, JavaScript, React, Node.js, and MongoDB.',
  3
);
