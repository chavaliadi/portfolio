import React, { useState } from "react";
import { CTA, Card } from "../components";
import { projects, professionalProjects } from "../constants";

const CATEGORIES = ["All", "Full-stack", "ML / Data", "Dev Tools", "Infrastructure", "Research"];

const getGradientFromName = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue1 = Math.abs(hash) % 360;
  const hue2 = (hue1 + 45) % 360;
  return `linear-gradient(90deg, hsl(${hue1}, 75%, 65%), hsl(${hue2}, 80%, 60%))`;
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section className='max-w-content mx-auto sm:px-12 px-5 pt-28 sm:pt-32 pb-24 text-text-primary min-h-screen'>
      {/* Header */}
      <div className='max-w-[65ch]'>
        <h1 className='text-3xl sm:text-display font-poppins font-bold text-text-primary tracking-tight'>
          My{" "}
          <span className='text-accent-primary'>
            Projects
          </span>
        </h1>
        <p className='mt-4 text-body text-text-secondary leading-relaxed'>
          Production tools, machine learning pipelines, and systems engineering.
          Explore personal and open-source work, or filter by architectural focus.
        </p>
      </div>

      {/* 4a. 5 Category filter chips */}
      <div className='mt-10 flex flex-wrap gap-2.5 items-center' role='tablist' aria-label='Filter projects by category'>
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type='button'
              role='tab'
              aria-selected={isActive}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-caption font-medium rounded-xl border transition-all duration-200 ${
                isActive
                  ? "bg-accent-primary text-surface-base border-accent-primary font-semibold shadow-glow"
                  : "bg-surface-raised/80 text-text-secondary border-surface-border hover:text-text-primary hover:border-surface-border/80"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* 4b. Personal Projects Grid */}
      <div className='mt-12'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch'>
          {filteredProjects.map((project) => (
            <Card
              key={project.name}
              className='flex flex-col h-full overflow-hidden'
            >
              {/* 4e. Deterministic 6px soft two-tone gradient header strip */}
              {/* TODO: screenshot slot */}
              <div
                className='h-1.5 w-full shrink-0'
                style={{ background: getGradientFromName(project.name) }}
                aria-hidden='true'
              />

              <div className='p-6 sm:p-7 flex flex-col flex-1 justify-between'>
                {/* 4c. Top Section: Name, Category, Description */}
                <div>
                  <div className='flex items-baseline justify-between gap-2 flex-wrap'>
                    <h3 className='text-h3 font-poppins font-semibold text-text-primary'>
                      {project.name}
                    </h3>
                    <span className='text-xs font-semibold uppercase tracking-wider text-accent-primary'>
                      {project.category}
                    </span>
                  </div>

                  <p className='mt-3.5 text-body text-text-secondary leading-relaxed'>
                    {project.description}
                  </p>
                </div>

                {/* 4c & 4b. Bottom Section: Tech tags pinned to bottom + Action row */}
                <div className='mt-6 pt-5 border-t border-surface-border flex flex-col gap-4'>
                  <div className='flex flex-wrap gap-1.5'>
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className='px-2.5 py-0.5 text-xs font-medium rounded-md bg-surface-base text-text-secondary border border-surface-border'
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* 4d. Action row */}
                  <div className='flex items-center justify-between gap-3 pt-1'>
                    <a
                      href={project.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center gap-1.5 text-caption font-medium text-text-secondary hover:text-accent-primary transition-colors'
                    >
                      View code <span aria-hidden='true'>→</span>
                    </a>

                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-accent-primary text-surface-base hover:bg-accent-primary/90 transition-all shadow-sm'
                      >
                        Live demo <span aria-hidden='true'>↗</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className='text-center py-16 text-text-secondary'>
            No projects found in "{selectedCategory}".
          </div>
        )}
      </div>

      {/* 4f. Ada Insys section */}
      <div className='mt-24'>
        <div className='border-t border-surface-border pt-12 mb-8'>
          <h2 className='text-h2 font-poppins font-semibold text-text-primary'>
            Professional Experience (Ada Insys)
          </h2>
          <p className='mt-2 text-body text-text-secondary'>
            Production systems engineered during industry engagement.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch'>
          {professionalProjects.map((project) => (
            <Card
              key={project.name}
              className='flex flex-col h-full overflow-hidden'
            >
              {/* Deterministic header strip */}
              <div
                className='h-1.5 w-full shrink-0'
                style={{ background: getGradientFromName(project.name) }}
                aria-hidden='true'
              />

              <div className='p-6 sm:p-7 flex flex-col flex-1 justify-between'>
                <div>
                  <div className='flex items-baseline justify-between gap-2 flex-wrap'>
                    <h3 className='text-h3 font-poppins font-semibold text-text-primary'>
                      {project.name}
                    </h3>
                    <span className='text-xs font-semibold text-accent-secondary'>
                      {project.company} • {project.role}
                    </span>
                  </div>

                  <p className='mt-3.5 text-body text-text-secondary leading-relaxed'>
                    {project.description}
                  </p>
                </div>

                <div className='mt-6 pt-5 border-t border-surface-border flex flex-col gap-4'>
                  <div className='flex flex-wrap gap-1.5'>
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className='px-2.5 py-0.5 text-xs font-medium rounded-md bg-surface-base text-text-secondary border border-surface-border'
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* 4f. Closed Source / Enterprise Work label and no anchor */}
                  <div className='flex items-center gap-2 text-text-secondary/70 text-xs font-medium select-none pt-1'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='2'
                      stroke='currentColor'
                      className='w-3.5 h-3.5'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin="round"
                        d='M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
                      />
                    </svg>
                    <span>Closed Source / Enterprise Work</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className='mt-24'>
        <CTA />
      </div>
    </section>
  );
};

export default Projects;
