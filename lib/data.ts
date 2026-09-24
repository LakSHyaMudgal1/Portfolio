export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  technologies: string[];
}

export interface Achievement {
  title: string;
  issuer: string;
  date: string;
  badge?: string;
  description?: string;
  featured?: boolean;
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: { name: string; level?: string; icon?: string }[];
}

export const PERSONAL_INFO = {
  name: "Lakshya Mudgal",
  shortName: "Lakshya",
  title: "B.Tech IT Student ('27) • Full-Stack Developer",
  tagline: "Building products, solving problems.",
  bio: "B.Tech IT student at IIIT Una (Class of '27) focused on full-stack development, real-time systems and scalable software.",
  aboutExtended:
    "Engineering with curiosity, building with intent. Working across frontend, backend, mobile and cloud infrastructure with deep appreciation for clean architecture, systems performance, and real-time reliability.",
  status: "Open to software engineering opportunities",
  education: {
    degree: "B.Tech in Information Technology",
    institution: "Indian Institute of Information Technology (IIIT) Una",
    status: "B.Tech IT Student (Class of 2027)",
  },
  socials: {
    github: "https://github.com/LakSHyaMudgal1",
    linkedin: "https://www.linkedin.com/in/lakshya-mudgal-ba149728a/",
    leetcode: "https://leetcode.com/u/luxmdgl1403/",
    codolio: "https://codolio.com/profile/lakshyamudgal",
    email: "lakshyawork14@gmail.com",
  },
  stats: [
    { label: "Problems Solved", value: 1058, suffix: "+" },
    { label: "LeetCode Rating", value: 1910, suffix: "" },
    { label: "Contests Completed", value: 43, suffix: "" },
    { label: "Hackathon Podiums", value: 3, suffix: "+" },
  ],
};

export const EXPERIENCES: Experience[] = [
  {
    company: "INFINITO COMICS",
    role: "Full Stack Development Intern",
    period: "May 2025 – Aug 2025",
    location: "Remote",
    highlights: [
      "Engineered modular RESTful services using Node.js and Express.js for scalable content delivery.",
      "Implemented secure authentication and input validation across micro-endpoints.",
      "Deployed production applications using AWS EC2 and Hostinger with high uptime.",
      "Managed VPS configuration, HTTPS/TLS certificates, and automated server maintenance routines.",
      "Integrated Cloudinary and Amazon S3 for high-throughput, scalable media storage and CDN delivery.",
      "Debugged mission-critical production systems and delivered robust new product functionality.",
    ],
    technologies: ["Node.js", "Express.js", "AWS EC2", "Hostinger", "Cloudinary", "Amazon S3"],
  },
];

export interface Project {
  id: string;
  num: string;
  title: string;
  subtitle?: string;
  category: string;
  type?: string;
  stack: string[];
  description: string;
  highlights: string[];
  metrics?: string;
  awards?: string[];
  githubUrl: string;
  liveUrl?: string;
  capabilities?: string[];
  filterCategories?: ("ALL" | "FULL-STACK" | "SYSTEMS" | "ALGORITHMS")[];
  techCategories?: {
    frontend?: string[];
    backend?: string[];
    extension?: string[];
    core?: string[];
  };
}

export type SecondaryProject = Project;

export const PROJECTS: Project[] = [
  {
    id: "cargoxpress",
    num: "01",
    title: "CARGOXPRESS",
    subtitle: "Intelligent Logistics & Shipment-Merging System",
    category: "Logistics / Full-Stack Platform",
    type: "Logistics / Full-Stack Platform",
    filterCategories: ["FULL-STACK"],
    stack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Bcrypt",
      "REST APIs",
    ],
    description:
      "A logistics management platform for transport companies that manages trucks, shipments and route planning while using shipment-merging logic to improve vehicle capacity utilization.",
    highlights: [
      "Fleet & truck inventory lifecycle management and capacity tracking",
      "Shipment scheduling & geolocational route planning with timeline coordination",
      "Stateless JWT authentication with role-based access control (RBAC)",
      "Intelligent shipment-merging algorithm matching load capacity & route intersections",
      "40% improvement in vehicle capacity utilization verified through test simulations",
    ],
    metrics: "40% improvement in vehicle capacity utilization",
    awards: ["2nd Position — Hack 5.0 (NIT Hamirpur)", "Best Use of GitHub Award"],
    techCategories: {
      frontend: ["React.js", "Tailwind CSS", "Axios"],
      backend: ["Node.js", "Express.js", "MongoDB", "JWT", "Bcrypt", "REST APIs"],
      core: ["Route Clustering", "Shipment Merging Algorithm", "Capacity Optimization"],
    },
    githubUrl: "https://github.com/LakSHyaMudgal1/",
  },
  {
    id: "tabtrack",
    num: "02",
    title: "TABTRACK",
    subtitle: "Real-time Collaborative Workspace & MV3 Extension",
    category: "Collaborative Productivity Platform",
    type: "Collaborative Productivity Platform",
    filterCategories: ["FULL-STACK"],
    stack: [
      "React",
      "Vite",
      "Redux Toolkit",
      "Axios",
      "React Router",
      "Recharts",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Socket.IO",
      "JWT",
      "Bcrypt",
      "Node Cron",
      "Chrome Manifest V3",
    ],
    description:
      "A collaborative productivity environment combining video calling, real-time code editing, chat, screen sharing, collaborative rooms, analytics, browser activity tracking, search, and invitations.",
    highlights: [
      "Collaborative rooms with persistent room state and history",
      "Video calling and live screen sharing support",
      "Real-time synchronized code editor powered by WebSockets",
      "Real-time room chat with persistent message history",
      "Web Activity Time Tracker Chrome Extension (Manifest V3) for automated browsing time tracking",
      "Integrated productivity analytics and timetable functionality",
      "Global search across rooms, invitations, and user profile management",
    ],
    capabilities: [
      "Collaborative Rooms",
      "Video Calling",
      "Real-time Code Editor",
      "Live Chat",
      "Screen Sharing",
      "Persistent History",
      "Web Activity Time Tracker (Manifest V3)",
      "Timetable Functionality",
      "Global Search",
      "Invitations & Profiles",
    ],
    techCategories: {
      frontend: ["React", "Vite", "Redux Toolkit", "Axios", "React Router", "Recharts", "Socket.IO"],
      backend: ["Node.js", "Express.js", "MongoDB", "Mongoose", "Socket.IO", "JWT", "Bcrypt", "Node Cron"],
      extension: ["Chrome Manifest V3"],
    },
    githubUrl: "https://github.com/LakSHyaMudgal1/Project-Phase-VI-main",
  },
  {
    id: "os-scheduler",
    num: "03",
    title: "OS SCHEDULER",
    subtitle: "Visual CPU Scheduling & Algorithm Simulator",
    category: "Operating Systems / CPU Scheduling",
    type: "Operating Systems / CPU Scheduling",
    filterCategories: ["SYSTEMS", "ALGORITHMS"],
    stack: ["React", "Vite", "Tailwind CSS", "JavaScript", "C++17"],
    description:
      "An interactive CPU scheduling simulator that lets users compare scheduling algorithms through animated execution and Gantt charts.",
    highlights: [
      "Simulates FCFS, SJF, and SRTF scheduling algorithms",
      "Preemptive and Non-Preemptive Priority Scheduling models",
      "Animated step-by-step scheduling execution with speed control and playback",
      "Dynamic Gantt chart timeline with live process state highlighting",
      "Real-time computation of waiting time, turnaround time, and completion time",
      "Input validation and core algorithmic implementations in C++",
    ],
    techCategories: {
      frontend: ["React", "Vite", "Tailwind CSS", "JavaScript"],
      core: ["C++17", "CPU Scheduling Algorithms", "Process State Validation"],
    },
    githubUrl: "https://github.com/LakSHyaMudgal1/SCHEDULER",
  },
  {
    id: "tlb-simulator",
    num: "04",
    title: "TLB SIMULATOR",
    subtitle: "Hardware Translation Lookaside Buffer Simulation",
    category: "Computer Architecture / Systems",
    type: "Computer Architecture / Systems",
    filterCategories: ["SYSTEMS", "ALGORITHMS"],
    stack: ["C++17"],
    description:
      "A C++ simulator for Translation Lookaside Buffers, modeling virtual-to-physical address translation, cache hits and misses, associativity and replacement policies.",
    highlights: [
      "Set-associative TLB cache modeling with configurable associativity",
      "Virtual-to-physical address translation decomposition (VPN + Offset calculation)",
      "LRU (Least Recently Used) and FIFO replacement policy implementations",
      "Page table simulation and physical address calculation on TLB miss",
      "Hit/miss telemetry analysis and memory access tracking",
      "High-performance memory management modeling written in C++17",
    ],
    techCategories: {
      core: ["C++17", "Set-Associative Architecture", "Memory Subsystems", "Replacement Policies"],
    },
    githubUrl: "https://github.com/LakSHyaMudgal1/LRU_CACHE",
  },
  {
    id: "chatmate",
    num: "05",
    title: "CHATMATE",
    subtitle: "Real-Time Mobile Application & Persistent Chat Infrastructure",
    category: "Real-Time Mobile Application",
    type: "Mobile / Full-Stack & Real-Time",
    filterCategories: ["FULL-STACK"],
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Node.js",
      "Socket.io",
      "Prisma",
      "PostgreSQL",
    ],
    description:
      "A full-stack real-time mobile chat application built around persistent communication, presence and notifications.",
    highlights: [
      "Secure authentication and persistent device sessions",
      "Low-latency real-time 1-on-1 messaging powered by Socket.io",
      "Live online presence and real-time typing indicators",
      "Push notification integration and friend request management system",
      "Cursor-based message pagination with PostgreSQL indexes",
      "Prisma ORM schema modeling with relational integrity and REST APIs",
    ],
    techCategories: {
      frontend: ["React Native", "Expo", "TypeScript"],
      backend: ["Node.js", "Socket.io", "Prisma", "PostgreSQL", "REST APIs"],
      core: ["Live Presence", "Typing Indicators", "Cursor Pagination", "Push Notifications"],
    },
    githubUrl: "https://github.com/LakSHyaMudgal1/ChatMate",
  },
];

export const SECONDARY_PROJECTS: Project[] = PROJECTS.slice(1);

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "LANGUAGES",
    description: "Core programming languages for algorithmic problem solving and systems.",
    skills: [
      { name: "C++", level: "Advanced" },
      { name: "TypeScript", level: "Proficient" },
      { name: "JavaScript", level: "Proficient" },
      { name: "Python", level: "Intermediate" },
      { name: "SQL", level: "Proficient" },
      { name: "C", level: "Intermediate" },
    ],
  },
  {
    name: "BACKEND",
    description: "Server architecture, distributed communication, and database engineering.",
    skills: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "REST APIs" },
      { name: "Socket.io" },
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Prisma" },
      { name: "JWT" },
    ],
  },
  {
    name: "FRONTEND & MOBILE",
    description: "High-performance reactive interfaces and cross-platform native applications.",
    skills: [
      { name: "React.js" },
      { name: "React Native" },
      { name: "Expo" },
      { name: "React Hooks" },
      { name: "Responsive UI/UX" },
      { name: "Next.js" },
    ],
  },
  {
    name: "CLOUD & TOOLS",
    description: "Deployment infrastructure, storage services, and developer tooling.",
    skills: [
      { name: "AWS" },
      { name: "EC2" },
      { name: "S3" },
      { name: "Vercel" },
      { name: "Git" },
      { name: "GitHub" },
      { name: "Postman" },
    ],
  },
  {
    name: "COMPUTER SCIENCE",
    description: "Foundational computer science principles and algorithmic engineering.",
    skills: [
      { name: "Data Structures & Algorithms" },
      { name: "OOP" },
      { name: "DBMS" },
      { name: "Operating Systems" },
      { name: "Computer Networks" },
      { name: "Debugging & Code Optimization" },
    ],
  },
];

export const PROBLEM_SOLVING_DATA = {
  heading: "Problem solving is part of how I think.",
  totalSolved: 1058,
  activeDays: 610,
  contests: 43,
  rating: 1910,
  badge: "LeetCode Knight",
  contestCount: "35+ contests",
  breakdown: [
    { difficulty: "Easy", count: 340, color: "#10b981", percent: 32 },
    { difficulty: "Medium", count: 585, color: "#f59e0b", percent: 55 },
    { difficulty: "Hard", count: 133, color: "#ef4444", percent: 13 },
  ],
  links: [
    { name: "LeetCode", url: "https://leetcode.com/u/luxmdgl1403/", note: "Knight • 1910 Peak" },
    { name: "Codolio", url: "https://codolio.com/profile/lakshyamudgal", note: "Global Stats" },
    { name: "GitHub", url: "https://github.com/LakSHyaMudgal1", note: "Repositories & Code" },
  ],
};

export const OPEN_SOURCE_CONTRIBUTIONS = [
  {
    project: "Meshery",
    org: "Cloud Native Computing Foundation (CNCF)",
    description:
      "Contributed to CNCF's service mesh management plane, addressing architectural improvements, UI workflows, and service configurations.",
    type: "CNCF Project",
    status: "Merged PRs",
    tag: "CNCF",
  },
  {
    project: "Juspay Open Source",
    org: "Juspay Technologies",
    description:
      "Contributed to high-throughput financial infrastructure repositories and developer ecosystem tooling.",
    type: "Fintech Core Tooling",
    status: "Merged PRs",
    tag: "High-Scale Infra",
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "2nd Position + Best Use of GitHub Award",
    issuer: "Hack 5.0 — NIT Hamirpur",
    date: "April 2025",
    badge: "Hackathon Podium",
    description: "Awarded 2nd position out of top nationwide teams and recognized for exemplary git workflow and open-source practices for CargoXpress.",
    featured: true,
  },
  {
    title: "3rd Position",
    issuer: "Hack The Hills — IIIT Una",
    date: "February 2025",
    badge: "Hackathon Podium",
    description: "Built and deployed a resilient collaborative application under a 36-hour sprint.",
    featured: true,
  },
  {
    title: "2nd Position",
    issuer: "REIMAGINE — IIIT Una",
    date: "February 2025",
    badge: "Design & Engineering",
    description: "Engineered innovative full-stack software prototype focused on high user engagement and performance.",
    featured: false,
  },
  {
    title: "Open Source Contributor",
    issuer: "Meshery (CNCF) + Juspay",
    date: "January 2026",
    badge: "Open Source",
    description: "Merged pull requests across high-scale cloud-native and fintech open-source ecosystems.",
    featured: true,
  },
  {
    title: "LeetCode Knight",
    issuer: "LeetCode Global Ranking",
    date: "Active",
    badge: "1910 Rating",
    description: "Ranked among top competitive programmers worldwide with 35+ rated rounds and 1910 peak rating.",
    featured: true,
  },
  {
    title: "Competitive Programming Discipline",
    issuer: "Algorithmic Foundations",
    date: "Continuous",
    badge: "1058+ Problems",
    description: "610+ active days of deliberate practice solving complex graphs, DP, trees, and system design problems.",
    featured: false,
  },
];

export const LEADERSHIP = [
  {
    role: "Team Lead",
    organization: "EIC, IIIT Una",
    description:
      "Led cross-functional teams for planning and execution of 10+ large-scale technical and institutional events.",
    metric: "10+ Large-Scale Events",
  },
  {
    role: "Executive",
    organization: "EPMOC, IIIT Una",
    description:
      "Coordinated logistics, stage operations, and inter-departmental workflows for events with 100+ active participants.",
    metric: "100+ Participants Coordinated",
  },
];

/* =========================================================================
   TECHNICAL DEPTH DRAWER DATA
   ========================================================================= */
export interface TechDetail {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Systems" | "Cloud" | "Real-time";
  role: string;
  projects: { name: string; id: string; context: string }[];
  keyPatterns: string[];
}

export const TECH_DETAILS: Record<string, TechDetail> = {
  "Node.js": {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    role: "Core runtime for high-throughput REST APIs, WebSocket gateways, and async micro-services.",
    projects: [
      { name: "CargoXpress", id: "cargoxpress", context: "REST endpoints, JWT authentication & route computation" },
      { name: "TabTrack", id: "tabtrack", context: "Room session orchestration, Socket.IO WebSockets & background Cron" },
      { name: "ChatMate", id: "chatmate", context: "Real-time socket gateway, presence handlers & REST services" },
      { name: "Infinito Comics", id: "experience", context: "Production microservices, reverse proxies & media streaming" },
    ],
    keyPatterns: [
      "Event-driven non-blocking I/O loop",
      "Stateless JWT authentication pipelines",
      "WebSocket multiplexing for multi-room state",
      "Modular MVC architecture with Express routing",
    ],
  },
  "React": {
    id: "react",
    name: "React.js / Next.js",
    category: "Frontend",
    role: "Component-driven client architecture with reactive state management and interactive visualizations.",
    projects: [
      { name: "CargoXpress", id: "cargoxpress", context: "Fleet telemetry management and shipment-merging dashboard" },
      { name: "TabTrack", id: "tabtrack", context: "Multi-panel collaborative workspace & browser analytics UI" },
      { name: "OS Scheduler", id: "os-scheduler", context: "Animated CPU Gantt chart execution timeline and speed controls" },
    ],
    keyPatterns: [
      "Optimized reconciliation with memoization & custom hooks",
      "Interactive SVG Gantt timeline modeling",
      "Framer Motion layout transitions",
      "Controlled and debounced user input streams",
    ],
  },
  "Express.js": {
    id: "express",
    name: "Express.js",
    category: "Backend",
    role: "Minimalist web framework for routing, authentication middleware, and input sanitization.",
    projects: [
      { name: "CargoXpress", id: "cargoxpress", context: "Role-based access control, payload validation & route handlers" },
      { name: "TabTrack", id: "tabtrack", context: "Room invitations, session authorization & user profile endpoints" },
      { name: "Infinito Comics", id: "experience", context: "Secure REST APIs deployed to cloud VPS" },
    ],
    keyPatterns: [
      "Cascading middleware security chains",
      "Bcrypt hash verification & JWT token validation",
      "Centralized error handling and status code mapping",
    ],
  },
  "MongoDB": {
    id: "mongodb",
    name: "MongoDB / Mongoose",
    category: "Database",
    role: "NoSQL document persistence with schema enforcement and geospatial coordinate indexing.",
    projects: [
      { name: "CargoXpress", id: "cargoxpress", context: "Truck capacity, shipment payloads & waypoint coordinates" },
      { name: "TabTrack", id: "tabtrack", context: "Persistent collaborative room sessions, message feeds & user profiles" },
    ],
    keyPatterns: [
      "Document embedding for high-read performance",
      "Compound indexing on room IDs & timestamp sequences",
      "Mongoose schema validation and relational references",
    ],
  },
  "Socket.IO": {
    id: "socketio",
    name: "Socket.IO",
    category: "Real-time",
    role: "Bi-directional, low-latency WebSocket communication engine with automatic fallback.",
    projects: [
      { name: "TabTrack", id: "tabtrack", context: "Multiplayer live code editor buffer sync, video signaling & live chat" },
      { name: "ChatMate", id: "chatmate", context: "1-on-1 mobile messaging, live user presence & typing indicators" },
    ],
    keyPatterns: [
      "Room-based pub/sub broadcasting",
      "Optimistic delta event synchronization",
      "Automatic reconnect with persistent event queues",
      "Presence tracking and peer handshake protocols",
    ],
  },
  "PostgreSQL": {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Database",
    role: "Relational ACID-compliant database for persistent user records, conversation threads and indexed messages.",
    projects: [
      { name: "ChatMate", id: "chatmate", context: "User profiles, friendship graphs, and cursor-paginated chat messages" },
    ],
    keyPatterns: [
      "ACID transactions for message integrity",
      "B-Tree indexes on timestamp & conversation IDs",
      "Relational foreign key constraints with cascade rules",
    ],
  },
  "Prisma": {
    id: "prisma",
    name: "Prisma ORM",
    category: "Database",
    role: "Type-safe database ORM and query builder providing auto-generated TypeScript clients and schema migrations.",
    projects: [
      { name: "ChatMate", id: "chatmate", context: "Data modeling, schema migrations, and optimized relation queries" },
    ],
    keyPatterns: [
      "Declarative schema definition & auto-migrations",
      "Compile-time type safety for database payloads",
      "Optimized relation queries with select/include projections",
    ],
  },
  "React Native / Expo": {
    id: "reactnative",
    name: "React Native & Expo",
    category: "Frontend",
    role: "Cross-platform mobile development framework delivering native performance with TypeScript and reactive state.",
    projects: [
      { name: "ChatMate", id: "chatmate", context: "iOS/Android mobile client with native animations, presence & push notifications" },
    ],
    keyPatterns: [
      "Cross-platform native components with Expo Go toolchain",
      "Asynchronous storage for persistent offline sessions",
      "Optimistic UI updates for instant chat responsiveness",
    ],
  },
  "C++17": {
    id: "cpp17",
    name: "C++17",
    category: "Systems",
    role: "High-performance systems programming, hardware memory simulation, and competitive algorithm engineering.",
    projects: [
      { name: "OS Scheduler", id: "os-scheduler", context: "Core CPU scheduling algorithms: FCFS, SJF, SRTF, Priority" },
      { name: "TLB Simulator", id: "tlb-simulator", context: "Set-associative hardware TLB, LRU/FIFO replacement policies" },
      { name: "LeetCode & Competitive Programming", id: "problem-solving", context: "1058+ problems solved, Knight 1910 rating" },
    ],
    keyPatterns: [
      "Zero-overhead hardware modeling abstractions",
      "Cache line alignment and bitwise address masking",
      "Strict time/memory complexity optimization (O(1) lookups)",
      "Standard Template Library (STL) algorithms & data structures",
    ],
  },
  "Chrome Manifest V3": {
    id: "chromemv3",
    name: "Chrome Manifest V3",
    category: "Frontend",
    role: "Modern browser extension architecture with background service workers and declarative telemetry APIs.",
    projects: [
      { name: "TabTrack", id: "tabtrack", context: "Web Activity Time Tracker extension for automatic browsing telemetry" },
    ],
    keyPatterns: [
      "Ephemeral service worker lifecycle management",
      "Active tab domain detection and elapsed duration timers",
      "Secure storage APIs and asynchronous backend sync",
    ],
  },
  "AWS EC2 / S3": {
    id: "aws",
    name: "AWS EC2 & S3",
    category: "Cloud",
    role: "Production cloud virtual server deployment, reverse proxy setup, and scalable object storage.",
    projects: [
      { name: "Infinito Comics", id: "experience", context: "Production hosting, HTTPS TLS automation, S3 CDN asset delivery" },
    ],
    keyPatterns: [
      "VPS environment hardening & systemd process monitoring",
      "SSL/TLS reverse proxy configurations",
      "High-throughput CDN media delivery with presigned S3 URLs",
    ],
  },
  "TypeScript": {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend",
    role: "Strict type safety, end-to-end interface contracts, and resilient software design.",
    projects: [
      { name: "Portfolio Website", id: "projects", context: "Full static typing, custom interfaces & accessible components" },
      { name: "Full-Stack APIs", id: "experience", context: "Request/response contracts and data validation models" },
    ],
    keyPatterns: [
      "Discriminated unions for UI mode switching",
      "Generic data wrappers and strict null safety",
      "Component prop contract enforcement",
    ],
  },
};

/* =========================================================================
   PROJECT STORY MODE DATA (CargoXpress & TabTrack)
   ========================================================================= */
export interface StoryStep {
  step: string;
  tag: string;
  title: string;
  summary: string;
  bullets: string[];
}

export const PROJECT_STORIES: Record<string, { title: string; subtitle: string; steps: StoryStep[] }> = {
  cargoxpress: {
    title: "CARGOXpress Case Study",
    subtitle: "How shipment-merging algorithms improved vehicle capacity utilization by 40%.",
    steps: [
      {
        step: "01",
        tag: "THE PROBLEM",
        title: "Underutilized freight runs and empty transit miles",
        summary: "Logistics fleets regularly operate with trucks running at 40-50% capacity volume, wasting fuel, toll expenditure, and highway bandwidth on redundant routes.",
        bullets: [
          "Fragmented orders dispatched separately across identical transport corridors",
          "Lack of automated capacity matching between regional depots",
          "High fuel expenditure and increased highway fleet carbon footprint",
        ],
      },
      {
        step: "02",
        tag: "THE IDEA",
        title: "Dynamic shipment-merging based on route overlap",
        summary: "Evaluate scheduled freight dispatches across geographic corridors to merge compatible shipments sharing origin, destination, or waypoint schedules.",
        bullets: [
          "Scan active shipment queues for geographic route coincidence",
          "Aggregate volume and payload weights within truck capacity constraints",
          "Consolidate multiple partial trucks into a single high-utilization vehicle",
        ],
      },
      {
        step: "03",
        tag: "ARCHITECTURE",
        title: "React frontend with Express REST and MongoDB coordinates",
        summary: "A modular full-stack architecture coordinating transport operators, truck inventories, and shipment routing through a clean API layer.",
        bullets: [
          "React.js dashboard for real-time fleet inventory and route visualizer",
          "Node.js & Express.js REST API handling dispatch validation and calculations",
          "MongoDB document persistence storing waypoint coordinates and schedules",
        ],
      },
      {
        step: "04",
        tag: "IMPLEMENTATION",
        title: "Load-matching algorithms with capacity knapsack logic",
        summary: "The engine cross-checks shipment time windows, parcel dimensions, and route waypoints to propose optimal merged vehicle itineraries.",
        bullets: [
          "Route coordinate clustering with intersection detection",
          "Capacity constraint verification to prevent truck overloading",
          "Automated waypoint itinerary generation for single-truck multi-drop runs",
        ],
      },
      {
        step: "05",
        tag: "ENGINEERING CHALLENGES",
        title: "Security, RBAC, and time-window edge cases",
        summary: "Ensured multiple transport operators could coordinate safely without exposing sensitive client billing or unauthorized fleet controls.",
        bullets: [
          "Stateless JWT authentication with role-based access control (RBAC)",
          "Bcrypt credential hashing and protected endpoint middleware",
          "Graceful fallbacks when shipment time windows do not permit merging",
        ],
      },
      {
        step: "06",
        tag: "RESULT",
        title: "+40% capacity utilization boost & Hack 5.0 victory",
        summary: "Test simulations verified a 40% improvement in vehicle volume utilization. The project earned 2nd Position at Hack 5.0 and the Best Use of GitHub Award.",
        bullets: [
          "40% documented improvement in vehicle capacity utilization",
          "2nd Position — Hack 5.0 (NIT Hamirpur)",
          "Best Use of GitHub Award for clean Git hygiene and architecture",
        ],
      },
    ],
  },
  tabtrack: {
    title: "TABTRACK Case Study",
    subtitle: "Uniting video calling, synchronized code editing, chat, and browser activity telemetry.",
    steps: [
      {
        step: "01",
        tag: "THE PROBLEM",
        title: "Fragmented tools and context loss in collaborative work",
        summary: "Remote engineering pairs shuffle between separate tools for video calls, code editors, chat, and productivity tracking, causing friction and distraction.",
        bullets: [
          "Context switching between standalone IDEs and meeting tools",
          "No persistent record of code iterations linked with meeting discussions",
          "Lack of automated awareness of web research time vs productive coding",
        ],
      },
      {
        step: "02",
        tag: "THE IDEA",
        title: "An all-in-one collaborative room with companion MV3 extension",
        summary: "Combine real-time video, synchronized code editing, and chat in one workspace, paired with a Manifest V3 browser extension for productivity analytics.",
        bullets: [
          "Persistent rooms where code and chat history remain preserved",
          "Instant WebRTC video streams and live screen sharing",
          "Web Activity Time Tracker extension feeding browsing insights into analytics",
        ],
      },
      {
        step: "03",
        tag: "ARCHITECTURE",
        title: "React client, WebSockets gateway, and background worker",
        summary: "Bi-directional event streaming using Socket.IO, backed by Express services, MongoDB persistence, and an ephemeral Chrome extension service worker.",
        bullets: [
          "React + Vite client with Redux Toolkit for snappy workspace state",
          "Socket.IO WebSocket layer multiplexing code changes and live chat events",
          "Chrome Manifest V3 background service worker capturing web activity telemetry",
        ],
      },
      {
        step: "04",
        tag: "IMPLEMENTATION",
        title: "Real-time buffer delta synchronization and presence",
        summary: "Engineered code broadcast protocols where user edits emit delta payloads that update all peer editor canvases without race conditions.",
        bullets: [
          "Socket event emissions (`code:stream`, `chat:message`, `peer:status`)",
          "Room session state management with unique room ID lookups",
          "Timetable scheduling and global room search functionality",
        ],
      },
      {
        step: "05",
        tag: "ENGINEERING CHALLENGES",
        title: "Disconnection recovery and extension battery efficiency",
        summary: "Addressed transient network drops and ensured the Chrome extension operates with minimal CPU overhead.",
        bullets: [
          "Automatic reconnect handshakes preserving active editor buffers",
          "Manifest V3 alarm and storage APIs to minimize background power drain",
          "Debounced analytics payloads synced to backend dashboard",
        ],
      },
      {
        step: "06",
        tag: "RESULT",
        title: "Unified collaborative platform with verified telemetry",
        summary: "Delivered a fully integrated workspace uniting video calling, code synchronization, chat, and browser productivity insights in one environment.",
        bullets: [
          "Complete collaborative rooms with persistent chat history",
          "Real-time synchronized live code editor buffer",
          "Manifest V3 Web Activity Time Tracker actively capturing browsing trends",
        ],
      },
    ],
  },
};

/* =========================================================================
   ARCHITECTURE REPLAY TRACES
   ========================================================================= */
export interface ReplayStep {
  stepNumber: number;
  source: string;
  target: string;
  label: string;
  protocol: string;
  description: string;
}

export const ARCHITECTURE_REPLAYS: Record<string, { title: string; steps: ReplayStep[] }> = {
  cargoxpress: {
    title: "CargoXpress: Shipment-Merging Request Lifecycle",
    steps: [
      {
        stepNumber: 1,
        source: "Client Browser",
        target: "API Gateway (Express)",
        label: "POST /api/shipments/merge",
        protocol: "HTTP/2 HTTPS",
        description: "Transport operator submits candidate shipment manifests and dispatch time windows.",
      },
      {
        stepNumber: 2,
        source: "API Gateway",
        target: "Auth Middleware",
        label: "JWT Bearer Token Verify",
        protocol: "Internal Middleware",
        description: "Validates operator identity, tenant permissions, and role-based access control (RBAC).",
      },
      {
        stepNumber: 3,
        source: "Auth Middleware",
        target: "Merging Engine",
        label: "Invoke Route Clustering",
        protocol: "Algorithmic Service",
        description: "Matches delivery coordinates and checks truck volume/weight capacity constraints.",
      },
      {
        stepNumber: 4,
        source: "Merging Engine",
        target: "MongoDB Cluster",
        label: "Query Fleet & Waypoint Index",
        protocol: "MongoDB Wire Protocol",
        description: "Fetches regional truck availability and records consolidated vehicle assignment.",
      },
      {
        stepNumber: 5,
        source: "MongoDB Cluster",
        target: "Response Pipeline",
        label: "Return Merged Plan (+40% Load)",
        protocol: "JSON Payload",
        description: "Calculates consolidated truck load factor (85%) and eliminates redundant dispatch run.",
      },
      {
        stepNumber: 6,
        source: "Response Pipeline",
        target: "Client Browser",
        label: "200 OK — Render Itinerary",
        protocol: "HTTPS Response",
        description: "React dashboard updates with single-truck consolidated dispatch and cost savings.",
      },
    ],
  },
  tabtrack: {
    title: "TabTrack: Real-Time Collaborative Event Flow",
    steps: [
      {
        stepNumber: 1,
        source: "Peer A Editor",
        target: "Socket.IO Client",
        label: "Keystroke / Code Delta",
        protocol: "React State Event",
        description: "User types in collaborative editor; delta buffer debounces character stream.",
      },
      {
        stepNumber: 2,
        source: "Socket.IO Client",
        target: "Node.js WebSocket Server",
        label: "emit('code:stream', delta)",
        protocol: "WSS (Secure WebSocket)",
        description: "Dispatches serialized code mutation along with room ID and participant token.",
      },
      {
        stepNumber: 3,
        source: "WebSocket Server",
        target: "Room Session Manager",
        label: "Verify Room Membership",
        protocol: "In-Memory Store",
        description: "Confirms Peer A has write permissions in the active #engineering-sync room.",
      },
      {
        stepNumber: 4,
        source: "Room Session Manager",
        target: "Connected Room Peers",
        label: "broadcast.to(room).emit()",
        protocol: "WebSocket Broadcast",
        description: "Simultaneously updates editor canvas across all connected peers with remote cursor.",
      },
      {
        stepNumber: 5,
        source: "Room Session Manager",
        target: "MongoDB Persistence",
        label: "Auto-save Room Snapshot",
        protocol: "Async Background Write",
        description: "Persists room state and chat history so disconnected peers can restore upon return.",
      },
    ],
  },
  "os-scheduler": {
    title: "OS Scheduler: CPU Scheduling & Context Switch Flow",
    steps: [
      {
        stepNumber: 1,
        source: "Process Generator",
        target: "Ready Queue",
        label: "Enqueue Process (P1..P4)",
        protocol: "Input Validation",
        description: "Validates arrival times, burst requirements, and process priority integers.",
      },
      {
        stepNumber: 2,
        source: "Ready Queue",
        target: "Scheduler Engine (C++17)",
        label: "Evaluate Priority / Shortest Job",
        protocol: "Algorithm Execution",
        description: "Algorithm (FCFS, SJF, SRTF, Priority) selects highest-ranking task to dispatch.",
      },
      {
        stepNumber: 3,
        source: "Scheduler Engine",
        target: "CPU Simulator Core",
        label: "Context Switch & Dispatch",
        protocol: "State Machine",
        description: "Saves prior process state and assigns CPU time slice to chosen process.",
      },
      {
        stepNumber: 4,
        source: "CPU Simulator Core",
        target: "Telemetry Analyzer",
        label: "Compute WT, TAT, Completion",
        protocol: "Metrics Pipeline",
        description: "Calculates Waiting Time (WT) and Turnaround Time (TAT) per process step.",
      },
      {
        stepNumber: 5,
        source: "Telemetry Analyzer",
        target: "Gantt Chart View",
        label: "Render Timeline Animation",
        protocol: "React Virtual DOM",
        description: "Advances Gantt execution bar with playback controls (1.0x, Step-by-Step).",
      },
    ],
  },
  "tlb-simulator": {
    title: "TLB Simulator: Virtual-to-Physical Translation Flow",
    steps: [
      {
        stepNumber: 1,
        source: "CPU Core",
        target: "Address Splitter",
        label: "Virtual Address: 0x7FFF8A4C",
        protocol: "Memory Access",
        description: "CPU generates 32-bit virtual memory address for read/write instruction.",
      },
      {
        stepNumber: 2,
        source: "Address Splitter",
        target: "TLB Tag Matcher",
        label: "VPN: 0x7FFF8 + Offset: 0xA4C",
        protocol: "Bitwise Masking",
        description: "Splits address into Virtual Page Number (VPN) and 4KB page offset.",
      },
      {
        stepNumber: 3,
        source: "TLB Tag Matcher",
        target: "Set-Associative Cache",
        label: "Index Set #0 Lookup",
        protocol: "Hardware Fast-Path",
        description: "Checks set-associative cache tags for matching VPN entry.",
      },
      {
        stepNumber: 4,
        source: "Set-Associative Cache",
        target: "Policy Manager (LRU/FIFO)",
        label: "TLB HIT! Frame: 0x1A4",
        protocol: "Cache Hit Flow",
        description: "Hits fast-path; updates LRU/FIFO recency state for Set #0 Entry.",
      },
      {
        stepNumber: 5,
        source: "Policy Manager",
        target: "Physical Memory Bus",
        label: "Physical Address: 0x1A4A4C",
        protocol: "Frame + Offset Combine",
        description: "Combines Frame Number with original Offset; increments Hit Counter (892).",
      },
    ],
  },
  "chatmate": {
    title: "ChatMate: Real-Time Mobile Messaging & Presence Flow",
    steps: [
      {
        stepNumber: 1,
        source: "Mobile Client (Expo)",
        target: "Socket.IO Client Layer",
        label: "emit('message:send', payload)",
        protocol: "React Native State",
        description: "User submits message; optimistic UI immediately appends bubble with sending clock icon.",
      },
      {
        stepNumber: 2,
        source: "Socket.IO Client",
        target: "Node.js Real-time Gateway",
        label: "WebSocket Frame (Token + Content)",
        protocol: "WSS Secure Socket",
        description: "Validates active JWT session token and ensures sender belongs to conversation room.",
      },
      {
        stepNumber: 3,
        source: "Node.js Gateway",
        target: "PostgreSQL via Prisma",
        label: "prisma.message.create()",
        protocol: "ACID Database Transaction",
        description: "Persists message record with monotonic cursor timestamp and relational user IDs.",
      },
      {
        stepNumber: 4,
        source: "Node.js Gateway",
        target: "Live Presence & Push Worker",
        label: "Check Recipient Socket ID",
        protocol: "In-Memory Session Map",
        description: "If recipient socket is connected, routes live packet; otherwise triggers Expo Push Notification.",
      },
      {
        stepNumber: 5,
        source: "Live Presence Worker",
        target: "Recipient Mobile Device",
        label: "broadcast.to(peer).emit('message:new')",
        protocol: "Live Delivery & Read Receipt",
        description: "Delivers message in sub-40ms, clears typing indicator, and returns double-check delivery confirmation.",
      },
    ],
  },
};

/* =========================================================================
   PROJECT COMPARISON MATRIX DATA
   ========================================================================= */
export interface ProjectComparisonItem {
  id: string;
  name: string;
  domain: string;
  frontend: string;
  backend: string;
  persistence: string;
  architecture: string;
  security: string;
  realtime: string;
  algorithms: string;
  documentedResult: string;
}

export const PROJECT_COMPARISONS: Record<string, ProjectComparisonItem> = {
  cargoxpress: {
    id: "cargoxpress",
    name: "CARGOXpress",
    domain: "Logistics & Freight Route Optimization",
    frontend: "React.js, Tailwind CSS, Interactive Maps",
    backend: "Node.js, Express.js REST API Layer",
    persistence: "MongoDB, Waypoint Schemas, Indexes",
    architecture: "Multi-tenant REST Services with Route Engine",
    security: "JWT Authentication, Bcrypt Hashing, RBAC",
    realtime: "On-demand route consolidation calculation",
    algorithms: "Route corridor clustering, Capacity knapsack logic",
    documentedResult: "40% improvement in vehicle capacity utilization",
  },
  tabtrack: {
    id: "tabtrack",
    name: "TABTRACK",
    domain: "Collaborative Productivity Platform",
    frontend: "React, Vite, Redux Toolkit, Recharts",
    backend: "Node.js, Express.js, Socket.IO Gateway",
    persistence: "MongoDB, Persistent Chat & Room Records",
    architecture: "WebSocket Event Multiplexing + Chrome MV3",
    security: "JWT Authentication, Room Authorization Tokens",
    realtime: "WebSockets (Code buffer, chat, presence, video stream)",
    algorithms: "Text delta broadcast, Browsing telemetry timers",
    documentedResult: "All-in-one collaborative workspace & MV3 tracking",
  },
  "os-scheduler": {
    id: "os-scheduler",
    name: "OS SCHEDULER",
    domain: "Operating Systems / CPU Simulation",
    frontend: "React, Vite, Tailwind CSS, Gantt SVG",
    backend: "C++17 Algorithmic Simulation Core",
    persistence: "In-memory Process Queue State",
    architecture: "State Machine Simulation with Timeline Playback",
    security: "Local execution with strict process validation",
    realtime: "Step-by-step interactive timeline clock",
    algorithms: "FCFS, SJF, SRTF, Preemptive & Non-Preemptive Priority",
    documentedResult: "Real-time WT, TAT, and CT visual computation",
  },
  "tlb-simulator": {
    id: "tlb-simulator",
    name: "TLB SIMULATOR",
    domain: "Computer Architecture / Hardware Memory",
    frontend: "React Hardware Pipeline Diagram",
    backend: "C++17 Set-Associative Engine",
    persistence: "Hardware Cache Line Bit Array",
    architecture: "Pipelined Virtual-to-Physical Address Decomposition",
    security: "Direct hardware memory bounds simulation",
    realtime: "Clock-cycle simulated memory bus lookups",
    algorithms: "LRU (Least Recently Used) & FIFO Cache Eviction",
    documentedResult: "Accurate Hit/Miss telemetry & address translation",
  },
  chatmate: {
    id: "chatmate",
    name: "CHATMATE",
    domain: "Real-Time Mobile Communication",
    frontend: "React Native, Expo Go, TypeScript",
    backend: "Node.js, Express.js, Socket.io Gateway",
    persistence: "PostgreSQL, Prisma ORM, Indexed Timestamps",
    architecture: "Mobile Client + Socket.IO Gateway + Relational DB",
    security: "JWT Authentication, Device Session Tokens",
    realtime: "Socket.io (1-on-1 Chat, Live Presence, Typing State)",
    algorithms: "Cursor-based pagination, Notification throttling",
    documentedResult: "Persistent real-time mobile messaging & presence sync",
  },
};

/* =========================================================================
   "NOW" / CURRENT STATUS DATA
   ========================================================================= */
export const NOW_STATUS = {
  building: {
    title: "High-Throughput Collaborative Workspaces",
    detail: "Iterating on WebSockets, real-time data sync algorithms, and browser productivity tools.",
  },
  exploring: {
    title: "Systems Performance & Memory Simulators",
    detail: "Deepening benchmarks on hardware Translation Lookaside Buffers, cache replacement, and OS kernel scheduling.",
  },
  preparing: {
    title: "Software Engineering Opportunities (2027 Grad)",
    detail: "B.Tech IT student at IIIT Una (Class of '27) available for Software Engineering & Full-Stack roles.",
  },
  location: "IIIT Una, Himachal Pradesh, India • Open to Relocation & Remote",
};
