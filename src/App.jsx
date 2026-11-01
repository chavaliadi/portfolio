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
          </Routes>
        </Suspense>
      </Router>
    </main>
  );
};

export default App;
