import emailjs from "@emailjs/browser";
import React, { useRef, useState } from "react";

import { Alert, Card } from "../components";
import useAlert from "../hooks/useAlert";
import { github, linkedin } from "../assets/icons";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Adithya Chavali",
          from_email: form.email,
          to_email: "adithya3218@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: "Thank you for your message! 😃",
            type: "success",
          });

          setTimeout(() => {
            hideAlert(false);
            setForm({
              name: "",
              email: "",
              message: "",
            });
          }, 4000);
        },
        (error) => {
          setLoading(false);
          console.error(error);

          showAlert({
            show: true,
            text: "I didn't receive your message 😢 Please try emailing directly.",
            type: "danger",
          });
        }
      );
  };

  return (
    <section className='max-w-content mx-auto sm:px-12 px-5 pt-28 sm:pt-32 pb-24 text-text-primary min-h-screen'>
      {alert.show && <Alert {...alert} />}

      {/* 6b. Centered column at ~560px max width */}
      <div className='max-w-[560px] mx-auto w-full'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl sm:text-display font-poppins font-bold text-text-primary tracking-tight'>
            Get in <span className='text-accent-primary'>Touch</span>
          </h1>
          <p className='mt-3 text-body text-text-secondary'>
            Have an opportunity, questions about my work, or just want to connect?
            Drop a message below.
          </p>
        </div>

        {/* 6b. Card container for form */}
        <Card className='p-6 sm:p-8'>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='flex flex-col gap-6'
          >
            {/* Name input */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='contact-name' className='text-caption font-semibold text-text-primary'>
                Name
              </label>
              <input
                id='contact-name'
                type='text'
                name='name'
                className='w-full px-4 py-3 rounded-xl bg-surface-base border border-surface-border text-text-primary placeholder:text-text-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary transition-all'
                placeholder='Alex Smith'
                required
                value={form.name}
                onChange={handleChange}
              />
            </div>

            {/* Email input */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='contact-email' className='text-caption font-semibold text-text-primary'>
                Email
              </label>
              <input
                id='contact-email'
                type='email'
                name='email'
                className='w-full px-4 py-3 rounded-xl bg-surface-base border border-surface-border text-text-primary placeholder:text-text-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary transition-all'
                placeholder='alex@company.com'
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>

            {/* Message textarea */}
            <div className='flex flex-col gap-2'>
              <label htmlFor='contact-message' className='text-caption font-semibold text-text-primary'>
                Your Message
              </label>
              <textarea
                id='contact-message'
                name='message'
                rows='5'
                className='w-full px-4 py-3 rounded-xl bg-surface-base border border-surface-border text-text-primary placeholder:text-text-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary transition-all resize-none'
                placeholder='Tell me about your project, team, or opportunity...'
                required
                value={form.message}
                onChange={handleChange}
              />
            </div>

            {/* Submit button */}
            <button
              type='submit'
              disabled={loading}
              className='w-full mt-2 py-3.5 px-6 rounded-xl bg-accent-primary text-surface-base font-semibold hover:bg-accent-primary/90 transition-all text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
            >
              {loading ? (
                <>
                  <svg className='animate-spin -ml-1 mr-2 h-4 w-4 text-surface-base' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </Card>

        {/* 6c. Compact row below form: Email, GitHub, LinkedIn (no phone number) */}
        <div className='mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-caption text-text-secondary'>
          <a
            href='mailto:adithya3218@gmail.com'
            className='inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-raised border border-surface-border hover:text-accent-primary hover:border-accent-primary/40 transition-all text-xs sm:text-sm'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              className='w-4 h-4 text-accent-primary shrink-0'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
              />
            </svg>
            <span className='break-all'>adithya3218@gmail.com</span>
          </a>

          <a
            href='https://github.com/chavaliadi'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-raised border border-surface-border hover:text-accent-primary hover:border-accent-primary/40 transition-all text-xs sm:text-sm'
          >
            <img src={github} alt='' className='w-4 h-4 object-contain brightness-200 shrink-0' aria-hidden='true' />
            <span>GitHub</span>
          </a>

          <a
            href='https://www.linkedin.com/in/adithya-chavali-381729310/'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-raised border border-surface-border hover:text-accent-primary hover:border-accent-primary/40 transition-all text-xs sm:text-sm'
          >
            <img src={linkedin} alt='' className='w-4 h-4 object-contain brightness-150 shrink-0' aria-hidden='true' />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
