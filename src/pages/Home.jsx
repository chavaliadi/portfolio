import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useMemo, useState } from "react";

import { HomeInfo, Loader, WeatherSystem, RainParticles, CursorTrail } from "../components";
import { Bird, Island, Plane, Sky } from "../models";
import useReducedMotion from "../hooks/useReducedMotion";

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
        orbitRadius={24}
        orbitSpeed={0.25}
        altitude={6}
        direction={1}
        timeOffset={0}
        type="phoenix"
        prefersReducedMotion={prefersReducedMotion}
      />
      <Bird
        scale={[0.016, 0.016, 0.016]}
        orbitRadius={29}
        orbitSpeed={0.35}
        altitude={10}
        direction={-1}
        timeOffset={Math.PI}
        type="ice-eagle"
        prefersReducedMotion={prefersReducedMotion}
      />
      <Bird
        scale={[0.026, 0.026, 0.026]}
        orbitRadius={34}
        orbitSpeed={0.18}
        altitude={7}
        direction={1}
        timeOffset={Math.PI / 2}
        type="fire-dragon"
        prefersReducedMotion={prefersReducedMotion}
      />

      <Sky isRotating={isRotating} currentStage={currentStage} />
      <Island
        isRotating={isRotating}
        setIsRotating={setIsRotating}
        setCurrentStage={setCurrentStage}
        position={islandPosition}
        rotation={[0.1, 4.7077, 0]}
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
  const [activePopupStage, setActivePopupStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneTimedOut, setSceneTimedOut] = useState(false);
  const [webglAvailable] = useState(hasWebGLSupport);
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const prefersReducedMotion = useReducedMotion();

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

    // If screen width is less than 768px, adjust the scale and position
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
  }, [viewport.height, viewport.width]);

  // Backdrop gradients matched to chronological day stages
  const backgroundStyles = {
    1: "bg-gradient-to-b from-[#e0f2fe] via-[#bae6fd] to-[#ffffff]", // Morning
    2: "bg-gradient-to-b from-[#fde047] via-[#fed7aa] to-[#ffedd5]", // Afternoon Golden
    3: "bg-gradient-to-b from-[#4c1d95] via-[#db2777] to-[#f97316]", // Evening Sunset
    4: "bg-gradient-to-b from-[#3b0764] via-[#1e1b4b] to-[#22c55e]"  // Night Aurora
  };

  if (!webglAvailable || sceneTimedOut) {
    return (
      <section className={`w-full min-h-screen ${backgroundStyles[currentStage] || backgroundStyles[1]}`}>
        <StaticHomeFallback timedOut={sceneTimedOut} />
      </section>
    );
  }

  return (
    <section className={`w-full h-screen relative transition-all duration-1000 ${backgroundStyles[currentStage] || backgroundStyles[1]}`}>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {activePopupStage && <HomeInfo currentStage={activePopupStage} />}
      </div>

      <SceneErrorBoundary>
        <Canvas
          className={`w-full h-screen bg-transparent ${
            isRotating ? "cursor-grabbing" : "cursor-grab"
          }`}
          camera={cameraConfig}
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
                setActivePopupStage(stage);
                if (stage !== null) {
                  setCurrentStage(stage);
                }
              }}
              onReady={() => setSceneReady(true)}
            />
          </Suspense>
        </Canvas>
      </SceneErrorBoundary>
    </section>
  );
};

export default Home;
