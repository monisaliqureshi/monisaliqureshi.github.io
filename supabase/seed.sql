-- Clear existing data
TRUNCATE TABLE greeting, social_media, skills, experiences, education, contact, settings CASCADE;

-- Insert Greeting Data (Single Row)
INSERT INTO greeting (title, title2, nickname, full_name, subtitle, resume_link, mail)
VALUES (
  'Hello 👋.',
  'Monis',
  'Monis',
  'Monis Ali',
  'AI Engineer, Aspiring Data Scientist 🔥. Python Developer.',
  'https://drive.google.com/file/d/1Ln2PRsNbcdeyDQaEAJF8F9NSK_NwLDWC/view?usp=sharing',
  'mailto:monisaliqureshi@gmail.com'
);

-- Insert Social Media Links
INSERT INTO social_media (platform, url) VALUES
  ('github', 'https://github.com/monisaliqureshi'),
  ('linkedin', 'https://www.linkedin.com/in/monisaliqureshi/'),
  ('gmail', 'mailto:monisaliqureshi@gmail.com'),
  ('gitlab', 'https://gitlab.com/monisaliqureshi'),
  ('facebook', 'https://www.facebook.com/monisaliqureshi/'),
  ('twitter', 'https://twitter.com/monisaliqureshi'),
  ('instagram', 'https://www.instagram.com/monisaliqureshi/');

-- Insert Skills
INSERT INTO skills (title, filename, skills_list, software_skills, order_index) VALUES
(
  'Solution Design Engineer',
  'FullStackImg',
  ARRAY[
    '⚡ R&D on problem-specific AI solutions (Face/Plate/Object Recognition)',
    '⚡ Requirement gathering and defining deployment-ready architectures',
    '⚡ Prepare System Requirements & Technical Specifications',
    '⚡ Microservices-based system design using FastAPI & Docker',
    '⚡ Define end-to-end pipelines from prototyping to production deployment'
  ],
  '[
    {"skillName": "AI Solution Design", "fontAwesomeClassname": "fas fa-cogs", "style": {"color": "#00BFFF"}},
    {"skillName": "Workflow Architecture", "fontAwesomeClassname": "fas fa-project-diagram", "style": {"color": "#9b59b6"}},
    {"skillName": "Documentation", "fontAwesomeClassname": "fas fa-book", "style": {"color": "#2ecc71"}},
    {"skillName": "Technical Writing", "fontAwesomeClassname": "fas fa-pencil-alt", "style": {"color": "#e67e22"}}
  ]'::jsonb,
  0
),
(
  'Cloud Infra-Architecture',
  'CloudInfraImg',
  ARRAY[
    '⚡ Deploying AI systems on cloud and edge environments (Jetson Nano, AWS)',
    '⚡ Containerization with Docker for consistent deployments',
    '⚡ Experience with CI/CD for AI and API systems using GitHub Actions'
  ],
  '[
    {"skillName": "Docker", "fontAwesomeClassname": "simple-icons:docker", "style": {"color": "#1488C6"}},
    {"skillName": "AWS", "fontAwesomeClassname": "simple-icons:amazonaws", "style": {"color": "#FF9900"}},
    {"skillName": "FastAPI", "fontAwesomeClassname": "simple-icons:fastapi", "style": {"color": "#05998B"}},
    {"skillName": "PostgreSQL", "fontAwesomeClassname": "simple-icons:postgresql", "style": {"color": "#336791"}},
    {"skillName": "GitHub Actions", "fontAwesomeClassname": "simple-icons:githubactions", "style": {"color": "#5b77ef"}}
  ]'::jsonb,
  1
),
(
  'AI Software Development',
  'CloudInfraImg',
  ARRAY[
    '⚡ Building and deploying real-time AI systems for smart city applications',
    '⚡ Computer vision models: YOLOv8, PaddleOCR, FaceNet',
    '⚡ API-driven architecture using FastAPI for OCR, LPR, and face recognition',
    '⚡ Data scraping, text/image analysis, and automated report generation',
    '⚡ Experience with OpenAI Whisper, EasyOCR, and TensorRT'
  ],
  '[
    {"skillName": "Python", "fontAwesomeClassname": "simple-icons:python", "style": {"color": "#306998"}},
    {"skillName": "YOLOv8", "fontAwesomeClassname": "fas fa-bullseye", "style": {"color": "#e74c3c"}},
    {"skillName": "OpenCV", "fontAwesomeClassname": "simple-icons:opencv", "style": {"color": "#5C3EE8"}},
    {"skillName": "PaddleOCR", "fontAwesomeClassname": "fas fa-eye", "style": {"color": "#27ae60"}},
    {"skillName": "FastAPI", "fontAwesomeClassname": "simple-icons:fastapi", "style": {"color": "#05998B"}},
    {"skillName": "MongoDB", "fontAwesomeClassname": "simple-icons:mongodb", "style": {"color": "#47A248"}},
    {"skillName": "Pandas", "fontAwesomeClassname": "simple-icons:pandas", "style": {"color": "#130754"}},
    {"skillName": "Plotly", "fontAwesomeClassname": "simple-icons:plotly", "style": {"color": "#3f4cbb"}}
  ]'::jsonb,
  2
);

-- Insert Experiences
INSERT INTO experiences (title, company, company_url, logo_path, duration, location, descriptions, color, order_index) VALUES
(
  'Software Development Engineer',
  'DELTA Technology Consulting (Pvt) Ltd.',
  'https://dtcpak.com/',
  'dtcpak.png',
  'Dec 2020 - July 2021',
  'Islamabad, Pakistan',
  ARRAY[
    '- Led backend development for AI-driven applications including facial recognition and LPR systems.',
    '- Developed modular FastAPI-based microservices for real-time computer vision tasks.',
    '- Designed and deployed REST APIs for license plate and facial recognition workflows.',
    '- Created intelligent data pipelines: from scraping and annotation to analytics and reporting.',
    '- Integrated PaddleOCR, YOLOv8, and FastAPI for production-grade OCR solutions.',
    '- Deployed systems on local servers with Docker and Uvicorn + Nginx stack.',
    '- Delivered Proof-of-Concepts (PoC) for smart city surveillance and access control.'
  ],
  '#0071C5',
  0
),
(
  'AI Software Developer',
  'FACEHAWK LIMITED',
  'http://facehawk.co.uk/',
  'facehawk.png',
  'Aug 2021 - Present',
  'Luton, England, United Kingdom (Remote)',
  ARRAY[
    '- Spearheaded R&D for a smart city-ready facial recognition and crowd analytics platform.',
    '- Authored Software Requirement Specification (SRS) and MVP scoping documents.',
    '- Developed secure, scalable FastAPI endpoints integrated with MongoDB and PostgreSQL.',
    '- Implemented state-of-the-art AI models for face matching, verification, and live tracking.',
    '- Built facial authentication APIs with JWT-based authorization and session cookies.',
    '- Designed dual-auth biometric systems combining FaceNet with OCR-based verification.',
    '- Deployed services with Docker, orchestrated behind Nginx reverse proxy for stability.',
    '- Coordinated frontend integration, testing pipelines, and deployment guides.',
    '- Contributed to smart security applications including weapon room access control and payroll attendance systems.'
  ],
  '#ee3c26',
  1
);

-- Insert Education
INSERT INTO education (title, subtitle, logo_path, alt_name, duration, descriptions, website_link, order_index) VALUES
(
  'NUST MISIS University, Moscow, Russia',
  'Masters in Data Science',
  'misis.png',
  'National University of Science and Technology, MISIS, Moscow, Russia',
  '2023 - 2025',
  ARRAY[
    '⚡ Specialized in AI, Computer Vision, and System Architecture with distinction (Red Diploma).',
    '⚡ Thesis: Comparative Study and Implementation of License Plate Detection and Recognition for Smart Cities.',
    '⚡ Built a production-ready LPR API using YOLOv8, PaddleOCR, FastAPI, Docker, and PostgreSQL.',
    '⚡ Led real-time AI deployment projects, integrating OCR, facial recognition, and traffic analytics.'
  ],
  'https://misis.ru',
  0
),
(
  'University of Engineering and Technology Taxila, Pakistan',
  'Bachelor of Science in Computer Engineering',
  'uett.png',
  'UET Taxila',
  '2016 - 2020',
  ARRAY[
    '⚡ Gained strong foundations in Data Structures, Operating Systems, Databases, Networking, and Digital Logic.',
    '⚡ Completed coursework and projects on embedded systems including Microcontrollers, Arduino, and Raspberry Pi.',
    '⚡ Final Year Project: Predicting Perceived Stress Scores using EEG headbands – published at IEEE IBCAST 2021.',
    '⚡ Practiced real-world project development including automation and sensor-based systems.'
  ],
  'http://www.uettaxila.edu.pk/',
  1
),
(
  'Punjab College, Muzaffargarh',
  'Intermediate in Computer Science',
  'pgc.png',
  'PGC',
  '2013 - 2016',
  ARRAY[
    '⚡ Studied foundational science subjects including Physics, Mathematics, and Computer Science.',
    '⚡ Developed early interest in programming, algorithms, and logical problem-solving.'
  ],
  'http://www.pgc.edu/',
  2
);

-- Insert Contact (Single Row)
INSERT INTO contact (title, profile_image_path, description, blog_title, blog_subtitle, blog_link)
VALUES (
  'Contact Me',
  'monis.png',
  'You can contact me at the places mentioned below. I will try to get back to you as fast as I can.',
  'Hire Me',
  'You can reach me out from any contacts above share. Also, we can work on Upwork.',
  'https://www.upwork.com/freelancers/~0154de438999b692ce'
);

-- Insert Settings (Single Row)
INSERT INTO settings (is_splash, use_custom_cursor, google_tracking_id)
VALUES (true, false, 'G-K1RFVM3HBT');
