export const portfolioData = {
  hero: {
    greeting: "Hello, I am",
    name: "Ibrahim / \nMakashi",
    subhead: "Building High-Performance Web Experiences.",
    description:
      "I specialize in creating premium, optimized digital experiences with scalable architectures.",
    skills: [
      { id: "01", label: "MERN Stack" },
      { id: "02", label: "Web Apps" },
      { id: "03", label: "UI/UX" },
      { id: "04", label: "Optimization" },
    ],
    socials: [
      {
        name: "GitHub",
        url: "https://github.com/ibrahimMakashi",
        icon: "github",
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/mahammadibrahim-makashi-116b84259",
        icon: "linkedin",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/ibrahim__makashi__/",
        icon: "instagram",
      },
    ],
    framesCount: 144, // Total number of parallax sequence frames
    framePathPrefix: "/frames/frame_", // Assumes frames are named frame_001.webp etc.
    frameExtension: ".webp",
    scrollTexts: [
      {
        start: 0.0,
        end: 0.25,
        align: "left",
        tag: "ABOUT ME",
        title: "HELLO, I AM \nIBRAHIM MAKASHI",
        description:
          "A Creative Web Developer specializing in premium, optimized digital experiences.",
      },
      {
        start: 0.25,
        end: 0.5,
        align: "right",
        tag: "EXPERTISE",
        title: "BUILDING HIGH\nPERFORMANCE",
        description:
          "Seamless digital experiences built with robust, scalable architectures.",
      },
      {
        start: 0.5,
        end: 0.75,
        align: "left",
        tag: "UI / UX",
        title: "BRIDGING\nTHE GAP",
        description:
          "Focusing on the perfect blend of modern design and solid engineering.",
      },
      {
        start: 0.75,
        end: 1.0,
        align: "right",
        tag: "VISION",
        title: "LET'S CREATE\nEXTRAORDINARY",
        description:
          "Looking for a development partner to bring your ideas to life?",
      },
    ],
  },
  about: {
    title: "CRAFTING ADVANCED\nINTELLIGENT SYSTEMS",
    description:
      "I am a Software Web Developer with 1 year of professional experience at Matrix Infotech Solution. I focus on bridging the gap between design and scalable engineering, ensuring every application is not just functional, but a revolutionary experience. Throughout my journey, I have successfully delivered 10+ different projects, integrating bleeding-edge AI to build smarter, faster, and more robust systems.",
    coreSkills: [
      "React.js",
      "Node.js",
      "Express",
      "MongoDB",
      "MERN Stack",
      "Redux",
      "AWS",
      "Agentic AI",
      "AI Technology",
    ],
    video:
      "https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4",
  },
  portfolio: [
    {
      id: 1,
      title: "Matrix CRM",
      description:
        "A high-performance analytics dashboard for financial data visualization.",
      tags: ["React", "Express", "Framer Motion"],
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
      link: "#",
    },
    {
      id: 2,
      title: "Matrix E-Commerce",
      description:
        "Scalable MERN stack e-commerce application with real-time inventory management.",
      tags: ["MongoDB", "Express", "React", "Node.js"],
      image:
        "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop",
      link: "#",
    },
    {
      id: 3,
      title: "Creative Agency Website",
      description:
        "A cinematic interactive corporate presence with advanced scroll animations.",
      tags: ["React", "CSS", "GSAP"],
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
      link: "#",
    },
    {
      id: 4,
      title: "Admin Panel System",
      description:
        "A dark-mode optimized CMS dashboard offering role-based access control.",
      tags: ["React", "Redux", "Node.js"],
      image:
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1000&auto=format&fit=crop",
      link: "#",
    },
  ],
  experience: [
    {
      id: 1,
      role: "Software Web Developer",
      company: "Matrix Infotech Solution",
      period: "June 2025 - present",
      description:
        "Developing robust MERN stack applications, optimizing frontend performance, and leading the integration of modern UI/UX principles.",
    },
    {
      id: 2,
      role: "Full Stack Web Developer",
      company: "Matrix Infotech Solution",
      period: "June 2025 - present",
      description:
        "Built scalable component-driven React applications and collaborated closely with design teams to establish scalable design systems.",
    },
  ],
  contact: {
    title: "Let's Build Something Great",
    email: "ibrahimmakashi5159@gmail.com",
    phone: "+91 9739413691",
  },
  footer: {
    name: "Ibrahim Makashi",
    navLinks: ["About", "Work", "Experience", "Contact"],
    copyright: "© 2026 Ibrahim Makashi. All rights reserved.",
  },
};
