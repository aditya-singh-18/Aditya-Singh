import { Project, Experience, TechItem, JourneyMilestone } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "unipro",
    title: "UniPro",
    subtitle: "University Project Management Platform",
    description: "A role-based university project management platform that centralizes project workflows, advisor interactions, and evaluations.",
    category: "PRODUCTION SYSTEMS",
    tags: ["RBAC", "JWT", "Spring Boot", "PostgreSQL", "Redis", "Next.js"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
    link: "https://unipro-eight.vercel.app",
    github: "https://github.com/aditya-singh-18/Unipro",
    status: "Production Preparation",
    problem: "Students had difficulty tracking project submissions, mentor meetings, reviews, documentation, and overall progress. The university lacked a centralized system.",
    solution: "Built a role-based university project management platform that centralizes project workflows, advisor interactions, meetings, submissions, evaluations, and documentation.",
    impact: "Designed to become a centralized academic workflow platform for university-wide usage.",
    currentStage: "Production Deployment Preparation",
    teamSize: "3 Engineers",
    techStack: ["Next.js", "Spring Boot", "PostgreSQL", "Redis", "JWT Authentication", "RBAC"],
    highlights: [
      "Secured application workflows using stateless JWT-based Role-Based Access Control (RBAC) to enforce administrative and advisor privileges.",
      "Prevented concurrency lockouts and resolved database bottlenecks via PostgreSQL pessimistic/optimistic locking strategies.",
      "Implemented a high-performance caching layer in Redis, reducing backend database read frequencies by up to 45%."
    ],
    stats: [
      { label: "Status", value: "Prod Prep" },
      { label: "Architecture", value: "REST API + SPA" },
      { label: "Team Size", value: "3 Engineers" },
      { label: "Project Stage", value: "Deployment Prep" }
    ]
  },
  {
    id: "krishiyantra",
    title: "KrishiYantra",
    subtitle: "Blockchain-Powered Farmer Marketplace",
    description: "An agricultural marketplace platform aimed at improving farmer income through direct and transparent trade mechanisms.",
    category: "INNOVATION PROJECTS",
    tags: ["Blockchain", "Marketplace", "Spring Boot", "Agritech"],
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=600&auto=format&fit=crop",
    status: "Summer School Innovation Project",
    problem: "Farmers often struggle to receive fair pricing, timely payments, and transparent trading conditions from intermediaries.",
    solution: "Designed a marketplace platform focused on improving farmer income through direct and transparent agricultural trade mechanisms.",
    impact: "Won First Rank during Summer School Program.",
    currentStage: "Award Winning Prototype",
    teamSize: "First Rank Winner",
    techStack: ["Spring Boot", "Blockchain", "PostgreSQL", "Smart Contracts", "P2P Trades"],
    highlights: [
      "Awarded 🥇 First Rank Winner out of the entire Summer School innovation cohort.",
      "Formulated a trustless merchant and farmer trading protocol using smart execution contracts for crop custody.",
      "Structured lightweight Spring Boot microservices interfacing secure endpoints for relational pricing registries."
    ],
    stats: [
      { label: "Status", value: "🏆 1st Place" },
      { label: "Domain", value: "Fintech / Agritech" },
      { label: "Architecture", value: "Blockchain P2P" },
      { label: "Project Stage", value: "Awarded Prototype" }
    ]
  },
  {
    id: "portfolio",
    title: "Engineering Portfolio",
    subtitle: "Interactive Developer Operating System",
    description: "A personal engineering platform showcasing technical progression, LeetCode stats, technology ecosystem, and products.",
    category: "PERSONAL PRODUCTS",
    tags: ["Portfolio", "Next.js", "TypeScript", "Animation"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
    status: "Production Live",
    problem: "Static markdown portfolios and general CV resumes are dry and struggle to showcase real-time problem-solving statistics and interactive architecture maps.",
    solution: "Created a personal engineering platform showcasing projects, competitive programming progress, technical journey, technology ecosystem, and engineering achievements.",
    impact: "Provides recruiters with complete verification of software credentials, LeetCode ratings, and engineering workflows in under 10 seconds.",
    currentStage: "Core Development - Live",
    teamSize: "1 Engineer",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    highlights: [
      "Integrated dynamic LeetCode performance tracking dashboards displaying live scores and contest rating peaks.",
      "Designed a real-time microservices communication pathway simulator using specialized canvas animation lines.",
      "Engineered an elegant dark-theme modular developer terminal optimized for fast page loads and mobile browsers."
    ],
    stats: [
      { label: "Status", value: "Live Production" },
      { label: "Domain", value: "Developer Tooling" },
      { label: "Architecture", value: "Next.js + Tailwind" },
      { label: "Project Stage", value: "Aesthetic Core" }
    ]
  }
];

export const EXPERIENCES: Experience[] = [];

export const TECH_ITEMS: TechItem[] = [
  // LANGUAGES
  {
    name: "Java",
    level: 95,
    category: "Languages",
    proficiency: "Expert",
    iconName: "Code",
    subtitle: "Primary Backend Language",
    usedIn: ["UniPro"],
    capabilities: ["REST APIs", "OOP", "System Design"],
    levelText: "CORE STACK",
    relatedStack: ["Spring Boot", "PostgreSQL", "Redis", "JWT"]
  },
  {
    name: "TypeScript",
    level: 95,
    category: "Languages",
    proficiency: "Expert",
    iconName: "Code",
    subtitle: "Type-safe Development",
    usedIn: ["UniPro", "Portfolio"],
    capabilities: ["Type Safety", "Scalable Codebase", "Maintainability"],
    levelText: "CORE STACK",
    relatedStack: ["Next.js", "React", "Express.js", "Node.js"]
  },
  {
    name: "JavaScript",
    level: 90,
    category: "Languages",
    proficiency: "Advanced",
    iconName: "Cpu",
    subtitle: "Dynamic Scripting",
    usedIn: ["UniPro", "Portfolio"],
    capabilities: ["ES6+ Syntax", "DOM Manipulation", "Asynchronous Event Loop"],
    levelText: "ADVANCED",
    relatedStack: ["TypeScript", "React", "Node.js"]
  },
  {
    name: "SQL",
    level: 92,
    category: "Languages",
    proficiency: "Expert",
    iconName: "Database",
    subtitle: "Relational Querying",
    usedIn: ["UniPro"],
    capabilities: ["Complex Joins", "Transaction Isolation", "Query Optimization"],
    levelText: "CORE STACK",
    relatedStack: ["PostgreSQL", "Spring Boot", "SQL Server"]
  },
  {
    name: "Python",
    level: 80,
    category: "Languages",
    proficiency: "Intermediate",
    iconName: "Terminal",
    subtitle: "Operational Scripting",
    usedIn: ["Academic Projects"],
    capabilities: ["Automation Scripts", "Data Analysis", "Utility Modules"],
    levelText: "WORKING KNOWLEDGE",
    relatedStack: ["Data Structures", "Algorithms"]
  },

  // FRAMEWORKS & LIBRARIES
  {
    name: "Spring Boot",
    level: 94,
    category: "Frameworks & Libraries",
    proficiency: "Expert",
    iconName: "Sparkles",
    subtitle: "Enterprise Backend Framework",
    usedIn: ["UniPro"],
    capabilities: ["Security", "JWT Authentication", "Microservices"],
    levelText: "CORE STACK",
    relatedStack: ["Java", "PostgreSQL", "Redis", "JWT"]
  },
  {
    name: "React",
    level: 92,
    category: "Frameworks & Libraries",
    proficiency: "Expert",
    iconName: "Sparkles",
    subtitle: "Frontend Library",
    usedIn: ["UniPro", "Portfolio"],
    capabilities: ["Component Architecture", "State Management", "Interactive UI"],
    levelText: "ADVANCED",
    relatedStack: ["TypeScript", "Next.js", "Tailwind CSS"]
  },
  {
    name: "Next.js",
    level: 90,
    category: "Frameworks & Libraries",
    proficiency: "Expert",
    iconName: "Compass",
    subtitle: "Full Stack React Framework",
    usedIn: ["UniPro", "Portfolio"],
    capabilities: ["SSR", "Routing", "Performance Optimization"],
    levelText: "CORE STACK",
    relatedStack: ["React", "TypeScript", "Tailwind CSS"]
  },
  {
    name: "Express.js",
    level: 88,
    category: "Frameworks & Libraries",
    proficiency: "Advanced",
    iconName: "Terminal",
    subtitle: "Lightweight Web Framework",
    usedIn: ["Portfolio"],
    capabilities: ["REST APIs", "Middlewares", "Routing"],
    levelText: "ADVANCED",
    relatedStack: ["Node.js", "JavaScript", "MongoDB"]
  },
  {
    name: "Node.js",
    level: 90,
    category: "Frameworks & Libraries",
    proficiency: "Advanced",
    iconName: "Terminal",
    subtitle: "JavaScript Runtime Environment",
    usedIn: ["UniPro", "Portfolio"],
    capabilities: ["Package Management", "Server Architecture", "File System Operations"],
    levelText: "ADVANCED",
    relatedStack: ["Express.js", "JavaScript", "TypeScript"]
  },
  {
    name: "Tailwind CSS",
    level: 95,
    category: "Frameworks & Libraries",
    proficiency: "Expert",
    iconName: "Layers",
    subtitle: "Utility-First CSS Framework",
    usedIn: ["UniPro", "Portfolio"],
    capabilities: ["Responsive Design", "Custom Theming", "Optimized CSS Builds"],
    levelText: "CORE STACK",
    relatedStack: ["React", "Next.js"]
  },

  // DATABASES & STORAGE
  {
    name: "PostgreSQL",
    level: 92,
    category: "Databases & Storage",
    proficiency: "Expert",
    iconName: "Database",
    subtitle: "Relational Database",
    usedIn: ["UniPro"],
    capabilities: ["Schema Design", "ACID Transactions", "Query Optimization"],
    levelText: "CORE STACK",
    relatedStack: ["Java", "Spring Boot", "SQL"]
  },
  {
    name: "Redis",
    level: 88,
    category: "Databases & Storage",
    proficiency: "Advanced",
    iconName: "Layers",
    subtitle: "Caching Layer",
    usedIn: ["UniPro"],
    capabilities: ["Caching", "Session Storage", "Rate Limiting"],
    levelText: "ADVANCED",
    relatedStack: ["Spring Boot", "PostgreSQL", "Java"]
  },
  {
    name: "MongoDB",
    level: 82,
    category: "Databases & Storage",
    proficiency: "Intermediate",
    iconName: "Database",
    subtitle: "Document-Based Storage",
    usedIn: ["Academic Explorations"],
    capabilities: ["NoSQL Schemas", "CRUD Operations", "Aggregation Queries"],
    levelText: "WORKING KNOWLEDGE",
    relatedStack: ["Node.js", "Express.js"]
  },

  // INFRASTRUCTURE & TOOLS
  {
    name: "Git",
    level: 90,
    category: "Infrastructure & Tools",
    proficiency: "Advanced",
    iconName: "Code",
    subtitle: "Version Control System",
    usedIn: ["UniPro", "Portfolio"],
    capabilities: ["Branch Lifecycle", "Merge Conflicts Resolution", "Rebasing"],
    levelText: "CORE STACK",
    relatedStack: ["GitHub"]
  },
  {
    name: "GitHub",
    level: 92,
    category: "Infrastructure & Tools",
    proficiency: "Advanced",
    iconName: "Compass",
    subtitle: "Collaboration & CI/CD Platform",
    usedIn: ["UniPro", "Portfolio"],
    capabilities: ["Workflow Automation", "Pull Requests Review", "GitHub Pages"],
    levelText: "CORE STACK",
    relatedStack: ["Git"]
  },
  {
    name: "Docker",
    level: 84,
    category: "Infrastructure & Tools",
    proficiency: "Intermediate",
    iconName: "Cpu",
    subtitle: "Containerization Engine",
    usedIn: ["UniPro"],
    capabilities: ["Multi-stage Builds", "Container Management", "Compose Configuration"],
    levelText: "WORKING KNOWLEDGE",
    relatedStack: ["Linux", "Git"]
  },
  {
    name: "Linux",
    level: 82,
    category: "Infrastructure & Tools",
    proficiency: "Intermediate",
    iconName: "Terminal",
    subtitle: "Operating System",
    usedIn: ["UniPro Deployments"],
    capabilities: ["Shell Scripting", "Process Management", "File Permissions"],
    levelText: "WORKING KNOWLEDGE",
    relatedStack: ["Docker", "Terminal Basics"]
  },
  {
    name: "Postman",
    level: 88,
    category: "Infrastructure & Tools",
    proficiency: "Advanced",
    iconName: "Terminal",
    subtitle: "API Testing Client",
    usedIn: ["UniPro API Verification"],
    capabilities: ["Request Testing Checks", "API Collections Documentation", "Auto Auth Mocking"],
    levelText: "WORKING KNOWLEDGE",
    relatedStack: ["Spring Boot", "Express.js", "REST APIs"]
  }
];

export const JOURNEY: JourneyMilestone[] = [
  {
    id: "jm-btech-start",
    year: "2023",
    phase: "Academic",
    title: "Started B.Tech CSE",
    subtitle: "Parul University",
    description: "Began collegiate academic Computer Science career at Parul University. Focused on engineering rigor, structural computer fundamentals, discrete mathematics, and systems theory.",
    type: "education",
    tags: ["B.Tech", "Computer Science", "CSE"],
    achievements: ["Admitted to Parul University Computer Science Program", "Established solid mathematical foundation inside Discrete Structures"],
    metrics: ["Semester I & II core foundations", "Advanced systems and core computing focus"]
  },
  {
    id: "jm-programming-c",
    year: "2023",
    phase: "Basics",
    title: "Started Programming with C",
    subtitle: "Foundations of Computer Systems",
    description: "Mastered fundamental computational structures: loops, compiler phases, low-level memory layout, custom pointers, structs, and memory management using C.",
    type: "coding",
    tags: ["C Language", "Pointers", "Memory Models"],
    achievements: ["Constructed standard file structures", "Compiled functional computer programs with manual memory pointer allocation"],
    metrics: ["100% manually navigated stack/heap", "Dozens of memory safe routines"]
  },
  {
    id: "jm-dsa-start",
    year: "2023",
    phase: "DSA",
    title: "Started DSA",
    subtitle: "Data Structures & Algorithms",
    description: "Committed to deep-dive algorithmic performance research. Formulated custom structures, search trees, sort implementations, complex hash maps, and recursion paradigms.",
    type: "coding",
    tags: ["Data Structures", "Big O Complexity", "DSA Foundations"],
    achievements: ["Designed complex custom sorting and searching benchmarks", "Built dynamic structures with verified runtime optimization guarantees"],
    metrics: ["Optimized search steps with Big-O analysis", "200+ computational problem drafts completed"]
  },
  {
    id: "jm-krishiyantra-gold",
    year: "2025",
    phase: "Award",
    title: "KrishiYantra Summer School Project",
    subtitle: "Gold Rank Achievement",
    description: "Won Gold Rank out of the entire Summer School Innovation Program cohort. Architected a direct-to-farmer crop trade execution interface to secure transaction safety and price visibility.",
    type: "projects",
    tags: ["Blockchain", "Farmer Marketplace", "Spring Boot", "Gold Rank"],
    achievements: ["Secured top position for crop marketplace verification correctness", "Received official Gold Medal recognition certificate for system innovation"],
    metrics: ["Ranked 1st among Summer Program contenders", "Completed multi-stage pitch validation rounds"]
  },
  {
    id: "jm-unipro-init",
    year: "Nov 2025",
    phase: "UniPro",
    title: "Started UniPro",
    subtitle: "University Project Management Platform",
    description: "Initiated development of UniPro institutional workspace. Built Spring Boot backend APIs, stateless JWT verification filters, low latency Redis caching, and transactional PostgreSQL locking modules.",
    type: "projects",
    tags: ["Spring Boot", "Next.js", "PostgreSQL", "JWT Authentication"],
    achievements: ["Integrated enterprise-grade JWT token role claims", "Built high-efficiency Spring transaction controls"],
    metrics: ["Millisecond level auth token verification latency", "Comprehensive database schema setup"]
  },
  {
    id: "jm-engineering-portfolio",
    year: "2026",
    phase: "Portfolio",
    title: "Built Engineering Portfolio",
    subtitle: "Interactive Recruiter Space",
    description: "Engineered personal personal engineering system pulling actual live metrics from GitHub API endpoints, actual Codeforces ratings, and live LeetCode profiles.",
    type: "projects",
    tags: ["React 18", "TypeScript", "Tailwind CSS", "Dynamic APIs"],
    achievements: ["Added responsive system architecture control panel elements", "Built dynamic API metrics synchronization layer"],
    metrics: ["Fully authenticated live dashboard fetches", "Clean type-safe production deployment setup"]
  },
  {
    id: "jm-future-goals",
    year: "Future Goals",
    phase: "Future Goals",
    title: "Strategic Software aspirations",
    subtitle: "Target Milestones",
    description: "Actively training to surpass 1000+ solved challenges on LeetCode, achieve official Codeforces Expert tier verification status, and secure a premier 50+ LPA Backend/Systems Engineering role.",
    type: "goals",
    tags: ["1000+ LeetCode", "Codeforces Expert", "50+ LPA Role"],
    achievements: ["Continuous daily competitive programming schedules", "Mastering distributed state orchestration patterns"],
    metrics: ["Target: 1000+ top platform verified submissions", "Target: Codeforces Expert certificate badge"]
  }
];
