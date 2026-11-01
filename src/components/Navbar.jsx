import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className='header'>
      <NavLink to='/' className='w-12 h-12 rounded-lg bg-white items-center justify-center flex font-bold shadow-md hover:shadow-lg transition-all duration-300 group hover:-translate-y-0.5 active:translate-y-0'>
        <p className='blue-gradient_text text-xl font-poppins tracking-wider font-extrabold group-hover:scale-105 transition-transform duration-300'>AC</p>
      </NavLink>
      <nav className='flex text-lg gap-7 font-medium'>
        <NavLink to='/about' className={({ isActive }) => isActive ? "text-blue-600" : "text-black" }>
          About
        </NavLink>
        <NavLink to='/projects' className={({ isActive }) => isActive ? "text-blue-600" : "text-black"}>
          Projects
        </NavLink>
        <a
          href='/resume.pdf'
          target='_blank'
          rel='noopener noreferrer'
          className='text-black hover:text-blue-600'
        >
          Resume
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
