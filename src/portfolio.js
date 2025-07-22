/* Change this file to get your personal Porfolio */

// Website related settings
const settings = {
  isSplash: true, // Change this to true if you want to use the splash screen.
  useCustomCursor: false, // Change this to false if you want the good'ol cursor
  googleTrackingID: "G-K1RFVM3HBT",
};

//Home Page
const greeting = {
  title: "Hello 👋.",
  title2: "Monis",
  nickname: "Monis",
  full_name: "Monis Ali",
  subTitle: "AI Engineer, Aspiring Data Scientist 🔥. Python Developer.",
  resumeLink:
    "https://drive.google.com/file/d/1EPVrT2vodRn8MdN8YirhbxpqDbCqyfs3/view?usp=sharing",
  mail: "mailto:monisaliqureshi@gmail.com",
};

const socialMediaLinks = {
  /* Your Social Media Link */
  github: "https://github.com/monisaliqureshi",
  linkedin: "https://www.linkedin.com/in/monisaliqureshi/",
  gmail: "monisaliqureshi@gmail.com",
  gitlab: "https://gitlab.com/monisaliqureshi",
  facebook: "https://www.facebook.com/monisaliqureshi/",
  twitter: "https://twitter.com/monisaliqureshi",
  instagram: "https://www.instagram.com/monisaliqureshi/",
};

const skills = {
  data: [
    {
      title: "Solution Design Engineer",
      fileName: "FullStackImg",
      skills: [
        "⚡ R&D on problem-specific AI solutions (Face/Plate/Object Recognition)",
        "⚡ Requirement gathering and defining deployment-ready architectures",
        "⚡ Prepare System Requirements & Technical Specifications",
        "⚡ Microservices-based system design using FastAPI & Docker",
        "⚡ Define end-to-end pipelines from prototyping to production deployment",
      ],
      softwareSkills: [
        {
          skillName: "AI Solution Design",
          fontAwesomeClassname: "fas fa-cogs",
          style: {
            color: "#00BFFF",
          },
        },
        {
          skillName: "Workflow Architecture",
          fontAwesomeClassname: "fas fa-project-diagram",
          style: {
            color: "#9b59b6",
          },
        },
        {
          skillName: "Documentation",
          fontAwesomeClassname: "fas fa-book",
          style: {
            color: "#2ecc71",
          },
        },
        {
          skillName: "Technical Writing",
          fontAwesomeClassname: "fas fa-pencil-alt",
          style: {
            color: "#e67e22",
          },
        },
      ],
    },
    {
      title: "Cloud Infra-Architecture",
      fileName: "CloudInfraImg",
      skills: [
        "⚡ Deploying AI systems on cloud and edge environments (Jetson Nano, AWS)",
        "⚡ Containerization with Docker for consistent deployments",
        "⚡ Experience with CI/CD for AI and API systems using GitHub Actions",
      ],
      softwareSkills: [
        {
          skillName: "Docker",
          fontAwesomeClassname: "simple-icons:docker",
          style: {
            color: "#1488C6",
          },
        },
        {
          skillName: "AWS",
          fontAwesomeClassname: "simple-icons:amazonaws",
          style: {
            color: "#FF9900",
          },
        },
        {
          skillName: "FastAPI",
          fontAwesomeClassname: "simple-icons:fastapi",
          style: {
            color: "#05998B",
          },
        },
        {
          skillName: "PostgreSQL",
          fontAwesomeClassname: "simple-icons:postgresql",
          style: {
            color: "#336791",
          },
        },
        {
          skillName: "GitHub Actions",
          fontAwesomeClassname: "simple-icons:githubactions",
          style: {
            color: "#5b77ef",
          },
        },
      ],
    },
    {
      title: "AI Software Development",
      fileName: "CloudInfraImg",
      skills: [
        "⚡ Building and deploying real-time AI systems for smart city applications",
        "⚡ Computer vision models: YOLOv8, PaddleOCR, FaceNet",
        "⚡ API-driven architecture using FastAPI for OCR, LPR, and face recognition",
        "⚡ Data scraping, text/image analysis, and automated report generation",
        "⚡ Experience with OpenAI Whisper, EasyOCR, and TensorRT",
      ],
      softwareSkills: [
        {
          skillName: "Python",
          fontAwesomeClassname: "simple-icons:python",
          style: {
            color: "#306998",
          },
        },
        {
          skillName: "YOLOv8",
          fontAwesomeClassname: "fas fa-bullseye",
          style: {
            color: "#e74c3c",
          },
        },
        {
          skillName: "OpenCV",
          fontAwesomeClassname: "simple-icons:opencv",
          style: {
            color: "#5C3EE8",
          },
        },
        {
          skillName: "PaddleOCR",
          fontAwesomeClassname: "fas fa-eye",
          style: {
            color: "#27ae60",
          },
        },
        {
          skillName: "FastAPI",
          fontAwesomeClassname: "simple-icons:fastapi",
          style: {
            color: "#05998B",
          },
        },
        {
          skillName: "MongoDB",
          fontAwesomeClassname: "simple-icons:mongodb",
          style: {
            color: "#47A248",
          },
        },
        {
          skillName: "Pandas",
          fontAwesomeClassname: "simple-icons:pandas",
          style: {
            color: "#130754",
          },
        },
        {
          skillName: "Plotly",
          fontAwesomeClassname: "simple-icons:plotly",
          style: {
            color: "#3f4cbb",
          },
        },
      ],
    },
  ],
};

const degrees = {
  degrees: [
    {
      title: "NUST MISIS University, Moscow, Russia",
      subtitle: "Masters in Data Science",
      logo_path: "misis.png",
      alt_name:
        "National University of Science and Technology, MISIS, Moscow, Russia",
      duration: "2023 - 2025",
      descriptions: [
        "⚡ Specialized in AI, Computer Vision, and System Architecture with distinction (Red Diploma).",
        "⚡ Thesis: Comparative Study and Implementation of License Plate Detection and Recognition for Smart Cities.",
        "⚡ Built a production-ready LPR API using YOLOv8, PaddleOCR, FastAPI, Docker, and PostgreSQL.",
        "⚡ Led real-time AI deployment projects, integrating OCR, facial recognition, and traffic analytics.",
      ],
      website_link: "https://misis.ru",
    },
    {
      title: "University of Engineering and Technology Taxila, Pakistan",
      subtitle: "Bachelor of Science in Computer Engineering",
      logo_path: "uett.png",
      alt_name: "UET Taxila",
      duration: "2016 - 2020",
      descriptions: [
        "⚡ Gained strong foundations in Data Structures, Operating Systems, Databases, Networking, and Digital Logic.",
        "⚡ Completed coursework and projects on embedded systems including Microcontrollers, Arduino, and Raspberry Pi.",
        "⚡ Final Year Project: Predicting Perceived Stress Scores using EEG headbands – published at IEEE IBCAST 2021.",
        "⚡ Practiced real-world project development including automation and sensor-based systems.",
      ],
      website_link: "http://www.uettaxila.edu.pk/",
    },
    {
      title: "Punjab College, Muzaffargarh",
      subtitle: "Intermediate in Computer Science",
      logo_path: "pgc.png",
      alt_name: "PGC",
      duration: "2013 - 2016",
      descriptions: [
        "⚡ Studied foundational science subjects including Physics, Mathematics, and Computer Science.",
        "⚡ Developed early interest in programming, algorithms, and logical problem-solving.",
      ],
      website_link: "http://www.pgc.edu/",
    },
  ],
};

const certifications = {
  certifications: [
    {
      title: "AI for Everyone",
      subtitle: "deeplearning",
      logo_path: "deeplearning.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/JL7HKKRQCCJL",
      alt_name: "deeplearning",
      // color_code: "#2AAFED",
      color_code: "#fffbf3",
    },
    {
      title: "Programming for Everybody",
      subtitle: "Getting started with python",
      logo_path: "university_of_michigan.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/5PFEE7BZQRS7",
      alt_name: "university of michigan",
      color_code: "#fffbf3",
    },
    {
      title: "Enterprise Systems",
      subtitle: "University of Minnesota",
      logo_path: "university_of_minnesota.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/C3YKXC88ZVQA",
      alt_name: "University of Minnesota",
      // color_code: "#F6B808",
      color_code: "#fffbf3",
    },
    {
      title: "Essential of Enterprenure",
      subtitle: "Division of Continuing",
      logo_path: "uci.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/SSXAEQCRDGRL",
      alt_name: "UCI",
      color_code: "#fffbf3",
    },
    {
      title: "Finance for Startups",
      subtitle: "KAIST",
      logo_path: "kaist.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/GHNDC28ATXH9",
      alt_name: "Coursera",
      color_code: "#fffbf3",
    },
    {
      title: "Innovating with the Business Model Canvas",
      subtitle: "University of Virginia",
      logo_path: "university_of_virginia.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/JBZ8SK5SZHHC",
      alt_name: "Coursera",
      color_code: "#fffbf3",
    },
    {
      title: "IS/IT Governance",
      subtitle: "University of Minnesota",
      logo_path: "university_of_minnesota.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/HJMA3ME4999M",
      alt_name: "Coursera",
      // color_code: "#f36c3d",
      color_code: "#fffbf3",
    },
    {
      title: "Crash course on Python",
      subtitle: "Google",
      logo_path: "google.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/TLQZXCQDPLVV",
      alt_name: "Coursera",
      // color_code: "#f36c3d",
      color_code: "#fffbf3",
    },
    {
      title: "Python Data Structure",
      subtitle: "University of Michigan",
      logo_path: "university_of_michigan.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/JFVBDURU6YH8",
      alt_name: "Coursera",
      // color_code: "#f36c3d",
      color_code: "#fffbf3",
    },
    // color_code: "#8C151599",
    // color_code: "#7A7A7A",
    // color_code: "#0C9D5899",
    // color_code: "#C5E2EE",
    // color_code: "#ffc475",
    // color_code: "#g",
    // color_code: "#ffbfae",
    // color_code: "#fffbf3",
    // color_code: "#b190b0",
  ],
};

// Experience Page
const experience = {
  title: "Experience",
  header_image_path: "experience.svg",
  sections: [
    {
      title: "Work Experience",
      experiences: [
        {
          title: "Software Development Engineer",
          company: "DELTA Technology Consulting (Pvt) Ltd.",
          company_url: "https://dtcpak.com/",
          logo_path: "dtcpak.png",
          duration: "Dec 2020 - July 2021",
          location: "Islamabad, Pakistan",
          descriptions: [
            "- Led backend development for AI-driven applications including facial recognition and LPR systems.",
            "- Developed modular FastAPI-based microservices for real-time computer vision tasks.",
            "- Designed and deployed REST APIs for license plate and facial recognition workflows.",
            "- Created intelligent data pipelines: from scraping and annotation to analytics and reporting.",
            "- Integrated PaddleOCR, YOLOv8, and FastAPI for production-grade OCR solutions.",
            "- Deployed systems on local servers with Docker and Uvicorn + Nginx stack.",
            "- Delivered Proof-of-Concepts (PoC) for smart city surveillance and access control.",
          ],
          color: "#0071C5",
        },
        {
          title: "AI Software Developer",
          company: "FACEHAWK LIMITED",
          company_url: "http://facehawk.co.uk/",
          logo_path: "facehawk.png",
          duration: "Aug 2021 - Present",
          location: "Luton, England, United Kingdom (Remote)",
          descriptions: [
            "- Spearheaded R&D for a smart city-ready facial recognition and crowd analytics platform.",
            "- Authored Software Requirement Specification (SRS) and MVP scoping documents.",
            "- Developed secure, scalable FastAPI endpoints integrated with MongoDB and PostgreSQL.",
            "- Implemented state-of-the-art AI models for face matching, verification, and live tracking.",
            "- Built facial authentication APIs with JWT-based authorization and session cookies.",
            "- Designed dual-auth biometric systems combining FaceNet with OCR-based verification.",
            "- Deployed services with Docker, orchestrated behind Nginx reverse proxy for stability.",
            "- Coordinated frontend integration, testing pipelines, and deployment guides.",
            "- Contributed to smart security applications including weapon room access control and payroll attendance systems.",
          ],
          color: "#ee3c26",
        },
      ],
    },
  ],
};

// Projects Page
const projectsHeader = {
  title: "Projects",
  description:
    "My projects make use of a vast variety of latest technology tools. My best experience is to create Python Backend Projects, Web Scraper, and AI models. Below are some of my baseline projects for development of full systems are mentioned but not all of my projects, because of NDA Signed with clients. I can show you demo on request and have discussion on your requirements.",
  avatar_image_path: "projects_image.svg",
};

// Contact Page
const contactPageData = {
  contactSection: {
    title: "Contact Me",
    profile_image_path: "monis.png",
    description:
      "You can contact me at the places mentioned below. I will try to get back to you as fast as I can. ",
  },
  blogSection: {
    title: "Hire Me",
    subtitle:
      "You can reach me out from any contacts above share. Also, we can work on Upwork.",
    link: "https://www.upwork.com/freelancers/~0154de438999b692ce",
    avatar_image_path: "blogs_image.svg",
  },
};

const projects = {
  data: [
    {
      id: "8",
      name: "Licence Plate Recognition API and Live Stream",
      url: "https://license-plate.streamlit.app/",
      descriptions: [
        "- Real-time LPR system using YOLOv8 for detection and PaddleOCR for recognition.",
        "- Modular FastAPI backend with endpoints for detection, OCR, and logging.",
        "- Streamlit-based demo frontend for quick testing and validation.",
        "- Deployed on AWS EC2 with Docker, integrated with PostgreSQL for storage.",
      ],
      languages: [
        { name: "Python", iconifyClass: "logos-python" },
        { name: "OpenCV", iconifyClass: "logos-opencv" },
        { name: "Tensorflow", iconifyClass: "logos-tensorflow" },
        { name: "HTML", iconifyClass: "logos-html-5" },
        { name: "JS", iconifyClass: "logos-javascript" },
      ],
    },
    {
      id: "1",
      name: "Face Liveness Detection - Anti-Spoofing",
      url: "#",
      descriptions: [
        "- Developed anti-spoofing system using CNN to detect print and replay attacks.",
        "- Useful in secure KYC, access control, and online identity verification.",
        "- Designed to integrate with face recognition and ID verification pipelines.",
      ],
      languages: [
        { name: "Python", iconifyClass: "logos-python" },
        { name: "OpenCV", iconifyClass: "logos-opencv" },
        { name: "Tensorflow", iconifyClass: "logos-tensorflow" },
        { name: "HTML", iconifyClass: "logos-html-5" },
        { name: "JS", iconifyClass: "logos-javascript" },
      ],
    },
    {
      id: "8",
      name: "Event Photo Album Sorting | Face Recognition AI",
      url: "https://www.loom.com/share/165ad86545a74479894b09b2672191b8",
      descriptions: [
        "- AI-powered tool for indexing event photos using FaceNet.",
        "- Automatically detects and clusters photos by individual identity.",
        "- Generates separate albums per person and organizes them.",
        "- Supports large image batches with face embedding caching.",
      ],
      languages: [
        { name: "Python", iconifyClass: "logos-python" },
        { name: "OpenCV", iconifyClass: "logos-opencv" },
        { name: "Tensorflow", iconifyClass: "logos-tensorflow" },
        { name: "HTML", iconifyClass: "logos-html-5" },
        { name: "JS", iconifyClass: "logos-javascript" },
      ],
    },
    {
      id: "2",
      name: "Face Recognition API",
      url: "https://frsapi-b721264c7dcd.herokuapp.com/docs",
      descriptions: [
        "- CRUD operations for face data: Enroll, Update, Remove, Verify (1:1), and Match (1:N).",
        "- Designed for secure biometric authentication systems.",
        "- REST API compatible with any platform; supports logs and analytics.",
        "- Deployed on Heroku and tested with Raspberry Pi + webcam setup.",
      ],
      languages: [
        { name: "Python", iconifyClass: "logos-python" },
        { name: "OpenCV", iconifyClass: "logos-opencv" },
        { name: "Dlib", iconifyClass: "logos-stdlib" },
        { name: "Raspberry Pi", iconifyClass: "logos-raspberry-pi" },
        { name: "Twilio", iconifyClass: "logos-twilio" },
      ],
    },
    {
      id: "3",
      name: "Facial Expression Recognition",
      url: "#",
      descriptions: [
        "- Emotion recognition model using CNN and facial landmark detection.",
        "- Applications: driver alertness monitoring, classroom engagement, HR analytics.",
        "- REST API service for easy third-party integration.",
      ],
      languages: [
        { name: "Python", iconifyClass: "logos-python" },
        { name: "OpenCV", iconifyClass: "logos-opencv" },
        { name: "Dlib", iconifyClass: "logos-stdlib" },
        { name: "Tensorflow", iconifyClass: "logos-tensorflow" },
        { name: "SQlite", iconifyClass: "logos-sqlite" },
      ],
    },
    {
      id: "4",
      name: "Object Detection",
      url: "#",
      descriptions: [
        "- YOLOv8-based detection system for surveillance, footfall counting, and privacy protection.",
        "- Includes features like people/car blurring for GDPR compliance.",
        "- Available via REST API for integration in smart city and retail apps.",
      ],
      languages: [
        { name: "Python", iconifyClass: "logos-python" },
        { name: "OpenCV", iconifyClass: "logos-opencv" },
        { name: "Yolo", iconifyClass: "logos-yolo" },
        { name: "Pytorch", iconifyClass: "logos-pytorch" },
        { name: "SQlite", iconifyClass: "logos-sqlite" },
      ],
    },
    {
      id: "5",
      name: "ID Documents OCR",
      url: "#",
      descriptions: [
        "- Custom OCR for extracting structured data from ID documents (e.g., NIC, passport).",
        "- Suitable for KYC, onboarding, and document verification.",
        "- REST API for seamless backend integration.",
      ],
      languages: [
        { name: "Python", iconifyClass: "logos-python" },
        { name: "OpenCV", iconifyClass: "logos-opencv" },
        { name: "Pytorch", iconifyClass: "logos-pytorch" },
        { name: "SQlite", iconifyClass: "logos-sqlite" },
      ],
    },
    {
      id: "6",
      name: "Auto Subtitle generation from Audio/Video file",
      url: "#",
      descriptions: [
        "- Whisper-based transcription for multilingual audio/video content.",
        "- Offline support for surveillance, podcasting, call center monitoring.",
        "- Extendable to TTS/NLP pipelines with multi-language translation support.",
        "- Delivered as REST API microservice.",
      ],
      languages: [
        { name: "Python", iconifyClass: "logos-python" },
        { name: "OpenCV", iconifyClass: "logos-opencv" },
        { name: "Pytorch", iconifyClass: "logos-pytorch" },
      ],
    },
    {
      id: "7",
      name: "Universal Automation Tool/Bot",
      url: "#",
      descriptions: [
        "- Automation toolkit for web scraping, booking, and task scheduling.",
        "- Supports WhatsApp, Facebook, Instagram, and e-commerce platforms.",
        "- Built with Selenium, integrates easily into custom workflows.",
      ],
      languages: [
        { name: "Python", iconifyClass: "logos-python" },
        { name: "Selenium", iconifyClass: "logos-selenium" },
        { name: "SQlite", iconifyClass: "logos-sqlite" },
      ],
    },
    {
      id: "0",
      name: "Live QR Code Scanner API",
      url: "#",
      descriptions: [
        "- Real-time QR code reading API using webcam or video input.",
        "- Can be embedded into mobile/web platforms for ID scanning or payment systems.",
      ],
      languages: [
        { name: "Python", iconifyClass: "logos-python" },
        { name: "OpenCV", iconifyClass: "logos-opencv" },
        { name: "HTML", iconifyClass: "logos-html-5" },
        { name: "JS", iconifyClass: "logos-javascript" },
      ],
    },
  ],
};

export {
  settings,
  greeting,
  socialMediaLinks,
  skills,
  degrees,
  certifications,
  experience,
  projectsHeader,
  contactPageData,
  projects,
};
