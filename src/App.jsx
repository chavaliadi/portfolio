import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AuroraBackground, Footer, Navbar } from "./components";

const lazyWithReload = (factory) =>
  lazy(() =>
    factory().catch((err) => {
      if (!sessionStorage.getItem("chunk-reloaded")) {
        sessionStorage.setItem("chunk-reloaded", "1");
        window.location.reload();
      }
      throw err;
    })
  );

const Home = lazyWithReload(() => import("./pages/Home"));
const About = lazyWithReload(() => import("./pages/About"));
const Projects = lazyWithReload(() => import("./pages/Projects"));
const Contact = lazyWithReload(() => import("./pages/Contact"));

const routeFallback = (
  <div className='max-w-content mx-auto py-32 text-center text-text-secondary flex items-center justify-center min-h-screen'>
    <div className='w-8 h-8 rounded-full border-2 border-accent-primary border-t-transparent animate-spin' />
  </div>
);

const NotFound = () => (
  <section className='max-w-content mx-auto sm:px-12 px-5 pt-36 pb-24 text-center min-h-[calc(100vh-160px)] flex flex-col items-center justify-center text-text-primary'>
    <span className='text-xs font-semibold uppercase tracking-widest text-accent-primary mb-3'>
      404 Error
    </span>
    <h1 className='text-3xl sm:text-display font-poppins font-bold text-text-primary tracking-tight'>
      Page not found
    </h1>
    <p className='mt-4 text-body text-text-secondary max-w-[45ch] leading-relaxed'>
      The page you requested does not exist or has been moved.
    </p>
    <div className='mt-8 flex flex-wrap justify-center gap-3 font-medium text-sm'>
      <a
        href='/'
        className='px-5 py-2.5 rounded-xl bg-accent-primary text-surface-base font-semibold hover:bg-accent-primary/90 transition-all shadow-sm'
      >
        Home
      </a>
      <a
        href='/about'
        className='px-5 py-2.5 rounded-xl bg-surface-raised border border-surface-border text-text-primary hover:border-accent-primary/40 transition-all'
      >
        About
      </a>
      <a
        href='/projects'
        className='px-5 py-2.5 rounded-xl bg-surface-raised border border-surface-border text-text-primary hover:border-accent-primary/40 transition-all'
      >
        Projects
      </a>
      <a
        href='/contact'
        className='px-5 py-2.5 rounded-xl bg-surface-raised border border-surface-border text-text-primary hover:border-accent-primary/40 transition-all'
      >
        Contact
      </a>
    </div>
  </section>
);

const App = () => {
  return (
    <main className='min-h-screen relative'>
      <Router>
        <Navbar />
        <Suspense fallback={routeFallback}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/about'
              element={
                <>
                  <AuroraBackground />
                  <About />
                  <Footer />
                </>
              }
            />
            <Route
              path='/projects'
              element={
                <>
                  <AuroraBackground />
                  <Projects />
                  <Footer />
                </>
              }
            />
            <Route
              path='/contact'
              element={
                <>
                  <AuroraBackground />
                  <Contact />
                  <Footer />
                </>
              }
            />
            <Route
              path='*'
              element={
                <>
                  <AuroraBackground />
                  <NotFound />
                  <Footer />
                </>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </main>
  );
};

export default App;
