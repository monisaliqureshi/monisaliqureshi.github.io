-- Insert sample projects (matching your portfolio.js data)
INSERT INTO projects (name, url, descriptions, languages, order_index) VALUES
(
  'Licence Plate Recognition API and Live Stream',
  'https://license-plate.streamlit.app/',
  ARRAY[
    '- Real-time LPR system using YOLOv8 for detection and PaddleOCR for recognition.',
    '- Modular FastAPI backend with endpoints for detection, OCR, and logging.',
    '- Streamlit-based demo frontend for quick testing and validation.',
    '- Deployed on AWS EC2 with Docker, integrated with PostgreSQL for storage.'
  ],
  '[
    {"name": "Python", "iconifyClass": "logos-python"},
    {"name": "OpenCV", "iconifyClass": "logos-opencv"},
    {"name": "Tensorflow", "iconifyClass": "logos-tensorflow"},
    {"name": "HTML", "iconifyClass": "logos-html-5"},
    {"name": "JS", "iconifyClass": "logos-javascript"}
  ]'::jsonb,
  0
),
(
  'Face Liveness Detection - Anti-Spoofing',
  '#',
  ARRAY[
    '- Developed anti-spoofing system using CNN to detect print and replay attacks.',
    '- Useful in secure KYC, access control, and online identity verification.',
    '- Designed to integrate with face recognition and ID verification pipelines.'
  ],
  '[
    {"name": "Python", "iconifyClass": "logos-python"},
    {"name": "OpenCV", "iconifyClass": "logos-opencv"},
    {"name": "Tensorflow", "iconifyClass": "logos-tensorflow"}
  ]'::jsonb,
  1
),
(
  'Event Photo Album Sorting | Face Recognition AI',
  'https://www.loom.com/share/165ad86545a74479894b09b2672191b8',
  ARRAY[
    '- AI-powered tool for indexing event photos using FaceNet.',
    '- Automatically detects and clusters photos by individual identity.',
    '- Generates separate albums per person and organizes them.',
    '- Supports large image batches with face embedding caching.'
  ],
  '[
    {"name": "Python", "iconifyClass": "logos-python"},
    {"name": "OpenCV", "iconifyClass": "logos-opencv"},
    {"name": "Tensorflow", "iconifyClass": "logos-tensorflow"}
  ]'::jsonb,
  2
),
(
  'Face Recognition API',
  'https://frsapi-b721264c7dcd.herokuapp.com/docs',
  ARRAY[
    '- CRUD operations for face data: Enroll, Update, Remove, Verify (1:1), and Match (1:N).',
    '- Designed for secure biometric authentication systems.',
    '- REST API compatible with any platform; supports logs and analytics.',
    '- Deployed on Heroku and tested with Raspberry Pi + webcam setup.'
  ],
  '[
    {"name": "Python", "iconifyClass": "logos-python"},
    {"name": "OpenCV", "iconifyClass": "logos-opencv"},
    {"name": "Raspberry Pi", "iconifyClass": "logos-raspberry-pi"}
  ]'::jsonb,
  3
),
(
  'Facial Expression Recognition',
  '#',
  ARRAY[
    '- Emotion recognition model using CNN and facial landmark detection.',
    '- Applications: driver alertness monitoring, classroom engagement, HR analytics.',
    '- REST API service for easy third-party integration.'
  ],
  '[
    {"name": "Python", "iconifyClass": "logos-python"},
    {"name": "OpenCV", "iconifyClass": "logos-opencv"},
    {"name": "Tensorflow", "iconifyClass": "logos-tensorflow"}
  ]'::jsonb,
  4
),
(
  'Object Detection',
  '#',
  ARRAY[
    '- YOLOv8-based detection system for surveillance, footfall counting, and privacy protection.',
    '- Includes features like people/car blurring for GDPR compliance.',
    '- Available via REST API for integration in smart city and retail apps.'
  ],
  '[
    {"name": "Python", "iconifyClass": "logos-python"},
    {"name": "OpenCV", "iconifyClass": "logos-opencv"},
    {"name": "Pytorch", "iconifyClass": "logos-pytorch"}
  ]'::jsonb,
  5
),
(
  'ID Documents OCR',
  '#',
  ARRAY[
    '- Custom OCR for extracting structured data from ID documents (e.g., NIC, passport).',
    '- Suitable for KYC, onboarding, and document verification.',
    '- REST API for seamless backend integration.'
  ],
  '[
    {"name": "Python", "iconifyClass": "logos-python"},
    {"name": "OpenCV", "iconifyClass": "logos-opencv"}
  ]'::jsonb,
  6
),
(
  'Auto Subtitle generation from Audio/Video file',
  '#',
  ARRAY[
    '- Whisper-based transcription for multilingual audio/video content.',
    '- Offline support for surveillance, podcasting, call center monitoring.',
    '- Extendable to TTS/NLP pipelines with multi-language translation support.',
    '- Delivered as REST API microservice.'
  ],
  '[
    {"name": "Python", "iconifyClass": "logos-python"},
    {"name": "Pytorch", "iconifyClass": "logos-pytorch"}
  ]'::jsonb,
  7
),
(
  'Universal Automation Tool/Bot',
  '#',
  ARRAY[
    '- Automation toolkit for web scraping, booking, and task scheduling.',
    '- Supports WhatsApp, Facebook, Instagram, and e-commerce platforms.',
    '- Built with Selenium, integrates easily into custom workflows.'
  ],
  '[
    {"name": "Python", "iconifyClass": "logos-python"},
    {"name": "Selenium", "iconifyClass": "logos-selenium"}
  ]'::jsonb,
  8
),
(
  'Live QR Code Scanner API',
  '#',
  ARRAY[
    '- Real-time QR code reading API using webcam or video input.',
    '- Can be embedded into mobile/web platforms for ID scanning or payment systems.'
  ],
  '[
    {"name": "Python", "iconifyClass": "logos-python"},
    {"name": "OpenCV", "iconifyClass": "logos-opencv"}
  ]'::jsonb,
  9
);

-- Insert Certifications
INSERT INTO certifications (title, subtitle, logo_path, certificate_link, alt_name, color_code, order_index) VALUES
(
  'AI for Everyone',
  'deeplearning',
  'deeplearning.png',
  'https://www.coursera.org/account/accomplishments/certificate/JL7HKKRQCCJL',
  'deeplearning',
  '#fffbf3',
  0
),
(
  'Programming for Everybody',
  'Getting started with python',
  'university_of_michigan.png',
  'https://www.coursera.org/account/accomplishments/certificate/5PFEE7BZQRS7',
  'university of michigan',
  '#fffbf3',
  1
),
(
  'Enterprise Systems',
  'University of Minnesota',
  'university_of_minnesota.png',
  'https://www.coursera.org/account/accomplishments/certificate/C3YKXC88ZVQA',
  'University of Minnesota',
  '#fffbf3',
  2
),
(
  'Essential of Enterprenure',
  'Division of Continuing',
  'uci.png',
  'https://www.coursera.org/account/accomplishments/certificate/SSXAEQCRDGRL',
  'UCI',
  '#fffbf3',
  3
),
(
  'Finance for Startups',
  'KAIST',
  'kaist.png',
  'https://www.coursera.org/account/accomplishments/certificate/GHNDC28ATXH9',
  'Coursera',
  '#fffbf3',
  4
),
(
  'Innovating with the Business Model Canvas',
  'University of Virginia',
  'university_of_virginia.png',
  'https://www.coursera.org/account/accomplishments/certificate/JBZ8SK5SZHHC',
  'Coursera',
  '#fffbf3',
  5
),
(
  'IS/IT Governance',
  'University of Minnesota',
  'university_of_minnesota.png',
  'https://www.coursera.org/account/accomplishments/certificate/HJMA3ME4999M',
  'Coursera',
  '#fffbf3',
  6
),
(
  'Crash course on Python',
  'Google',
  'google.png',
  'https://www.coursera.org/account/accomplishments/certificate/TLQZXCQDPLVV',
  'Coursera',
  '#fffbf3',
  7
),
(
  'Python Data Structure',
  'University of Michigan',
  'university_of_michigan.png',
  'https://www.coursera.org/account/accomplishments/certificate/JFVBDURU6YH8',
  'Coursera',
  '#fffbf3',
  8
);
