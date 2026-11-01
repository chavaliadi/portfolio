import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Footer, Navbar } from "./components";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));

const routeFallback = (
  <div className='max-container py-16 text-center text-slate-600'>Loading...</div>
);

const NotFound = () => (
  <section className='max-container text-center'>
    <h1 className='head-text'>Page not found</h1>
    <p className='mt-4 text-slate-500'>The page you requested does not exist.</p>
    <div className='mt-8 flex justify-center gap-6 font-semibold text-blue-600'>
      <a href='/'>Home</a>
      <a href='/about'>About</a>
      <a href='/projects'>Projects</a>
      <a href='/contact'>Contact</a>
    </div>
  </section>
);

const App = () => {
  return (
    <main className='bg-slate-300/20'>
      <Router>
        <Navbar />
        <Suspense fallback={routeFallback}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/about'
              element={
                <>
                  <About />
                  <Footer />
                </>
              }
            />
            <Route
              path='/projects'
              element={
                <>
                  <Projects />
                  <Footer />
                </>
              }
            />
            <Route
              path='/contact'
              element={
                <>
                  <Contact />
                  <Footer />
                </>
              }
            />
            <Route
              path='*'
              element={
                <>
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
