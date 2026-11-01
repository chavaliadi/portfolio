import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { CTA } from "../components";
import { experiences, skills } from "../constants";

import "react-vertical-timeline-component/style.min.css";

// Custom inline SVG icons for skills that don't have static icon files
const customIcons = {
  "FastAPI": (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L3 9V22L12 17L21 22V9L12 2Z" fill="#009688" />
      <path d="M12 6L7 11H10V16H14V11H17L12 6Z" fill="white" />
    </svg>
  ),
  "Flask": (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M19 6C19 4.34 17.66 3 16 3H8C6.34 3 5 4.34 5 6V8C5 9.38 5.94 10.54 7.22 10.87L9 15V20C9 20.55 9.45 21 10 21H14C14.55 21 15 20.55 15 20V15L16.78 10.87C18.06 10.54 19 9.38 19 8V6ZM7 6C7 5.45 7.45 5 8 5H16C16.55 5 17 5.45 17 6V7H7V6ZM13 15.5V19H11V15.5L9.22 11H14.78L13 15.5Z" fill="#708090" />
    </svg>
  ),
  "PostgreSQL": (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="#336791" />
    </svg>
  ),
  "Supabase": (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.4 2L4 12.6h7.5L9.6 22L19 11.4h-7.5L13.4 2z" fill="#3ECF8E" />
    </svg>
  ),
  "Convex": (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="4" fill="#F05A28" />
      <path d="M7 12L12 7L17 12L12 17L7 12Z" fill="white" />
    </svg>
  ),
  "Redis": (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#D82C20" />
      <path d="M2 12L12 17L22 12M2 17L12 22L22 17" stroke="#D82C20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "Docker": (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 10.5C2 7.5 5.5 7 7.5 7C9.5 7 10 8.5 11 8.5C12 8.5 12.5 7.5 14.5 7.5C16.5 7.5 22 8 22 11.5C22 15.5 16.5 16.5 14.5 16.5H5.5C3.5 16.5 2 14.5 2 10.5Z" fill="#0db7ed" />
      <rect x="6" y="9.5" width="2" height="2" fill="white" />
      <rect x="9" y="9.5" width="2" height="2" fill="white" />
      <rect x="12" y="9.5" width="2" height="2" fill="white" />
    </svg>
  ),
  "Vercel": (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="black" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L24 22H0L12 2Z" />
    </svg>
  ),
  "Python": (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C8.75 2 7.75 3 7.75 5.75V7.75H12V9H6.75C4 9 3 10 3 13.25C3 16.5 4 17.5 6.75 17.5H7.75V19.25C7.75 21.25 8.75 22 12 22C15.25 22 16.25 21 16.25 18.25V16.25H12V15H17.25C20 15 21 14 21 10.75C21 7.5 20 6.5 17.25 6.5H16.25V4.75C16.25 2.75 15.25 2 12 2ZM10.5 5C10.5 4.45 10.05 4 9.5 4C8.95 4 8.5 4.45 8.5 5C8.5 5.55 8.95 6 9.5 6C10.05 6 10.5 5.55 10.5 5ZM15.5 19C15.5 18.45 15.05 18 14.5 18C13.95 18 13.5 18.45 13.5 19C13.5 19.55 13.95 20 14.5 20C15.05 20 15.5 19.55 15.5 19Z" fill="#3776AB" />
    </svg>
  ),
  "C++": (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#00599C" />
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">C++</text>
    </svg>
  ),
  "scikit-learn": (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="7" cy="12" rx="5" ry="3.5" fill="#F7931E" opacity="0.85" />
      <ellipse cx="17" cy="12" rx="5" ry="3.5" fill="#3776AB" opacity="0.85" />
    </svg>
  ),
  "Claude AI": (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM15.5 15L14 13.5L12.5 15L11 13.5L9.5 15V9L15.5 9V15Z" fill="#D97706" />
    </svg>
  ),
  "Groq (Llama 3)": (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="4" fill="#6366F1" />
      <circle cx="12" cy="12" r="5" fill="white" />
      <circle cx="12" cy="12" r="2" fill="#6366F1" />
    </svg>
  )
};

// SVG components for timeline icons
const GraduationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0284c7" className="w-6 h-6">
    <path d="M11.584 2.755a.75.75 0 0 1 .832 0l9 6a.75.75 0 0 1 0 1.248l-9 6a.75.75 0 0 1-.832 0l-9-6a.75.75 0 0 1 0-1.248l9-6Z" />
    <path d="M12 17.5a16.425 16.425 0 0 1-5.112-.804v2.79c0 .647.43 1.218 1.063 1.348l3.6 1.2a.75.75 0 0 0 .498 0l3.6-1.2c.633-.13 1.063-.701 1.063-1.349v-2.789A16.425 16.425 0 0 1 12 17.5Z" />
    <path d="M21.75 12a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75Z" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ea580c" className="w-6 h-6">
    <path fillRule="evenodd" d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.25H18A3 3 0 0 1 21 8.5v3a3 3 0 0 1-.3 1.311l-2.032 5.08A3 3 0 0 1 15.903 19.5H8.097a3 3 0 0 1-2.765-1.61l-2.032-5.08A3 3 0 0 1 3 11.5v-3A3 3 0 0 1 6 5.5h.5V5.25Zm1.5 0v.25h6v-.25a1.5 1.5 0 0 0-1.5-1.5h-3A1.5 1.5 0 0 0 9 5.25Z" clipRule="evenodd" />
    <path d="M3 11.5h18v1H3v-1Z" />
  </svg>
);

const About = () => {
  return (
    <section className='max-container'>
      <h1 className='head-text'>
        Hello, I'm{" "}
        <span className='blue-gradient_text font-semibold drop-shadow'>
          {" "}
          Adithya Chavali
        </span>{" "}
        👋
      </h1>

      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
        <p>
          US citizen based in Atlanta, Georgia, finishing a B.Tech at IIIT Allahabad (graduating 2027).
          I specialize in building robust full-stack applications, designing secure APIs, 
          and implementing machine learning pipelines. Genuinely curious about complex system 
          architectures and automation.
        </p>
      </div>

      <div className='py-10 flex flex-col'>
        <h3 className='subhead-text'>My Skills</h3>

        <div className='mt-16 flex flex-wrap gap-4 sm:gap-8 justify-center sm:justify-start'>
          {skills.map((skill) => (
            <div className='flex w-24 flex-col items-center gap-2' key={skill.name}>
              <div className='block-container w-20 h-20'>
                <div className='btn-back rounded-xl' />
                <div className='btn-front rounded-xl flex justify-center items-center p-3' title={skill.name}>
                  {skill.imageUrl ? (
                    <img
                      src={skill.imageUrl}
                      alt={skill.name}
                      className='w-10 h-10 object-contain'
                    />
                  ) : (
                    customIcons[skill.name] || (
                      <div className='w-full h-full flex flex-col items-center justify-center bg-sky-50 rounded-lg text-blue-600 font-extrabold text-xs text-center leading-none p-1 break-words'>
                        {skill.name}
                      </div>
                    )
                  )}
                </div>
              </div>
              <span className='w-full text-center text-xs font-medium leading-tight text-slate-600'>
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className='py-16'>
        <h3 className='subhead-text'>Education & Experience</h3>
        <div className='mt-5 flex flex-col gap-3 text-slate-500'>
          <p>
            My academic journey at IIIT Allahabad coupled with real-world internship achievements. Here is the timeline:
          </p>
        </div>

        <div className='mt-12 flex'>
          <VerticalTimeline>
            {experiences.map((experience) => (
              <VerticalTimelineElement
                key={experience.company_name}
                date={experience.date}
                iconStyle={{ background: experience.iconBg, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                icon={
                  experience.iconType === "education" ? <GraduationIcon /> : <BriefcaseIcon />
                }
                contentStyle={{
                  borderBottom: "8px",
                  borderStyle: "solid",
                  borderBottomColor: experience.iconBg,
                  boxShadow: "none",
                }}
              >
                <div>
                  <h3 className='text-black text-xl font-poppins font-semibold'>
                    {experience.title}
                  </h3>
                  <p
                    className='text-black-500 font-medium text-base'
                    style={{ margin: 0 }}
                  >
                    {experience.company_name}
                  </p>
                </div>

                <ul className='my-5 list-disc ml-5 space-y-2'>
                  {experience.points.map((point, index) => (
                    <li
                      key={`experience-point-${index}`}
                      className='text-black-500/70 font-normal pl-1 text-sm'
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>

      <hr className='border-slate-200' />

      <CTA />
    </section>
  );
};

export default About;
