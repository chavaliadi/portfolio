import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import skyScene from "../assets/3d/sky.glb";

export function Sky({ isRotating, currentStage }) {
  const sky = useGLTF(skyScene);
  const skyRef = useRef();

  useFrame((_, delta) => {
    const clampedDelta = Math.min(delta, 0.1);
    if (isRotating) {
      skyRef.current.rotation.y += 0.15 * clampedDelta;
    }

    // Sky colors matching chronological stages
    const skyColors = {
      1: "#ffffff", // Morning: Original sky texture
      2: "#ffd8b8", // Afternoon: Warm golden-orange
      3: "#d946ef", // Evening: Pink/magenta sunset
      4: "#1e1b4b"  // Night: Indigo night
    };

    const targetColor = new THREE.Color(skyColors[currentStage] || skyColors[1]);

    // Smoothly transition the sky mesh colors, opacity, and emissive properties
    sky.scene.traverse((child) => {
      if (child.isMesh) {
        child.renderOrder = -1; // Force sky to render first in the background queue
        
        if (child.material) {
          // Only enable transparency and disable depthWrite during Stage 4 (Night)
          if (currentStage === 4) {
            child.material.transparent = true;
            child.material.depthWrite = false;
          } else {
            child.material.transparent = false;
            child.material.depthWrite = true;
            child.material.opacity = 1.0;
          }
          
          // Lerp color
          child.material.color.lerp(targetColor, 1.8 * clampedDelta);
          
          // Lerp opacity for Stage 4
          if (child.material.transparent) {
            const targetOpacity = 0.45;
            child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, targetOpacity, 1.8 * clampedDelta);
          }

          if (child.material.emissive) {
            child.material.emissive.copy(targetColor).multiplyScalar(0.25);
          }
        }
      }
    });
  });

  return (
    <mesh ref={skyRef}>
      <primitive object={sky.scene} />
    </mesh>
  );
}
