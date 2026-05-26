import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";

import { HomeInfo, Loader, WeatherSystem, RainParticles, CursorTrail } from "../components";
import { Bird, Island, Plane, Sky } from "../models";

const Home = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [activePopupStage, setActivePopupStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);

  const adjustBiplaneForScreenSize = () => {
    let screenScale, screenPosition;

    // If screen width is less than 768px, adjust the scale and position
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [1.0, 1.0, 1.0];
      screenPosition = [0, -6.5, -43.4];
    }

    return [screenScale, screenPosition];
  };

  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
  const [islandScale, islandPosition] = adjustIslandForScreenSize();

  // Backdrop gradients matched to chronological day stages
  const backgroundStyles = {
    1: "bg-gradient-to-b from-[#e0f2fe] via-[#bae6fd] to-[#ffffff]", // Morning
    2: "bg-gradient-to-b from-[#fde047] via-[#fed7aa] to-[#ffedd5]", // Afternoon Golden
    3: "bg-gradient-to-b from-[#4c1d95] via-[#db2777] to-[#f97316]", // Evening Sunset
    4: "bg-gradient-to-b from-[#3b0764] via-[#1e1b4b] to-[#22c55e]"  // Night Aurora
  };

  return (
    <section className={`w-full h-screen relative transition-all duration-1000 ${backgroundStyles[currentStage] || backgroundStyles[1]}`}>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {activePopupStage && <HomeInfo currentStage={activePopupStage} />}
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <WeatherSystem currentStage={currentStage} />
          <RainParticles currentStage={currentStage} />
          <CursorTrail />

          {/* Render three distinct colored birds: Phoenix, Ice Eagle, and Fire Dragon */}
          <Bird
            scale={[0.02, 0.02, 0.02]}
            orbitRadius={24}
            orbitSpeed={0.25}
            altitude={6}
            direction={1}
            timeOffset={0}
            type="phoenix"
          />
          <Bird
            scale={[0.016, 0.016, 0.016]}
            orbitRadius={29}
            orbitSpeed={0.35}
            altitude={10}
            direction={-1}
            timeOffset={Math.PI}
            type="ice-eagle"
          />
          <Bird
            scale={[0.026, 0.026, 0.026]}
            orbitRadius={34}
            orbitSpeed={0.18}
            altitude={7}
            direction={1}
            timeOffset={Math.PI / 2}
            type="fire-dragon"
          />
          
          <Sky isRotating={isRotating} currentStage={currentStage} />
          <Island
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={(stage) => {
              setActivePopupStage(stage);
              if (stage !== null) {
                setCurrentStage(stage);
              }
            }}
            position={islandPosition}
            rotation={[0.1, 4.7077, 0]}
            scale={islandScale}
          />
          <Plane
            isRotating={isRotating}
            position={biplanePosition}
            rotation={[0, 20.1, 0]}
            scale={biplaneScale}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
