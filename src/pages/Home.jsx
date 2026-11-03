import { Canvas } from "@react-three/fiber";
import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { HomeInfo, Loader, WeatherSystem, RainParticles, CursorTrail } from "../components";
import { Bird, Island, Plane, Sky } from "../models";
import useReducedMotion from "../hooks/useReducedMotion";
import useScrollProgress from "../hooks/useScrollProgress";

const hasWebGLSupport = () => {
  if (typeof document === "undefined") {
    return false;
  }

  const canvas = document.createElement("canvas");
  return Boolean(
    canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
  );
};

const StaticHomeFallback = ({ timedOut = false }) => (
  <div className='max-container flex min-h-screen flex-col justify-center'>
    <h1 className='head-text'>
      Hi, I'm{" "}
      <span className='blue-gradient_text font-semibold drop-shadow'>
        Adithya Chavali
      </span>{" "}
      👋
    </h1>
    <p className='mt-4 max-w-2xl text-lg text-slate-600'>
      Software Engineer and US citizen based in Atlanta, Georgia, finishing a
      B.Tech at IIIT Allahabad (graduating 2027).
    </p>
    <p className='mt-3 text-slate-500'>
      {timedOut
        ? "Having trouble loading the 3D scene. You can still explore the portfolio below."
        : "The interactive 3D scene is unavailable, but the portfolio is still accessible."}
    </p>
    <nav className='mt-8 flex flex-wrap gap-4 font-semibold text-blue-600'>
      <a href='/about' className='hover:underline'>About</a>
      <a href='/projects' className='hover:underline'>Projects</a>
      <a href='/contact' className='hover:underline'>Contact</a>
    </nav>
  </div>
);

class SceneErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("3D scene failed to load:", error);
  }

  render() {
    if (this.state.hasError) {
      return <StaticHomeFallback />;
    }

    return this.props.children;
  }
}

const SceneContent = ({
  currentStage,
  isRotating,
  prefersReducedMotion,
  islandPosition,
  islandScale,
  biplanePosition,
  biplaneScale,
  setIsRotating,
  setCurrentStage,
  scrollProgressRef,
  onReady,
}) => {
  useEffect(() => {
    onReady();
  }, [onReady]);

  return (
    <>
      <WeatherSystem currentStage={currentStage} />
      <RainParticles
        currentStage={currentStage}
        prefersReducedMotion={prefersReducedMotion}
      />
      <CursorTrail />

      <Bird
        scale={[0.02, 0.02, 0.02]}
        orbitRadius={32}
        orbitSpeed={0.22}
        altitude={6}
        direction={1}
        timeOffset={0}
        type="phoenix"
        prefersReducedMotion={prefersReducedMotion}
      />
      <Bird
        scale={[0.016, 0.016, 0.016]}
        orbitRadius={29}
        orbitSpeed={0.22}
        altitude={10}
        direction={1}
        timeOffset={(2 * Math.PI) / 3}
        type="ice-eagle"
        prefersReducedMotion={prefersReducedMotion}
      />
      <Bird
        scale={[0.026, 0.026, 0.026]}
        orbitRadius={38}
        orbitSpeed={0.22}
        altitude={7}
        direction={1}
        timeOffset={(4 * Math.PI) / 3}
        type="fire-dragon"
        prefersReducedMotion={prefersReducedMotion}
      />

      <Sky isRotating={isRotating} currentStage={currentStage} />
      <Island
        isRotating={isRotating}
        setIsRotating={setIsRotating}
        setCurrentStage={setCurrentStage}
        scrollProgressRef={scrollProgressRef}
        position={islandPosition}
        rotation={[0.1, 4.5, 0]}
        scale={islandScale}
        prefersReducedMotion={prefersReducedMotion}
      />
      <Plane
        isRotating={isRotating}
        position={biplanePosition}
        rotation={[0, 20.1, 0]}
        scale={biplaneScale}
      />
    </>
  );
};

const Home = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneTimedOut, setSceneTimedOut] = useState(false);
  const [webglAvailable] = useState(hasWebGLSupport);
  const [isTabVisible, setIsTabVisible] = useState(
    typeof document !== "undefined" ? !document.hidden : true
  );
  const [viewport, setViewport] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const scrollCueRef = useRef(null);

  // Pause the render loop when the tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // Update scroll cue opacity directly via ref (0 React renders during scroll)
  // Under prefers-reduced-motion, switch stage directly from scroll progress
  const handleScrollProgress = useCallback(
    (progress) => {
      if (scrollCueRef.current) {
        scrollCueRef.current.style.opacity = progress > 0.05 ? "0" : "1";
        scrollCueRef.current.style.pointerEvents = progress > 0.05 ? "none" : "auto";
      }

      if (prefersReducedMotion) {
        let stage = 1;
        if (progress < 0.25) stage = 1;
        else if (progress < 0.55) stage = 2;
        else if (progress < 0.85) stage = 3;
        else stage = 4;

        setCurrentStage((prev) => (prev !== stage ? stage : prev));
      }
    },
    [prefersReducedMotion]
  );

  const scrollProgressRef = useScrollProgress(sectionRef, handleScrollProgress);

  useEffect(() => {
    if (sceneReady || !webglAvailable) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setSceneTimedOut(true);
    }, 10000);

    return () => window.clearTimeout(timeoutId);
  }, [sceneReady, webglAvailable]);

  useEffect(() => {
    let timeoutId;

    const handleResize = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setViewport({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(timeoutId);
    };
  }, []);

  const adjustBiplaneForScreenSize = (viewportWidth) => {
    let screenScale, screenPosition;

    if (viewportWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const adjustIslandForScreenSize = (viewportWidth) => {
    let screenScale, screenPosition;

    if (viewportWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [1.0, 1.0, 1.0];
      screenPosition = [0, -6.5, -43.4];
    }

    return [screenScale, screenPosition];
  };

  const [biplaneScale, biplanePosition] = useMemo(
    () => adjustBiplaneForScreenSize(viewport.width),
    [viewport.width]
  );
  const [islandScale, islandPosition] = useMemo(
    () => adjustIslandForScreenSize(viewport.width),
    [viewport.width]
  );

  const cameraConfig = useMemo(() => {
    return {
      near: 0.1,
      far: 1000,
      fov: 75,
    };
  }, []);

  // Backdrop gradients matched to chronological day stages
  const backgroundStyles = {
    1: "bg-gradient-to-b from-[#e0f2fe] via-[#bae6fd] to-[#ffffff]", // Morning
    2: "bg-gradient-to-b from-[#fde047] via-[#fed7aa] to-[#ffedd5]", // Afternoon Golden
    3: "bg-gradient-to-b from-[#4c1d95] via-[#db2777] to-[#f97316]", // Evening Sunset
    4: "bg-gradient-to-b from-[#3b0764] via-[#1e1b4b] to-[#22c55e]", // Night Aurora
  };

  if (!webglAvailable || sceneTimedOut) {
    return (
      <section className={`w-full min-h-screen ${backgroundStyles[currentStage] || backgroundStyles[1]}`}>
        <StaticHomeFallback timedOut={sceneTimedOut} />
      </section>
    );
  }

  return (
    <section ref={sectionRef} className='w-full h-[400vh] relative'>
      {/* Sticky viewport pinning island, scene, popups, and scroll cue */}
      <div
        className={`sticky top-0 w-full h-screen overflow-hidden transition-all duration-1000 ${
          backgroundStyles[currentStage] || backgroundStyles[1]
        }`}
      >
        {/* Soft ambient scrim in top-left to guarantee text contrast against bright sky without a visible box */}
        <div
          className='absolute inset-0 pointer-events-none z-[5] bg-[radial-gradient(ellipse_at_top_left,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.22)_35%,transparent_65%)]'
          aria-hidden='true'
        />

        {/* Pinned HomeInfo text directly on sky with smooth cross-fade */}
        <div className='absolute z-10 pointer-events-none top-28 sm:top-32 left-0 right-0 px-6 flex justify-center md:top-36 md:left-20 md:right-auto md:px-0 md:justify-start'>
          <div className='pointer-events-auto w-full max-w-[480px]'>
            <HomeInfo currentStage={currentStage} />
          </div>
        </div>

        {/* Scroll cue with down arrow, fades out past ~5% scroll */}
        <div
          ref={scrollCueRef}
          className='absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-text-primary/70 transition-opacity duration-300 pointer-events-none select-none'
        >
          <span className='text-xs font-mono uppercase tracking-widest text-slate-700 font-semibold drop-shadow-sm'>
            Scroll
          </span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='2.5'
            stroke='currentColor'
            className='w-4 h-4 text-slate-700 animate-bounce drop-shadow-sm'
            aria-hidden='true'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
          </svg>
        </div>

        {/* 3D Scene Canvas */}
        <SceneErrorBoundary>
          <Canvas
            className={`w-full h-screen bg-transparent touch-pan-y ${
              isRotating ? "cursor-grabbing" : "cursor-grab"
            }`}
            camera={cameraConfig}
            dpr={viewport.width < 768 ? [1, 1.5] : [1, 2]}
            frameloop={isTabVisible ? "always" : "never"}
          >
            <Suspense fallback={<Loader />}>
              <SceneContent
                currentStage={currentStage}
                isRotating={isRotating}
                prefersReducedMotion={prefersReducedMotion}
                islandPosition={islandPosition}
                islandScale={islandScale}
                biplanePosition={biplanePosition}
                biplaneScale={biplaneScale}
                setIsRotating={setIsRotating}
                setCurrentStage={(stage) => {
                  if (stage !== null) {
                    setCurrentStage(stage);
                  }
                }}
                scrollProgressRef={scrollProgressRef}
                onReady={() => setSceneReady(true)}
              />
            </Suspense>
          </Canvas>
        </SceneErrorBoundary>
      </div>
    </section>
  );
};

export default Home;
