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
        "⚡ Requirement and Information gathering from problem statement.",
        "⚡ Research and Development",
        "⚡ Prepare System Requirements Specification document",
        "⚡ Defining workflow and designing architecture",
        "⚡ Purposing development and deployment strategy",
      ],
      softwareSkills: [
        {
          skillName: "Research",
          fontAwesomeClassname: "fas fa-search",
          style: {
            color: "#E34F26",
          },
        },
        {
          skillName: "Brainstroming",
          fontAwesomeClassname: "fas fa-brain",
          style: {
            color: "#1572B6",
          },
        },
        {
          skillName: "FlowChart",
          fontAwesomeClassname: "fas fa-project-diagram",
          style: {
            backgroundColor: "#FFFFFF",
            color: "#F7DF1E",
          },
        },
        {
          skillName: "Documentation",
          fontAwesomeClassname: "fas fa-book",
          style: {
            color: "#439743",
          },
        },
      ],
    },
    {
      title: "Cloud Infra-Architecture",
      fileName: "CloudInfraImg",
      skills: [
        "⚡ Experience working on multiple cloud platforms",
        "⚡ Experience hosting and managing websites",
        "⚡ Experience with Continuous Integration of AI models",
      ],
      softwareSkills: [
        {
          skillName: "AWS",
          fontAwesomeClassname: "simple-icons:amazonaws",
          style: {
            color: "#FF9900",
          },
        },
        {
          skillName: "Azure",
          fontAwesomeClassname: "simple-icons:azure",
          style: {
            color: "#38AFBB",
          },
        },
        {
          skillName: "Heroku",
          fontAwesomeClassname: "simple-icons:heroku",
          style: {
            color: "#6863A6",
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
          skillName: "Docker",
          fontAwesomeClassname: "simple-icons:docker",
          style: {
            color: "#1488C6",
          },
        },
        {
          skillName: "GitHub",
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
        "⚡ Research and Development of AI Models",
        "⚡ Testing and Customization of Models",
        "⚡ Model Deployment on cloud",
        "⚡ Data Scraping and Information Gathering",
        "⚡ RESTful API design, development, testing, deployment and integration",
        "⚡ Data Analytics and Predictive Analysis",
        "⚡ Reports Generation and Plotting",
      ],
      softwareSkills: [
        {
          skillName: "Python",
          fontAwesomeClassname: "simple-icons:python",
          style: {
            color: "#FF9900",
          },
        },
        {
          skillName: "OpenCV",
          fontAwesomeClassname: "simple-icons:opencv",
          style: {
            color: "#38AFBB",
          },
        },
        {
          skillName: "FastAPI",
          fontAwesomeClassname: "simple-icons:fastapi",
          style: {
            color: "#6863A6",
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
          skillName: "Flask",
          fontAwesomeClassname: "simple-icons:flask",
          style: {
            color: "#1488C6",
          },
        },
        {
          skillName: "Selenium",
          fontAwesomeClassname: "simple-icons:selenium",
          style: {
            color: "#5b77ef",
          },
        },
        {
          skillName: "Pandas",
          fontAwesomeClassname: "simple-icons:pandas",
          style: {
            color: "#5b77ef",
          },
        },
        {
          skillName: "Plotly",
          fontAwesomeClassname: "simple-icons:plotly",
          style: {
            color: "#5b77ef",
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
      alt_name: "National University of Science and Technology, MISIS, Moscow, Russia",
      duration: "2023 - 2025",
      descriptions: [
        // "⚡ I'm currently pursuing my bachelors in Information Technology."
        "⚡ I am studying core courses of Data Science",
        "⚡ Completed a project of Licence Plate Recognition on Live Stream and API Deployment.",
        "⚡ Working on Smart Safe City Project as a Thesis.",
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
        // "⚡ I'm currently pursuing my bachelors in Information Technology."
        "⚡ I have studied core subjects like Data Structures, DBMS, Networking, Security, etc.",
        "⚡ I have also completed various embedded design courses related to Micro-Controller , Arduino , Raspberry Pi, etc.",
        "⚡ I have implemented several semester projects based on what I've learnt under my Computer Engineering course. ",
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
        "⚡ I have studied science subjects like Physics, Maths, Computer Science, etc.",
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
          duration: "Dec 2020 - Jan 2024",
          location: "Islamabad, Pakistan",
          descriptions: [
            "- Writing scripts and scraping tools for data scraping from public websites.",
            "- Data Cleaning, Mining and Annotation.",
            "- Finding useful information and patterns.",
            "- Writing scripts in python using Pandas and plotly for data visualization and report generation.",
            "- Compilation of perfect reports and pipeline the flow through API (FastAPI).",
            "- API Integration with dashboard and deployment on local server.",
            "- Handling POC (Proof of Concept).",
          ],
          // "I worked on the Dashboard project which helps users track their activities while using Walo Application. I also worked on Ocean Inventory Application and it's Admin panel Backend as well as on Ocean Inventory Admin Front-end using React and also worked on Walo Admin Backend.",
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
            "Working on State-of-the-art Facial Recognition System",

            "- Market research for AI based products and analyzing competition.",
            "- Software Requirement Specification Document Preparation.",
            "- Finalizing features for MVP (Minimum Viable Product).",
            "- Research and Development for AI models and techniques.",
            "- Prototyping for each feature and testing.",
            "- Development of APIs (using FastAPI) backed with AI models for specific feature.",
            "- Integration with Database (MongoDB) and performing CURD operations.",
            "- Protecting endpoints using authentication methods like JWT token and cookies.",
            "- Deployment on local server using Uvicorn, Nginx load balancer.",
            "- Integration with Frontend.",
            "- Documentation and user guide.",
          ],
          // "Created Front end of Yearn Financial Mutual Funds website. also degined simple web application for better user experience, designed DB Schemas as well.",
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
        "- Detection of Licence plate using Yolo based Trained Model.",
        "- Recognition of detected licence plate using OCR (EasyOCR).",
        "- Development of Demo Frontend using Streamlit.",
        "- Deployment on AWS EC2 and Integration with Database.",
      ],
      languages: [
        {
          name: "Python",
          iconifyClass: "logos-python",
        },
        {
          name: "OpenCV",
          iconifyClass: "logos-opencv",
        },
        {
          name: "Tensorflow",
          iconifyClass: "logos-tensorflow",
        },
        {
          name: "HTML",
          iconifyClass: "logos-html-5",
        },
        {
          name: "JS",
          iconifyClass: "logos-javascript",
        },
      ],
    },
    {
      id: "1",
      name: "Face Liveness Detection - Anti-Spoofing",
      url: "#",
      descriptions: [
        "- It can be used in KYC (Know Your Customer)",
        "- It can be used along with ID Document OCR and ID Verification.",
        "- It can be used in Face Recognition based Lock Systems.",
        "- In other apps where real person needs to be verify.",
      ],
      languages: [
        {
          name: "Python",
          iconifyClass: "logos-python",
        },
        {
          name: "OpenCV",
          iconifyClass: "logos-opencv",
        },
        {
          name: "Tensorflow",
          iconifyClass: "logos-tensorflow",
        },
        {
          name: "HTML",
          iconifyClass: "logos-html-5",
        },
        {
          name: "JS",
          iconifyClass: "logos-javascript",
        },
      ],
    },
    {
      id: "8",
      name: "Event Photo Album Sorting | Face Recognition AI",
      url: "https://www.loom.com/share/165ad86545a74479894b09b2672191b8",
      descriptions: [
        "- Indexing of Photos using Face Recognition.",
        "- Identification of Persons in Photos.",
        "- Making unique album for each person.",
        "- Moving photos to respective album.",
      ],
      languages: [
        {
          name: "Python",
          iconifyClass: "logos-python",
        },
        {
          name: "OpenCV",
          iconifyClass: "logos-opencv",
        },
        {
          name: "Tensorflow",
          iconifyClass: "logos-tensorflow",
        },
        {
          name: "HTML",
          iconifyClass: "logos-html-5",
        },
        {
          name: "JS",
          iconifyClass: "logos-javascript",
        },
      ],
    },
    {
      id: "2",
      name: "Face Recognition API",
      url: "https://frsapi-b721264c7dcd.herokuapp.com/docs",
      descriptions: [
        "- It is based on CURD. Enroll, Update, Remove, Verify (1:1) and also Matching (1:N).",
        "- It can be used where Login, Authentication or user verification required.",
        "- It can be integrate-able with any Platform (It is Based on REST API.",
        "- It can be used in Attendance System, Video Survillance System and Monitoring etc.",
        "- It can be deploy on Raspberry Pi for smart Door Locks using Facial Recognition.",
        "- It maintains Logs for each request.",
      ],
      languages: [
        {
          name: "Python",
          iconifyClass: "logos-python",
        },
        {
          name: "OpenCV",
          iconifyClass: "logos-opencv",
        },
        {
          name: "Dlib",
          iconifyClass: "logos-stdlib",
        },
        {
          name: "Raspberry Pi",
          iconifyClass: "logos-raspberry-pi",
        },
        {
          name: "Twilio",
          iconifyClass: "logos-twilio",
        },
      ],
    },
    {
      id: "3",
      name: "Facial Expression Recognition",
      url: "#",
      descriptions: [
        "- It can be used to analyze facial expression.",
        "- Mood Analysis i.e. Driver Mood Analysis, Student facial Expression during class etc.",
        "- It is based on RestAPI and be integrate-able easily.",
      ],
      languages: [
        {
          name: "Python",
          iconifyClass: "logos-python",
        },
        {
          name: "OpenCV",
          iconifyClass: "logos-opencv",
        },
        {
          name: "Dlib",
          iconifyClass: "logos-stdlib",
        },
        {
          name: "Tensorflow",
          iconifyClass: "logos-tensorflow",
        },
        {
          name: "SQlite",
          iconifyClass: "logos-sqlite",
        },
      ],
    },
    {
      id: "4",
      name: "Object Detection",
      url: "#",
      descriptions: [
        "- This system can be used for Survillance.",
        "- For Footfall count.",
        "- Monitoring.",
        "- Personal Analysis.",
        "- Public Privacy in CCTV cameras (Recording by bluring cars, persons etc.).",
        "- Good to use in any custom application based on requirements.",
        "- Available in Rest API.",
      ],
      languages: [
        {
          name: "Python",
          iconifyClass: "logos-python",
        },
        {
          name: "OpenCV",
          iconifyClass: "logos-opencv",
        },
        {
          name: "Yolo",
          iconifyClass: "logos-yolo",
        },
        {
          name: "Pytorch",
          iconifyClass: "logos-pytorch",
        },
        {
          name: "SQlite",
          iconifyClass: "logos-sqlite",
        },
      ],
    },
    {
      id: "5",
      name: "ID Documents OCR",
      url: "#",
      descriptions: [
        "- Reading textual data from ID Document.",
        "- It can be used in KYC (Know Your Customer).",
        "- Custom ID document OCR can be developed for Passport etc.",
        "- Available Rest API for Integration.",
      ],
      languages: [
        {
          name: "Python",
          iconifyClass: "logos-python",
        },
        {
          name: "OpenCV",
          iconifyClass: "logos-opencv",
        },
        {
          name: "Pytorch",
          iconifyClass: "logos-pytorch",
        },
        {
          name: "SQlite",
          iconifyClass: "logos-sqlite",
        },
      ],
    },
    {
      id: "6",
      name: "Auto Subtitle generation from Audio/Video file",
      url: "#",
      descriptions: [
        "- It supports more than 15 languages.",
        "- It can be used for transcription purpose.",
        "- It can be used for mobile call monitoring (Survillance).",
        "- It can be used for Podcast subtitle.",
        "- It can be integrate-able with multi-language translation by adding text to speech.",
        "- It works offline on the system.",
        "- Available in Rest API",
      ],
      languages: [
        {
          name: "Python",
          iconifyClass: "logos-python",
        },
        {
          name: "OpenCV",
          iconifyClass: "logos-opencv",
        },
        {
          name: "Pytorch",
          iconifyClass: "logos-pytorch",
        },
      ],
    },
    {
      id: "7",
      name: "Universal Automation Tool/Bot",
      url: "#",
      descriptions: [
        "- Auto ticket Booking, making Purchases from online store, monitoring sites.",
        "- Posting on Social Media, Getting Details from social media.",
        "- Scrapping from web.",
        "- Automating Whatsapp, Facebook, Instagram etc.",
      ],
      languages: [
        {
          name: "Python",
          iconifyClass: "logos-python",
        },
        {
          name: "Selenium",
          iconifyClass: "logos-selenium",
        },
        {
          name: "SQlite",
          iconifyClass: "logos-sqlite",
        },
      ],
    },
    {
      id: "0",
      name: "Live QR Code Scanner API",
      url: "#",
      descriptions: [
        "- It can be used in Mobile Apps.",
        "- It can be used as Web App",
      ],
      languages: [
        {
          name: "Python",
          iconifyClass: "logos-python",
        },
        {
          name: "OpenCV",
          iconifyClass: "logos-opencv",
        },
        {
          name: "HTML",
          iconifyClass: "logos-html-5",
        },
        {
          name: "JS",
          iconifyClass: "logos-javascript",
        },
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
