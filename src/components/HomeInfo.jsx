import React from "react";
import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";

const STAGES = [
  {
    stage: 1,
    content: (
      <div className='flex flex-col gap-3 text-center md:text-left'>
        <h1 className='text-3xl sm:text-4xl font-extrabold font-poppins text-white tracking-tight leading-tight sky-text-shadow'>
          Hi, I'm <span className='text-accent-primary'>Adithya Chavali</span> 👋
        </h1>
        <p className='text-base sm:text-lg text-slate-100 font-medium leading-relaxed sky-text-shadow'>
          Software engineer. US citizen based in Atlanta, Georgia, finishing a B.Tech at IIIT Allahabad (2027).
        </p>
      </div>
    ),
  },
  {
    stage: 2,
    content: (
      <div className='flex flex-col gap-5 text-center md:text-left'>
        <p className='text-xl sm:text-2xl md:text-3xl font-bold font-poppins text-white tracking-tight leading-snug sky-text-shadow'>
          Two software internships. Built a biometric attendance platform handling 1,000+ concurrent sessions, then led integration on a government infrastructure portal for the Ministry of Ports.
        </p>

        <div className='flex justify-center md:justify-start'>
          <Link
            to='/about'
            className='inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-surface-base font-semibold hover:bg-accent-primary/90 transition-all text-sm sm:text-base shadow-lg shadow-black/25 hover:shadow-accent-primary/30 hover:-translate-y-0.5'
          >
            Explore background
            <img src={arrow} alt='' className='w-4 h-4 object-contain brightness-0' aria-hidden='true' />
          </Link>
        </div>
      </div>
    ),
  },
  {
    stage: 3,
    content: (
      <div className='flex flex-col gap-5 text-center md:text-left'>
        <p className='text-xl sm:text-2xl md:text-3xl font-bold font-poppins text-white tracking-tight leading-snug sky-text-shadow'>
          Ten projects: geospatial ML, HNSW vector search built from scratch, Go service monitoring, LLM evaluation infrastructure.
        </p>

        <div className='flex justify-center md:justify-start'>
          <Link
            to='/projects'
            className='inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-surface-base font-semibold hover:bg-accent-primary/90 transition-all text-sm sm:text-base shadow-lg shadow-black/25 hover:shadow-accent-primary/30 hover:-translate-y-0.5'
          >
            Visit my projects
            <img src={arrow} alt='' className='w-4 h-4 object-contain brightness-0' aria-hidden='true' />
          </Link>
        </div>
      </div>
    ),
  },
  {
    stage: 4,
    content: (
      <div className='flex flex-col gap-5 text-center md:text-left'>
        <p className='text-2xl sm:text-3xl md:text-4xl font-bold font-poppins text-white tracking-tight leading-snug sky-text-shadow'>
          Looking for a software engineering intern or full-time dev? Let's build something great together!
        </p>

        <div className='flex justify-center md:justify-start'>
          <Link
            to='/contact'
            className='inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-surface-base font-semibold hover:bg-accent-primary/90 transition-all text-sm sm:text-base shadow-lg shadow-black/25 hover:shadow-accent-primary/30 hover:-translate-y-0.5'
          >
            Let's connect
            <img src={arrow} alt='' className='w-4 h-4 object-contain brightness-0' aria-hidden='true' />
          </Link>
        </div>
      </div>
    ),
  },
];

const HomeInfo = ({ currentStage }) => {
  return (
    <div className='relative w-full max-w-[540px]'>
      {STAGES.map(({ stage, content }) => {
        const isActive = currentStage === stage;
        return (
          <div
            key={stage}
            className={`transition-all duration-500 ease-in-out ${
              isActive
                ? "opacity-100 translate-y-0 pointer-events-auto relative"
                : "opacity-0 translate-y-2 pointer-events-none absolute top-0 left-0 right-0"
            }`}
            aria-hidden={!isActive}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};

export default HomeInfo;
