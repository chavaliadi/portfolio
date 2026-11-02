import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

const CTA = () => {
  return (
    <Card className='p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6'>
      <p className='text-xl sm:text-2xl font-poppins font-bold text-text-primary text-center md:text-left'>
        Have a project in mind? <br className='hidden sm:block' />
        Let's build something together!
      </p>
      <Link
        to='/contact'
        className='px-6 py-3 rounded-xl bg-accent-primary text-surface-base font-semibold hover:bg-accent-primary/90 transition-all text-sm shadow-sm shrink-0'
      >
        Contact
      </Link>
    </Card>
  );
};

export default CTA;
