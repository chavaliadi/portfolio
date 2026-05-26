import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const WeatherSystem = ({ currentStage }) => {
  const ambientRef = useRef();
  const directionalRef = useRef();
  const hemisphereRef = useRef();

  // Define target values for chronological stages: Morning (1) -> Afternoon (2) -> Evening (3) -> Night (4)
  const weatherConfig = {
    1: { // Stage 1 - Morning (Welcome)
      ambientIntensity: 0.9,
      ambientColor: "#ffffff",
      dirIntensity: 2.5,
      dirColor: "#ffffff",
      skyColor: "#bae6fd",
      groundColor: "#0f172a"
    },
    2: { // Stage 2 - Afternoon (About - Sunny Orange)
      ambientIntensity: 0.8,
      ambientColor: "#fed7aa", // Warm light orange
      dirIntensity: 2.4,
      dirColor: "#f97316", // Golden orange
      skyColor: "#fdba74",
      groundColor: "#451a03"
    },
    3: { // Stage 3 - Evening (Projects - Pink Sunset matching photo)
      ambientIntensity: 0.75,
      ambientColor: "#fef08a", // Warm golden yellow
      dirIntensity: 2.2,
      dirColor: "#ff3366", // Pink-red glow
      skyColor: "#ff007f", // Magenta
      groundColor: "#312e81" // Indigo
    },
    4: { // Stage 4 - Night (Contact - Aurora matching photo)
      ambientIntensity: 0.9,      // Boosted for high visibility
      ambientColor: "#8b5cf6",      // Soft purple ambient
      dirIntensity: 2.2,          // Boosted keylight
      dirColor: "#34d399",          // Aurora green directional keylight
      skyColor: "#1e1b4b",          // Dark sky color
      groundColor: "#064e3b"        // Dark green ground tint
    }
  };

  useFrame((state, delta) => {
    // Clamping delta to avoid huge jumps on tab switch
    const clampedDelta = Math.min(delta, 0.1);
    const config = weatherConfig[currentStage] || weatherConfig[1];
    
    // Lerp ambient light
    if (ambientRef.current) {
      ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, config.ambientIntensity, 2 * clampedDelta);
      ambientRef.current.color.lerp(new THREE.Color(config.ambientColor), 2 * clampedDelta);
    }
    
    // Lerp directional light
    if (directionalRef.current) {
      directionalRef.current.intensity = THREE.MathUtils.lerp(directionalRef.current.intensity, config.dirIntensity, 2 * clampedDelta);
      directionalRef.current.color.lerp(new THREE.Color(config.dirColor), 2 * clampedDelta);
    }

    // Lerp hemisphere light
    if (hemisphereRef.current) {
      hemisphereRef.current.intensity = THREE.MathUtils.lerp(hemisphereRef.current.intensity, config.ambientIntensity, 2 * clampedDelta);
      hemisphereRef.current.color.lerp(new THREE.Color(config.skyColor), 2 * clampedDelta);
      hemisphereRef.current.groundColor.lerp(new THREE.Color(config.groundColor), 2 * clampedDelta);
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.8} />
      <directionalLight ref={directionalRef} position={[1, 1, 1]} intensity={2} />
      <hemisphereLight
        ref={hemisphereRef}
        skyColor='#b1e1ff'
        groundColor='#000000'
        intensity={1}
      />
    </>
  );
};

export default WeatherSystem;
