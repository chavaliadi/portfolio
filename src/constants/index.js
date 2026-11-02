import {
    contact,
    css,
    express,
    git,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    nextjs,
    nodejs,
    react,
    tailwindcss,
    typescript
} from "../assets/icons";

export const skills = [
    {
        imageUrl: react,
        name: "React.js",
        type: "Frontend",
    },
    {
        imageUrl: nextjs,
        name: "Next.js",
        type: "Frontend",
    },
    {
        imageUrl: typescript,
        name: "TypeScript",
        type: "Frontend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    },
    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: express,
        name: "Express.js",
        type: "Backend",
    },
    {
        imageUrl: null, // Custom text fallback
        name: "FastAPI",
        type: "Backend",
    },
    {
        imageUrl: null, // Custom text fallback
        name: "Flask",
        type: "Backend",
    },
    {
        imageUrl: mongodb,
        name: "MongoDB",
        type: "Database",
    },
    {
        imageUrl: null,
        name: "PostgreSQL",
        type: "Database",
    },
    {
        imageUrl: null,
        name: "Supabase",
        type: "Database",
    },
    {
        imageUrl: null,
        name: "Convex",
        type: "Database",
    },
    {
        imageUrl: null,
        name: "Redis",
        type: "Database",
    },
    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: null,
        name: "Docker",
        type: "DevOps",
    },
    {
        imageUrl: null,
        name: "Vercel",
        type: "DevOps",
    },
    {
        imageUrl: null,
        name: "Python",
        type: "Languages",
    },
    {
        imageUrl: null,
        name: "C++",
        type: "Languages",
    },
    {
        imageUrl: null,
        name: "scikit-learn",
        type: "AI & ML",
    },
    {
        imageUrl: null,
        name: "Claude AI",
        type: "AI & ML",
    },
    {
        imageUrl: null,
        name: "Groq (Llama 3)",
        type: "AI & ML",
    }
];

export const experiences = [
    {
        title: "B.Tech Student",
        company_name: "Indian Institute of Information Technology, Allahabad",
        iconType: "education",
        iconBg: "#e0f2fe",
        date: "August 2023 - Present",
        points: [
            "Pursuing B.Tech in Electronics and Communication Engineering.",
            "Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, AI/ML Techniques.",
            "Consistently applying programming methodologies to solve algorithmic challenges and build full-stack utility projects."
        ]
    },
    {
        title: "Software Developer Intern",
        company_name: "Ada Insys Pvt. Ltd.",
        iconType: "work",
        iconBg: "#ffedd5",
        date: "May 2025 - July 2025",
        points: [
            "Quickmark Platform: Led a 3-person team to build a biometric attendance platform with rotating QR codes and facial recognition using Node.js and PostgreSQL.",
            "Attendance Optimization: Cut proxy attendance by 90% by designing time-bound QR validation algorithms and Redis caching.",
            "Timetable Automation: Built a responsive React dashboard for academic scheduling with real-time course/classroom conflict detection.",
            "API Design: Collaborated on REST API contract design, PostgreSQL schema normalization, and Postman testing pipelines."
        ]
    },
    {
        title: "Software Developer Intern",
        company_name: "Velind Virtual Systems Pvt. Ltd.",
        iconType: "work",
        iconBg: "#dcfce7",
        date: "June 2026 - July 2026",
        points: [
            "Integration lead on a five-person team building the Sagarmala 2.0 portal — a project-management system for the Ministry of Ports, Shipping and Waterways, managing the lifecycle of port-led infrastructure projects across India.",
            "Owned the cross-cutting layers while four developers each built a feature module: permission-based RBAC across 12 roles and 23 permissions, the Alembic migration chain, API router registration, and the executive dashboard.",
            "Reviewed and merged all four feature modules into develop; deliberately owned zero feature modules so that architecture, reviews and migrations had a single owner.",
            "Diagnosed and resolved a migration-chain fork where two feature branches independently generated Alembic revisions against the same parent, collapsing it back to a single head without losing either developer's schema changes.",
        ]
    }
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/chavaliadi',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/adithya-chavali-381729310/',
    }
];

export const projects = [
  {
    name: 'Aurelin',
    category: 'Dev Tools',
    description: 'Static code analysis and architecture platform that maps a codebase\'s structure and generates architecture summaries. The LLM is a product feature, not tooling — it explains scan output in plain language rather than just flagging patterns.',
    technologies: ['TypeScript', 'Convex', 'React', 'LLM'],
    link: 'https://github.com/chavaliadi/aurelin',
    liveUrl: 'https://aurelin-chi.vercel.app',
  },
  {
    name: 'GeoMind',
    category: 'ML / Data',
    description: 'Geospatial task orchestration — turns free-text to-dos into location-aware errands, infers category and urgency, finds nearby stores, and computes an optimised driving route. The classifier is trained, not prompted: TF-IDF + logistic regression at 90.2% accuracy and 90.6% macro F1 on a stratified 80/20 split.',
    technologies: ['Express', 'PostGIS', 'FastAPI', 'scikit-learn', 'React', 'Expo', 'OSRM'],
    link: 'https://github.com/chavaliadi/geomind',
    liveUrl: '',
  },
  {
    name: 'KnowledgeHub',
    category: 'ML / Data',
    description: 'AI knowledge base and bookmark manager with hybrid retrieval — vector and keyword results merged by Reciprocal Rank Fusion, reranked by a local ONNX cross-encoder, with streaming RAG chat and citations. Row-Level Security enforced on every table; Gemini 2.5 Flash with automatic Groq failover.',
    technologies: ['Bun', 'Express', 'TypeScript', 'Supabase', 'pgvector', 'React', 'Gemini'],
    link: 'https://github.com/chavaliadi/knowledge-hub',
    liveUrl: '',
  },
  {
    name: 'Watchdog',
    category: 'Infrastructure',
    description: 'Self-hosted endpoint monitoring in Go — HTTP and TCP checks on per-monitor schedulers feeding a bounded worker pool, with jittered exponential backoff, Prometheus metrics, and webhook alerts that fire only on transition into UNHEALTHY. Benchmarked to 500 monitors at ~7.3 MB heap.',
    technologies: ['Go', 'PostgreSQL', 'Prometheus', 'React', 'TypeScript', 'Docker'],
    link: 'https://github.com/chavaliadi/watchdog',
    liveUrl: '',
  },
  {
    name: 'Conquer',
    category: 'Full-stack',
    description: 'AI technical interview simulator with an adaptive scoring engine that reprocesses candidate input live. Deployed and in use.',
    technologies: ['Next.js', 'TypeScript', 'React', 'PostgreSQL', 'LLM'],
    link: 'https://github.com/chavaliadi/conquer',
    liveUrl: 'https://conquer-drab.vercel.app',
  },
  {
    name: 'VectorVault',
    category: 'ML / Data',
    description: 'HNSW approximate nearest-neighbour search implemented from scratch and visualised step by step over real GloVe embeddings. Benchmarked at 1.93 ms vs 26.5 ms brute force with Recall@10 of 0.946, cross-validated against hnswlib as a reference implementation.',
    technologies: ['Python', 'NumPy', 'FastAPI', 'React', 'D3.js'],
    link: 'https://github.com/chavaliadi/vectorvault',
    liveUrl: '',
  },
  {
    name: 'DevLog',
    category: 'Dev Tools',
    description: 'Developer activity intelligence — turns commit history and diffs into daily journals, architectural milestones, and resume-ready bullets. Background processing on BullMQ, AES-256-GCM encryption for stored GitHub tokens, duplicate-commit protection enforced as a schema constraint rather than application string-matching.',
    technologies: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Prisma', 'Redis', 'React'],
    link: 'https://github.com/chavaliadi/devlog',
    liveUrl: '',
  },
  {
    name: 'Conceptra',
    category: 'Full-stack',
    description: 'Adaptive learning system that compiles unstructured syllabi into prerequisite DAGs with cycle detection, then schedules study by topological sort against weekly availability. Spaced repetition runs SuperMemo-2 with an Ebbinghaus retention-decay model; quizzes are confidence-weighted so confidently-wrong answers are penalised hardest. The LLM handles text only — scheduling and mastery tracking are deterministic.',
    technologies: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Redis', 'React', 'TypeScript'],
    link: 'https://github.com/chavaliadi/conceptra',
    liveUrl: '',
  },
  {
    name: 'Benizakura',
    category: 'Research',
    description: 'Research-stage evaluation framework for LLM-powered applications — catches changes that improve one behaviour while silently degrading another. Bidirectional pairwise judging with order-flip detection, paired bootstrap confidence intervals, and a human calibration protocol requiring Cohen\'s κ ≥ 0.60 before any automated judge is trusted. 198 deterministic tests; benchmark frozen, live experiments pending.',
    technologies: ['Python', 'pytest', 'Claude', 'GPT-4o', 'Statistics'],
    link: 'https://github.com/chavaliadi/benizakura',
    liveUrl: '',
  },
  {
    name: 'ResumeIQ',
    category: 'Full-stack',
    description: 'AI resume analyser scoring ATS compatibility, content, structure, tone and skills against a target job posting, with skill-gap detection and a generated interview-prep set. Client-side PDF rendering, no custom backend.',
    technologies: ['React 19', 'TypeScript', 'Tailwind', 'Zustand', 'Claude', 'Docker'],
    link: 'https://github.com/chavaliadi/resumeiq',
    liveUrl: '',
  },
];

export const professionalProjects = [
  {
    name: 'Quickmark Attendance',
    description: 'Full-stack biometric attendance platform utilizing facial recognition and rotating time-bound QR codes to prevent proxies. Handled 1,000+ concurrent student sessions and normalized PostgreSQL schemas.',
    link: '#',
    liveUrl: '',
    isProfessional: true,
    company: 'Ada Insys Pvt. Ltd.',
    role: 'Team Lead & Backend Developer',
    technologies: ['Node.js', 'PostgreSQL', 'Redis', 'REST APIs', 'Postman']
  },
  {
    name: 'Timetable Automation',
    description: 'Responsive academic scheduling dashboard with real-time conflict detection across courses and classrooms. Features REST API endpoints integrated with dynamic calendar grid views.',
    link: '#',
    liveUrl: '',
    isProfessional: true,
    company: 'Ada Insys Pvt. Ltd.',
    role: 'Frontend Developer',
    technologies: ['React.js', 'REST APIs', 'PostgreSQL', 'CSS']
  }
];
