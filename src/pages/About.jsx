import React from "react";
import { CTA, Card } from "../components";
import { experiences, skills } from "../constants";

// Custom inline SVG icons for skills that don't have static icon files
const customIcons = {
  "FastAPI": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L3 9V22L12 17L21 22V9L12 2Z" fill="#009688" />
      <path d="M12 6L7 11H10V16H14V11H17L12 6Z" fill="white" />
    </svg>
  ),
  "Flask": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M19 6C19 4.34 17.66 3 16 3H8C6.34 3 5 4.34 5 6V8C5 9.38 5.94 10.54 7.22 10.87L9 15V20C9 20.55 9.45 21 10 21H14C14.55 21 15 20.55 15 20V15L16.78 10.87C18.06 10.54 19 9.38 19 8V6ZM7 6C7 5.45 7.45 5 8 5H16C16.55 5 17 5.45 17 6V7H7V6ZM13 15.5V19H11V15.5L9.22 11H14.78L13 15.5Z" fill="#94a3b8" />
    </svg>
  ),
  "PostgreSQL": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="#38bdf8" />
    </svg>
  ),
  "Supabase": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.4 2L4 12.6h7.5L9.6 22L19 11.4h-7.5L13.4 2z" fill="#3ECF8E" />
    </svg>
  ),
  "Convex": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="4" fill="#F05A28" />
      <path d="M7 12L12 7L17 12L12 17L7 12Z" fill="white" />
    </svg>
  ),
  "Redis": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#D82C20" />
      <path d="M2 12L12 17L22 12M2 17L12 22L22 17" stroke="#D82C20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "Docker": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 10.5C2 7.5 5.5 7 7.5 7C9.5 7 10 8.5 11 8.5C12 8.5 12.5 7.5 14.5 7.5C16.5 7.5 22 8 22 11.5C22 15.5 16.5 16.5 14.5 16.5H5.5C3.5 16.5 2 14.5 2 10.5Z" fill="#0db7ed" />
      <rect x="6" y="9.5" width="2" height="2" fill="white" />
      <rect x="9" y="9.5" width="2" height="2" fill="white" />
      <rect x="12" y="9.5" width="2" height="2" fill="white" />
    </svg>
  ),
  "Vercel": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L24 22H0L12 2Z" />
    </svg>
  ),
  "Python": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C8.75 2 7.75 3 7.75 5.75V7.75H12V9H6.75C4 9 3 10 3 13.25C3 16.5 4 17.5 6.75 17.5H7.75V19.25C7.75 21.25 8.75 22 12 22C15.25 22 16.25 21 16.25 18.25V16.25H12V15H17.25C20 15 21 14 21 10.75C21 7.5 20 6.5 17.25 6.5H16.25V4.75C16.25 2.75 15.25 2 12 2ZM10.5 5C10.5 4.45 10.05 4 9.5 4C8.95 4 8.5 4.45 8.5 5C8.5 5.55 8.95 6 9.5 6C10.05 6 10.5 5.55 10.5 5ZM15.5 19C15.5 18.45 15.05 18 14.5 18C13.95 18 13.5 18.45 13.5 19C13.5 19.55 13.95 20 14.5 20C15.05 20 15.5 19.55 15.5 19Z" fill="#38bdf8" />
    </svg>
  ),
  "C++": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#00599C" />
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">C++</text>
    </svg>
  ),
  "scikit-learn": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="7" cy="12" rx="5" ry="3.5" fill="#F7931E" opacity="0.85" />
      <ellipse cx="17" cy="12" rx="5" ry="3.5" fill="#38bdf8" opacity="0.85" />
    </svg>
  ),
  "Claude AI": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM15.5 15L14 13.5L12.5 15L11 13.5L9.5 15V9L15.5 9V15Z" fill="#D97706" />
    </svg>
  ),
  "Groq (Llama 3)": (
    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="4" fill="#6366F1" />
      <circle cx="12" cy="12" r="5" fill="white" />
      <circle cx="12" cy="12" r="2" fill="#6366F1" />
    </svg>
  )
};

const SKILL_CATEGORIES = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "AI & ML",
  "Languages",
  "Version Control",
];

const About = () => {
  return (
    <section className='max-w-content mx-auto sm:px-12 px-5 pt-28 sm:pt-32 pb-24 text-text-primary min-h-screen'>
      {/* 5a. Intro with constrained measure (~65ch) & 5d. Resume CTA */}
      <div className='max-w-[65ch]'>
        <h1 className='text-3xl sm:text-display font-poppins font-bold text-text-primary tracking-tight'>
          Hello, I'm{" "}
          <span className='text-accent-primary'>
            Adithya Chavali
          </span>{" "}
          👋
        </h1>

        <p className='mt-6 text-body text-text-secondary leading-relaxed'>
          US citizen based in Atlanta, Georgia, finishing a B.Tech at IIIT Allahabad (graduating 2027).
          I specialize in building robust full-stack applications, designing secure APIs, 
          and implementing machine learning pipelines. Genuinely curious about complex system 
          architectures and automation.
        </p>

        {/* 5d. Resume CTA button */}
        <div className='mt-8'>
          <a
            href='/resume.pdf'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-surface-base font-semibold hover:bg-accent-primary/90 transition-all text-sm shadow-sm'
          >
            Resume
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2.5'
              stroke='currentColor'
              className='w-4 h-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25'
              />
            </svg>
          </a>
        </div>
      </div>

      {/* 5b. Grouped Skills */}
      <div className='mt-24'>
        <div className='border-t border-surface-border pt-12 mb-10'>
          <h2 className='text-h2 font-poppins font-semibold text-text-primary'>
            Technical Skills
          </h2>
          <p className='mt-2 text-body text-text-secondary'>
            Grouped by architectural domain.
          </p>
        </div>

        <div className='space-y-8'>
          {SKILL_CATEGORIES.map((category) => {
            const categorySkills = skills.filter((s) => s.type === category);
            if (categorySkills.length === 0) return null;

            return (
              <div key={category} className='flex flex-col gap-3'>
                <h3 className='text-caption uppercase tracking-wider font-semibold text-accent-primary'>
                  {category}
                </h3>
                <div className='flex flex-wrap gap-2.5'>
                  {categorySkills.map((skill) => (
                    <div
                      key={skill.name}
                      className='inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-surface-raised border border-surface-border hover:border-accent-primary/40 transition-colors'
                    >
                      {skill.imageUrl ? (
                        <img
                          src={skill.imageUrl}
                          alt=''
                          className='w-5 h-5 object-contain shrink-0'
                          aria-hidden='true'
                        />
                      ) : (
                        customIcons[skill.name] || (
                          <div className='w-5 h-5 rounded bg-accent-primary/20 text-accent-primary flex items-center justify-center text-[10px] font-bold shrink-0'>
                            {skill.name.slice(0, 2)}
                          </div>
                        )
                      )}
                      <span className='text-xs font-medium text-text-primary'>
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5c. Hand-built timeline (replacing react-vertical-timeline-component) */}
      <div className='mt-24'>
        <div className='border-t border-surface-border pt-12 mb-12'>
          <h2 className='text-h2 font-poppins font-semibold text-text-primary'>
            Education & Experience
          </h2>
          <p className='mt-2 text-body text-text-secondary'>
            Academic foundation and engineering impact.
          </p>
        </div>

        {/* Timeline Container */}
        <div className='relative'>
          {/* Vertical central rule: left-aligned on mobile, centered on desktop */}
          <div
            className='absolute top-3 bottom-3 w-0.5 bg-surface-border left-4 sm:left-6 md:left-1/2 md:-translate-x-1/2'
            aria-hidden='true'
          />

          <div className='flex flex-col gap-12'>
            {experiences.map((experience, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={`${experience.company_name}-${index}`}
                  className='relative flex flex-col md:flex-row items-stretch'
                >
                  {/* Accent-colored timeline node dot */}
                  <div
                    className='absolute w-4 h-4 rounded-full bg-accent-primary border-4 border-surface-base shadow-glow left-4 sm:left-6 md:left-1/2 -translate-x-1/2 top-7 z-10'
                    aria-hidden='true'
                  />

                  {/* Desktop Alternating layout: Left column */}
                  <div
                    className={`w-full md:w-1/2 pl-12 sm:pl-16 md:pl-0 ${
                      isEven ? "md:pr-12" : "hidden md:block md:invisible"
                    }`}
                  >
                    {isEven && (
                      <Card className='p-6 sm:p-7 h-full'>
                        <div className='flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1'>
                          <h3 className='text-h3 font-poppins font-semibold text-text-primary'>
                            {experience.title}
                          </h3>
                          <span className='text-xs font-mono text-text-secondary shrink-0'>
                            {experience.date}
                          </span>
                        </div>
                        <p className='text-sm font-medium text-accent-secondary mt-1'>
                          {experience.company_name}
                        </p>

                        <ul className='mt-5 space-y-2.5 text-body text-text-secondary text-sm'>
                          {experience.points.map((point, i) => (
                            <li key={i} className='flex items-start gap-2.5'>
                              <span className='w-1.5 h-1.5 rounded-full bg-accent-primary mt-2 shrink-0' />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    )}
                  </div>

                  {/* Desktop Alternating layout: Right column */}
                  <div
                    className={`w-full md:w-1/2 pl-12 sm:pl-16 md:pl-12 ${
                      !isEven ? "" : "hidden md:block md:invisible"
                    }`}
                  >
                    {!isEven && (
                      <Card className='p-6 sm:p-7 h-full'>
                        <div className='flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1'>
                          <h3 className='text-h3 font-poppins font-semibold text-text-primary'>
                            {experience.title}
                          </h3>
                          <span className='text-xs font-mono text-text-secondary shrink-0'>
                            {experience.date}
                          </span>
                        </div>
                        <p className='text-sm font-medium text-accent-secondary mt-1'>
                          {experience.company_name}
                        </p>

                        <ul className='mt-5 space-y-2.5 text-body text-text-secondary text-sm'>
                          {experience.points.map((point, i) => (
                            <li key={i} className='flex items-start gap-2.5'>
                              <span className='w-1.5 h-1.5 rounded-full bg-accent-primary mt-2 shrink-0' />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className='mt-24'>
        <CTA />
      </div>
    </section>
  );
};

export default About;
