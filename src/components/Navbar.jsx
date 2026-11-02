import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu whenever route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinkClass = ({ isActive }) =>
    `relative py-1 text-sm font-medium transition-colors hover:text-accent-primary ${
      isActive
        ? "text-accent-primary after:absolute after:-bottom-2.5 after:left-0 after:right-0 after:h-0.5 after:bg-accent-primary after:rounded-full"
        : "text-text-secondary"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? "bg-accent-primary/10 text-accent-primary font-semibold"
        : "text-text-secondary hover:text-text-primary hover:bg-surface-raised"
    }`;

  return (
    <header className='fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-surface-base/80 border-b border-surface-border transition-colors'>
      <div className='max-w-content mx-auto px-5 sm:px-12 h-20 flex items-center justify-between'>
        {/* Brand Logo */}
        <NavLink
          to='/'
          className='w-11 h-11 shrink-0 rounded-xl bg-surface-raised border border-surface-border items-center justify-center flex font-bold shadow-sm hover:border-accent-primary/40 transition-all duration-300 group'
          aria-label='Home'
        >
          <span className='blue-gradient_text text-lg font-poppins tracking-wider font-extrabold group-hover:scale-105 transition-transform duration-300'>
            AC
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center gap-8'>
          <NavLink to='/about' className={navLinkClass}>
            About
          </NavLink>
          <NavLink to='/projects' className={navLinkClass}>
            Projects
          </NavLink>
          <a
            href='/resume.pdf'
            target='_blank'
            rel='noopener noreferrer'
            className='py-1 text-sm font-medium text-text-secondary hover:text-accent-primary transition-colors inline-flex items-center gap-1.5'
          >
            <span>Resume</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              className='w-3.5 h-3.5 opacity-70'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25'
              />
            </svg>
          </a>
          <NavLink
            to='/contact'
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? "bg-accent-primary text-surface-base shadow-sm"
                  : "border border-surface-border text-text-primary hover:border-accent-primary/40 bg-surface-raised"
              }`
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type='button'
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className='md:hidden shrink-0 p-2 rounded-xl bg-surface-raised border border-surface-border text-text-secondary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary transition-colors'
          aria-label='Toggle navigation menu'
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className='md:hidden border-t border-surface-border bg-surface-base/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-2'>
          <NavLink to='/about' className={mobileLinkClass}>
            About
          </NavLink>
          <NavLink to='/projects' className={mobileLinkClass}>
            Projects
          </NavLink>
          <a
            href='/resume.pdf'
            target='_blank'
            rel='noopener noreferrer'
            className='py-2.5 px-3 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-raised transition-colors flex items-center justify-between'
          >
            <span>Resume</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              className='w-4 h-4 opacity-70'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25'
              />
            </svg>
          </a>
          <NavLink to='/contact' className={mobileLinkClass}>
            Contact
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;
