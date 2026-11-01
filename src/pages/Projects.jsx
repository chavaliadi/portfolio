import { useState } from "react";
import { Link } from "react-router-dom";

import { CTA } from "../components";
import { projects } from "../constants";
import { arrow } from "../assets/icons";

const Projects = () => {
  const [selectedSkill, setSelectedSkill] = useState("All");

  // Collect all unique technologies across all projects
  const allSkills = ["All", ...new Set(projects.flatMap((project) => project.technologies))];

  // Filter projects by selected skill
  const filteredProjects = selectedSkill === "All"
    ? projects
    : projects.filter((project) => project.technologies.includes(selectedSkill));

  // Separate filtered projects into Personal and Professional groups
  const personalProjects = filteredProjects.filter((p) => !p.isProfessional);
  const professionalProjects = filteredProjects.filter((p) => p.isProfessional);

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill === selectedSkill ? "All" : skill);
  };

  return (
    <section className='max-container'>
      <h1 className='head-text'>
        My{" "}
        <span className='blue-gradient_text drop-shadow font-semibold'>
          Projects
        </span>
      </h1>

      <p className='text-slate-500 mt-2 leading-relaxed'>
        I've built systems ranging from location-based reminder engines to deep machine learning APIs and full-stack software dashboards. 
        Select a technology badge below to filter projects by skill!
      </p>

      {/* Skills filter bar */}
      <div className='mt-8 flex flex-wrap gap-2 items-center'>
        <span className="text-slate-600 font-medium text-sm mr-2">Filter by Tech:</span>
        {allSkills.map((skill) => (
          <button
            key={skill}
            onClick={() => handleSkillClick(skill)}
            className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all duration-300 ${
              selectedSkill === skill
                ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
            }`}
          >
            {skill}
          </button>
        ))}
      </div>

      {/* Personal & Open Source Section */}
      {personalProjects.length > 0 && (
        <div className="mt-16">
          <h2 className="text-3xl font-poppins font-bold text-slate-800 border-b pb-2 mb-10">Personal & Open-Source Projects</h2>
          <div className='flex flex-wrap gap-16'>
            {personalProjects.map((project) => (
              <div className='lg:w-[400px] w-full flex flex-col justify-between h-[280px]' key={project.name}>
                <div>
                  <div className='flex gap-4 items-center'>
                    <div className='block-container w-12 h-12 flex-shrink-0'>
                      <div className={`btn-back rounded-xl ${project.theme}`} />
                      <div className='btn-front rounded-xl flex justify-center items-center bg-white/20 backdrop-blur-md font-bold text-white text-xl font-poppins'>
                        {project.name.charAt(0)}
                      </div>
                    </div>
                    <h4 className='text-2xl font-poppins font-semibold text-slate-800'>
                      {project.name}
                    </h4>
                  </div>

                  <p className='mt-3 text-slate-500 text-sm leading-relaxed'>{project.description}</p>
                </div>

                <div className="mt-4">
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.map((t) => (
                      <span key={t} className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className='flex items-center gap-2 font-poppins'>
                    <Link
                      to={project.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='font-semibold text-blue-600 hover:underline text-sm'
                    >
                      GitHub Link
                    </Link>
                    <img
                      src={arrow}
                      alt='arrow'
                      className='w-4 h-4 object-contain'
                    />
                    {project.liveUrl && (
                      <>
                        <a
                          href={project.liveUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='ml-3 font-semibold text-blue-600 hover:underline text-sm'
                        >
                          Live demo →
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Professional & Internship Section */}
      {professionalProjects.length > 0 && (
        <div className="mt-20">
          <h2 className="text-3xl font-poppins font-bold text-slate-800 border-b pb-2 mb-10">Professional Experience (Ada Insys)</h2>
          <div className='flex flex-wrap gap-16'>
            {professionalProjects.map((project) => (
              <div className='lg:w-[400px] w-full flex flex-col justify-between h-[300px]' key={project.name}>
                <div>
                  <div className='flex gap-4 items-center'>
                    <div className='block-container w-12 h-12 flex-shrink-0'>
                      <div className={`btn-back rounded-xl ${project.theme}`} />
                      <div className='btn-front rounded-xl flex justify-center items-center bg-white/20 backdrop-blur-md font-bold text-white text-xl font-poppins'>
                        {project.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h4 className='text-2xl font-poppins font-semibold text-slate-800 leading-none'>
                        {project.name}
                      </h4>
                      <span className="text-xs text-orange-600 font-semibold bg-orange-50 px-2 py-0.5 rounded inline-block mt-1">
                        {project.company} • {project.role}
                      </span>
                    </div>
                  </div>

                  <p className='mt-3 text-slate-500 text-sm leading-relaxed'>{project.description}</p>
                </div>

                <div className="mt-4">
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.map((t) => (
                      <span key={t} className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className='flex items-center gap-1.5 font-poppins text-slate-400 text-sm font-semibold cursor-not-allowed select-none'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    <span>Closed Source / Enterprise Work</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fallback when no projects match the filter */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-20 text-slate-400 font-medium font-poppins">
          No projects found matching the "{selectedSkill}" tech skill.
        </div>
      )}

      <hr className='border-slate-200 mt-20' />

      <CTA />
    </section>
  );
};

export default Projects;
