import {
  Sarfes,
  mobile,
  backend,
  web,
  javascript,
  html,
  css,
  reactjs,
  mysql,
  firebase,
  flutter,
  java,
  python,
  springboot,
  nodejs,
  mongodb,
  git,
  asal,
  trafficlight,
  kia,
  appStore,
  playStore,
  asalCertificate,
  asalInternshipCertificate,
  birzeitBachelorCertificate,
  efsetEnglishCertificate,
  claude101Certificate,
  claudeCode101Certificate,
  claudePlatform101Certificate,
  googlePlayAcademyIgniteCertificate,
  googlePlayAcademyCertificate,
  RIGTradeINSplash,
  RIGTradeINRequests,
  RIGTradeINArchive,
  RIGTradeINRequestSample,
  RIGTradeINStock,
  RIGAuto,
  RIGAutoCen,
  RIGAutoBrands,
  RIGAutoCharging,
  RIGAutomap,
  RIGAutomore,
  RIGAutoprofile,
  RIGAutorequests,
  RIGAutosettings,
  RIGAutosplash,
  RIGAutovehinfo,
  RIGAutoAllVeh,
  PALEVNavigation,
  PALEVStationProfile,
  PALEVActiveSession,
  PALEVActiveSessions,
  PALEVSessions,
  PALEVFavLocations,
  PALEVSubscriptions,
  PALEVMyAccount,
  PALEVNotifications,
  PALEVSettings,
  PALEVMore,
  PALEVBiometry,
  PALEVSatellite,
  PALEVComingSoon,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "skills",
    title: "Skills",
  },
  {
    id: "certificates",
    title: "Certificates",
  },
  {
    id: "Projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Ai Computer Vision Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Mobile Development",
    icons: [
      { name: "App Store", src: appStore },
      { name: "Play Store", src: playStore },
    ],
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  // {
  //   name: "TypeScript",
  //   icon: typescript,
  // },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "mySQL",
    icon: mysql,
  },
  // {
  //   name: "Tailwind CSS",
  //   icon: tailwind,
  // },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  // {
  //   name: "Three JS",
  //   icon: threejs,
  // },
  {
    name: "git",
    icon: git,
  },
  {
    name: "firebase",
    icon: firebase,
  },
  {
    name: "Flutter",
    icon: flutter,
  },
  {
    name: "Java",
    icon: java,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "Spring Boot",
    icon: springboot,
  },
];

const experiences = [
  {
    title: "Springboot Backend Developer",
    company_name: "Asal Technologies",
    icon: asal,
    iconBg: "#383E56",
    date: "January 2025",
    techStack: [
      { name: "Git", icon: git },
      { name: "Java", icon: java },
      { name: "Spring Boot", icon: springboot },
      { name: "MySQL", icon: mysql },
    ],
    points: [
      "Developing and maintaining back-end web applications using spring-boot and other related technologies.",
      "Collaborating with cross-functional teams including manager, and other developers to create high-quality backend API's.",
      "Implementing API's and testing them using Postman and other technologies.",
      "Participating in code reviews and providing constructive feedback ",
    ],
  },
  {
    title: "React.js Developer",
    company_name: "3DPortfolio",
    icon: reactjs,
    iconBg: "#383E56",
    date: "May 2025",
    techStack: [
      { name: "React", icon: reactjs },
      { name: "HTML", icon: html },
      { name: "CSS", icon: css },
      { name: "JavaScript", icon: javascript },
      { name: "Node.js", icon: nodejs },
    ],
    points: [
      "Developing and maintaining 3D web Portfolio using React.js and other related technologies.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "creating Email templates and integrating them with the portfolio for auto-reply and notifications.",
    ],
  },
  {
    title: "Mobile App Developer",
    company_name: "RIG-Ramallah Investment Group",
    icon: flutter,
    iconBg: "#383E56",
    date: "July 2025",
    techStack: [
      { name: "Flutter", icon: flutter },
      { name: "Firebase", icon: firebase },
    ],
    points: [
      "Developing and maintaining mobile applications using flutter and other related technologies.",
      "Collaborating with cross-functional teams including managers, and other developers to create high-quality mobile applications.",
      "Implementing features and testing them using Postman and other technologies.",
      "Participating in code reviews and providing constructive feedback ",
      "Deploying the application to the app store and play store.",
    ],
  },
];

const certificates = [
  {
    id: "asal",
    issuer: "ASAL Technologies",
    documents: [
      {
        title: "Certificate of Training on Backend Development",
        file: asalCertificate,
        type: "image",
      },
      {
        title: "Certificate of Internship & Practical Training",
        file: asalInternshipCertificate,
        type: "image",
      },
    ],
  },
  {
    id: "birzeit",
    issuer: "Birzeit University",
    documents: [
      {
        title: "Bachelor University Certificate",
        file: birzeitBachelorCertificate,
        type: "image",
      },
    ],
  },
  {
    id: "efset",
    issuer: "EF SET",
    documents: [
      {
        title: "EF SET English Certificate",
        file: efsetEnglishCertificate,
        type: "pdf",
      },
    ],
  },
  {
    id: "claude",
    issuer: "Anthropic",
    documents: [
      {
        title: "Claude 101",
        file: claude101Certificate,
        type: "pdf",
      },
      {
        title: "Claude Code 101",
        file: claudeCode101Certificate,
        type: "pdf",
      },
      {
        title: "Claude Platform 101",
        file: claudePlatform101Certificate,
        type: "pdf",
      },
    ],
  },
  {
    id: "play-store",
    issuer: "Google Play Academy",
    documents: [
      {
        title: "Google Play Academy Ignite",
        file: googlePlayAcademyIgniteCertificate,
        type: "pdf",
      },
      {
        title: "Google Play Academy Certificate",
        file: googlePlayAcademyCertificate,
        type: "pdf",
      },
    ],
  },
];

// const testimonials = [
//   {
//     testimonial:
//       "I thought it was impossible to make a website as beautiful as some professional websites but Tanay helped me in creating one.",
//     name: "Varun",
//     designation: "Student",
//     company: "Chandigarh University",
//     image: "https://i.ibb.co/9WKh9vT/varunl.jpg",
//   },
//   {
//     testimonial:
//       "Tanay helped me a lot in developing our product for SIH-2023 ",
//     name: "Amit",
//     designation: "Student",
//     company: "Chandigarh University",
//     image: "https://i.ibb.co/DQBCXXp/amitl.jpg",
//   },
//   {
//     testimonial:
//       "Hi and thankyou for  developing a portfolio website for my use",
//     name: "Anshuman",
//     designation: "Student",
//     company: "Chandigarh University",
//     image: "https://i.ibb.co/fXHSqkK/anshumanl.jpg",
//   },
// ];

const projects = [
  {
    name: "Kia Motors",
    description:
      "I have developed an interactive desktop application for Kia Motors, utilizing java, SceenBuilder, and MySQL. This application serves as a comprehensive platform for managing customer data, vehicle information, and service records. It features a user-friendly interface that allows employees to efficiently handle customer inquiries, schedule appointments, and track service history. The integration of MySQL ensures secure and reliable data storage, while the use of Java and SceneBuilder enables a responsive and visually appealing design. This project aims to enhance operational efficiency and improve customer service within Kia Motors.",
    tags: [
      {
        name: "Java",
        color: "blue-text-gradient",
      },
      {
        name: "MySQL",
        color: "green-text-gradient",
      },
      {
        name: "JavaFX",
        color: "pink-text-gradient",
      },
      {
        name: "SceneBuilder",
        color: "blue-text-gradient",
      },
    ],
    images: [kia],
    source_code_Link: "https://github.com/odyshbayeh/Kia_motors_project",
  },
  {
    name: "Traffic Management System",
    description:
      "Developed a comprehensive Traffic Management System using Python, Flask, MongoDB, React, HTML, CSS, Kaggle, OCR, YOLOv8, Filtepy and OpenCV. This system integrates real-time traffic data analysis and visualization, enabling efficient traffic flow management. It features a user-friendly interface for monitoring traffic conditions, detecting congestion, and providing actionable insights to improve urban mobility. The use of machine learning algorithms such as YOLOv8 enhances predictive capabilities, allowing for proactive traffic management strategies and additional to a RedLight Violation Detection System.",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "Flask",
        color: "green-text-gradient",
      },
      {
        name: "MongoDB",
        color: "pink-text-gradient",
      },
      {
        name: "React",
        color: "blue-text-gradient",
      },
      {
        name: "OpenCV",
        color: "green-text-gradient",
      },
      {
        name: "YOLOv8",
        color: "pink-text-gradient",
      },
      {
        name: "OCR",
        color: "blue-text-gradient",
      },
      {
        name: "Kaggle",
        color: "green-text-gradient",
      },
    ],
    images: [trafficlight],
    source_code_Link:
      "https://github.com/odyshbayeh/TrafficManagementRedLightViolationDetection",
  },
  {
    name: "Sarfes-APP",
    description:
      "Sarfes is a comprehensive mobile application designed using Flutter, Firebase and Android & IOS designed to streamline the process of transportation between public transportation and passengers. It offers a user-friendly interface for passengers to book rides, track vehicles in real-time, and manage their transportation needs efficiently. The app integrates advanced features such as GPS tracking, ride scheduling, and secure payment options, ensuring a seamless experience for users. Sarfes aims to enhance urban mobility by providing a reliable and convenient platform for daily commuters.",
    tags: [
      {
        name: "Flutter",
        color: "blue-text-gradient",
      },
      {
        name: "Firebase",
        color: "green-text-gradient",
      },
      {
        name: "Android",
        color: "pink-text-gradient",
      },
      {
        name: "IOS",
        color: "green-text-gradient",
      },
    ],
    images: [Sarfes],
    source_code_Link: "https://github.com/PierreBB2002/Sarfes-Project",
  },
  {
    name: "RIG-TradeIN",
    description:
      "RIG-TradeIN is a comprehensive Internal mobile application Developed To manage the TradeIN-Archive-Stock Requests in RIG-Ramallah Investment Group, It offers a user-friendly interface for employees to manage the TradeIN-Archive-Stock Requests efficiently. then it provides a seamless experience for Employees to enhance their productivity and efficiency.",
    tags: [
      // {
      //   name: "Flutter",
      //   color: "blue-text-gradient",
      // },
      // {
      //   name: "Firebase",
      //   color: "green-text-gradient",
      // },
      {
        name: "Android",
        color: "pink-text-gradient",
      },
      {
        name: "IOS",
        color: "green-text-gradient",
      },
      {
        name: "Internal App",
        color: "blue-text-gradient",
      },
      {
        name: "Restricted Access",
        color: "pink-text-gradient",
      },
    ],
    images: [
      RIGTradeINSplash,
      RIGTradeINRequests,
      RIGTradeINArchive,
      RIGTradeINRequestSample,
      RIGTradeINStock,
    ],
    source_code_Link: "https://github.com/odyshbayeh",
  },
  {
    name: "RIG-Automotive",
    description:
      "RIG-Automotive is a Under Development Mobile Application Developed To manage the Automotive Services in RIG-Ramallah Investment Group, It offers a user-friendly interface for users to manage the Automotive Services efficiently. then it provides a seamless experience for Users to monitor their vehicles and services under the supported brands.",
    tags: [
      // {
      //   name: "Flutter",
      //   color: "blue-text-gradient",
      // },
      // {
      //   name: "Firebase",
      //   color: "green-text-gradient",
      // },
      {
        name: "Android",
        color: "pink-text-gradient",
      },
      {
        name: "IOS",
        color: "green-text-gradient",
      },
      {
        name: "Automotive App",
        color: "blue-text-gradient",
      },
      {
        name: "Under Development",
        color: "pink-text-gradient",
      },
    ],
    images: [
      RIGAutosplash,
      RIGAutoCen,
      RIGAutoBrands,
      RIGAutoCharging,
      RIGAutomap,
      RIGAutomore,
      RIGAutoprofile,
      RIGAutorequests,
      RIGAutosettings,
      RIGAuto,
      RIGAutovehinfo,
    ],
    source_code_Link: "https://github.com/odyshbayeh",
  },
  {
    name: "PALEV",
    description:
      "PALEV is a live EV charging mobile application that lets customers across Palestine find charging stations, navigate to them, and start charging sessions from their phone. Users can scan a station QR code, track active sessions, review charge history, save favorite locations, manage subscriptions and payments, and handle account settings—including biometric sign-in—so electric vehicle charging is simple and accessible nationwide.",
    tags: [
      {
        name: "Android",
        color: "pink-text-gradient",
      },
      {
        name: "IOS",
        color: "green-text-gradient",
      },
      {
        name: "EV Charging",
        color: "blue-text-gradient",
      },
      {
        name: "Maps",
        color: "green-text-gradient",
      },
      {
        name: "Live App",
        color: "pink-text-gradient",
      },
    ],
    images: [
      PALEVNavigation,
      PALEVStationProfile,
      PALEVActiveSession,
      PALEVActiveSessions,
      PALEVSessions,
      PALEVFavLocations,
      PALEVSubscriptions,
      PALEVMyAccount,
      PALEVNotifications,
      PALEVSettings,
      PALEVMore,
      PALEVBiometry,
      PALEVSatellite,
      PALEVComingSoon,
    ],
    app_link: "https://palev.ps/app/qr.html",
  },
];

// export { services, technologies, experiences, testimonials, projects };
export { services, technologies, experiences, certificates, projects };
