import React from "react";
import { Link } from "react-router-dom";
import { socialLinks } from "../constants";

const Footer = () => {
  return (
    <footer className='border-t border-surface-border mt-auto font-poppins relative z-10'>
      <div className='max-w-content mx-auto px-5 sm:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4'>
        <p className='text-xs text-text-secondary text-center sm:text-left'>
          © {new Date().getFullYear()} <span className='text-text-primary font-semibold'>Adithya Chavali</span>. All rights reserved.
        </p>

        {/* 7b. The three social icons: Contact/Email, GitHub, LinkedIn (NO phone icon) */}
        <div className='flex items-center gap-3'>
          {socialLinks.map((link) => {
            const isInternal = link.link.startsWith("/");

            const content = (
              <span
                className='w-9 h-9 rounded-xl bg-surface-raised border border-surface-border flex items-center justify-center hover:border-accent-primary/40 hover:-translate-y-0.5 transition-all duration-200'
                title={link.name}
              >
                {link.name === "Contact" ? (
                  // Clean email/message icon instead of phone icon
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='2'
                    stroke='currentColor'
                    className='w-4 h-4 text-text-primary'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
                    />
                  </svg>
                ) : (
                  <img
                    src={link.iconUrl}
                    alt={link.name}
                    className='w-4 h-4 object-contain brightness-150'
                  />
                )}
              </span>
            );

            return isInternal ? (
              <Link key={link.name} to={link.link} aria-label={link.name}>
                {content}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.link}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={link.name}
              >
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
