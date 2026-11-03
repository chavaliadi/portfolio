import React from "react";
import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";

const STAGES = [
  {
    stage: 1,
    content: (
      <div className='flex flex-col gap-2.5 text-center md:text-left'>
        <h1 className='text-lg sm:text-xl font-bold font-poppins text-text-primary tracking-tight'>
          Hi, I'm <span className='text-accent-primary'>Adithya Chavali</span> 👋
        </h1>
        <p className='text-sm sm:text-base text-text-secondary leading-relaxed'>
          US citizen based in Atlanta, Georgia, finishing a B.Tech at IIIT Allahabad (graduating 2027).
        </p>
      </div>
    ),
  },
  {
    stage: 2,
    content: (
      <div className='flex flex-col gap-4 text-center md:text-left'>
        <p className='text-sm sm:text-base font-medium text-text-primary leading-relaxed'>
          Gained hands-on experience in full-stack and ML systems <br className='hidden sm:inline' />
          and built solid engineering skills
        </p>

        <div className='flex justify-center md:justify-start'>
          <Link
            to='/about'
            className='inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-accent-primary text-surface-base font-semibold hover:bg-accent-primary/90 transition-all text-sm shadow-sm'
          >
            Explore background
            <img src={arrow} alt='' className='w-3.5 h-3.5 object-contain brightness-0' aria-hidden='true' />
          </Link>
        </div>
      </div>
    ),
  },
  {
    stage: 3,
    content: (
      <div className='flex flex-col gap-4 text-center md:text-left'>
        <p className='text-sm sm:text-base font-medium text-text-primary leading-relaxed'>
          Developed tools for code quality, biometric tracking, <br className='hidden sm:inline' />
          and recommendation engines. Curious about my work?
        </p>

        <div className='flex justify-center md:justify-start'>
          <Link
            to='/projects'
            className='inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-accent-primary text-surface-base font-semibold hover:bg-accent-primary/90 transition-all text-sm shadow-sm'
          >
            Visit my projects
            <img src={arrow} alt='' className='w-3.5 h-3.5 object-contain brightness-0' aria-hidden='true' />
          </Link>
        </div>
      </div>
    ),
  },
  {
    stage: 4,
    content: (
      <div className='flex flex-col gap-4 text-center md:text-left'>
        <p className='text-sm sm:text-base font-medium text-text-primary leading-relaxed'>
          Looking for a software engineering intern or full-time dev? <br className='hidden sm:inline' />
          Let's build something great together!
        </p>

        <div className='flex justify-center md:justify-start'>
          <Link
            to='/contact'
            className='inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-accent-primary text-surface-base font-semibold hover:bg-accent-primary/90 transition-all text-sm shadow-sm'
          >
            Let's connect
            <img src={arrow} alt='' className='w-3.5 h-3.5 object-contain brightness-0' aria-hidden='true' />
          </Link>
        </div>
      </div>
    ),
  },
];

const HomeInfo = ({ currentStage }) => {
  return (
    <div className='relative grid w-full max-w-[420px]'>
      {STAGES.map(({ stage, content }) => {
        const isActive = currentStage === stage;
        return (
          <div
            key={stage}
            className={`col-start-1 row-start-1 p-6 sm:p-7 rounded-2xl bg-surface-raised/70 backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-500 ease-in-out ${
              isActive
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
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
