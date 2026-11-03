import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";

const STAGES = [
  {
    stage: 1,
    content: (
      <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
        Hi, I'm
        <span className='font-semibold mx-2 text-white'>Adithya Chavali</span>
        👋
        <br />
        US citizen based in Atlanta, Georgia, finishing a B.Tech at IIIT Allahabad (graduating 2027).
      </h1>
    ),
  },
  {
    stage: 2,
    content: (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          Gained hands-on experience in full-stack and ML systems <br /> and built solid engineering skills
        </p>

        <Link to='/about' className='neo-brutalism-white neo-btn'>
          Explore background
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    ),
  },
  {
    stage: 3,
    content: (
      <div className='info-box'>
        <p className='font-medium text-center sm:text-xl'>
          Developed tools for code quality, biometric tracking, <br /> and recommendation engines. Curious about my work?
        </p>

        <Link to='/projects' className='neo-brutalism-white neo-btn'>
          Visit my projects
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    ),
  },
  {
    stage: 4,
    content: (
      <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
          Looking for a software engineering intern or full-time dev? <br /> Let's build something great together!
        </p>

        <Link to='/contact' className='neo-brutalism-white neo-btn'>
          Let's connect
          <img src={arrow} alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    ),
  },
];

const HomeInfo = ({ currentStage }) => {
  return (
    <div className='relative grid place-items-center w-full max-w-xl mx-auto px-4'>
      {STAGES.map(({ stage, content }) => {
        const isActive = currentStage === stage;
        return (
          <div
            key={stage}
            className={`col-start-1 row-start-1 transition-all duration-500 ease-in-out ${
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
