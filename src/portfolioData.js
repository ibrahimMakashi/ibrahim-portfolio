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
      "I am a Full Stack Software Engineer with 1+ years of experience at Matrix Infotech Solution building scalable web applications with React.js, Node.js, and MongoDB. I specialize in integrating AI-driven features—including RAG pipelines and LLM-based automation—into production CRM and logistics platforms.",
    coreSkills: [
      "React.js",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "LangChain",
      "OpenAI",
      "AWS",
      "RAG / LLMs",
    ],
    video:
      "https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4",
  },
  portfolio: [
    {
      id: 1,
      title: "AI Logistics Route Engine",
      description:
        "RAG-based recommendation engine using LangChain, OpenAI embeddings, and MongoDB Atlas Vector Search to help logistics teams choose optimal providers from historical shipment intelligence.",
      tags: ["LangChain", "OpenAI", "MongoDB Atlas", "RAG"],
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop",
      link: "#",
    },
    {
      id: 2,
      title: "AI-Powered CRM Platform",
      description:
        "Enterprise CRM with AI-generated proposals, automated email workflows, role-based access control, and workflow automation to streamline day-to-day business operations.",
      tags: ["React", "Node.js", "OpenAI", "RBAC"],
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
      link: "#",
    },
    {
      id: 3,
      title: "RAG AI Knowledge Platform",
      description:
        "Retrieval-Augmented Generation pipeline covering PDF ingestion, embeddings, semantic search, and LLM-powered response generation for enterprise knowledge retrieval.",
      tags: ["LangChain", "Embeddings", "LLMs", "Vector Search"],
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
      link: "#",
    },
  ],
  experience: [
    {
      id: 1,
      role: "Full Stack Developer",
      company: "Matrix Infotech Solution",
      period: "June 2025 - Present",
      description:
        "Developing and maintaining full-stack web apps with React.js, TypeScript, Node.js, Express.js, and MongoDB. Building GenAI features with OpenAI, LangChain, and Vector Search, JWT/RBAC auth, payment gateways, WebSocket notifications, and AWS EC2 deployments.",
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
