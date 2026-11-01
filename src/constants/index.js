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
        date: "June 2026 - Present",
        points: [
            "Starting a software developer internship to engineer virtualized software solutions and full-stack enterprise services.",
            "Collaborating with system engineering teams to design reliable APIs and modernize responsive frontends.",
            "Participating in agile sprints and code review pipelines to align with secure architectural standards."
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
    // TODO: add live URLs
    {
        theme: 'btn-back-red',
        name: 'GeoMind',
        description: 'Engineered a location-aware smart task reminder platform that triggers notifications based on real-time GPS proximity using Node.js, FastAPI, PostgreSQL, PostGIS, Supabase, and React Native. Integrates an NLP pipeline to auto-categorize tasks.',
        link: 'https://github.com/chavaliadi/geomind',
        liveUrl: '',
        technologies: ['React Native', 'Node.js', 'FastAPI', 'PostgreSQL', 'PostGIS', 'Supabase', 'scikit-learn']
    },
    {
        theme: 'btn-back-green',
        name: 'CodeVitals',
        description: 'Built a full-stack code quality analysis platform with AST-based parsing for JS/TS and pattern scanning for Python, Go, and C++. Includes a Correctness Gate syntax validator, scan history tracking with Convex, and Llama 3 refactoring suggestions.',
        link: 'https://github.com/chavaliadi/codevitals',
        liveUrl: '',
        technologies: ['Next.js', 'TypeScript', 'Convex', 'Clerk', 'Groq API', 'Tailwind CSS']
    },
    {
        theme: 'btn-back-blue',
        name: 'ResumeIQ',
        description: 'Developed an AI-powered resume analyzer integrating Claude 3.5 Sonnet to score ATS compatibility and quality. Builds RPA workflows for skill-gap planning, runs a client-side PDF-to-Image converter, and uses Docker multi-stage builds.',
        link: 'https://github.com/chavaliadi/resumeiq',
        liveUrl: '',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Claude AI', 'Docker']
    },
    {
        theme: 'btn-back-yellow',
        name: 'MovieHub',
        description: 'Engineered a content-based recommendation engine on 1.3M movies using TF-IDF vectorization and cosine similarity. Features a tiered loading system (100K movies in 30s quick-start, background upgrade) and thread-safe Singleton pattern.',
        link: 'https://github.com/chavaliadi/moviehub',
        liveUrl: '',
        technologies: ['React.js', 'Python', 'Flask', 'scikit-learn', 'Docker']
    },
    {
        theme: 'btn-back-orange',
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
        theme: 'btn-back-pink',
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