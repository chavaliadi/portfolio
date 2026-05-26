import { useEffect, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";

import birdScene from "../assets/3d/bird.glb";

// 3D Model from: https://sketchfab.com/3d-models/phoenix-bird-844ba0cf144a413ea92c779f18912042
export function Bird({
  scale = [0.003, 0.003, 0.003],
  orbitRadius = 22,
  orbitSpeed = 0.3,
  altitude = 5,
  direction = 1,
  timeOffset = 0,
  type = "phoenix"
}) {
  const birdRef = useRef();

  // Load the 3D model and animations from the GLTF file
  const { scene, animations } = useGLTF(birdScene);

  // Clone the scene model to allow multiple instances with independent skeletal animations
  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh && child.material) {
        // Clone material to prevent cross-contamination between birds
        child.material = child.material.clone();
        
        if (type === "phoenix") {
          // Fiery Phoenix: Keep original warm texture completely untouched as requested
        } else if (type === "ice-eagle") {
          // Ice Eagle/Phoenix: Remove texture map, make a translucent glowing cyan/white ice body
          child.material.map = null;
          child.material.color = new THREE.Color("#e0f2fe");
          child.material.roughness = 0.1;
          child.material.metalness = 0.1;
          child.material.transparent = true;
          child.material.opacity = 0.85;
          if (child.material.emissive) {
            child.material.emissive = new THREE.Color("#00f3ff");
            child.material.emissiveIntensity = 4.0;
          }
        } else if (type === "fire-dragon") {
          // Red Fire Dragon: Remove texture map, rich crimson red body with bright glowing red accents
          child.material.map = null;
          child.material.color = new THREE.Color("#991b1b");
          child.material.roughness = 0.2;
          child.material.metalness = 0.6;
          if (child.material.emissive) {
            child.material.emissive = new THREE.Color("#ef4444");
            child.material.emissiveIntensity = 3.5;
          }
        }
      }
    });
  }, [clonedScene, type]);

  // Hook animations to the specific cloned scene instance ref
  const sceneRef = useRef();
  const { actions } = useAnimations(animations, sceneRef);

  useEffect(() => {
    if (actions["Take 001"]) {
      actions["Take 001"].play();
    }
  }, [actions]);

  useFrame(({ clock }) => {
    const elapsed = clock.elapsedTime * orbitSpeed + timeOffset;

    // Calculate position along circular orbit around the island center (0, -43.4)
    const angle = direction * elapsed;
    const x = Math.sin(angle) * orbitRadius;
    const z = Math.cos(angle) * orbitRadius - 43.4;

    // Gentle up/down bobbing motion
    const bobbing = Math.sin(clock.elapsedTime * 2 + timeOffset) * 0.3;
    const y = altitude + bobbing;

    birdRef.current.position.set(x, y, z);

    // Tangent velocity vector components
    const dx = direction * Math.cos(angle);
    const dz = -direction * Math.sin(angle);

    // Set rotation to face tangent to orbit path, with 45-degree offset for the model
    birdRef.current.rotation.y = Math.atan2(dx, dz) - 3 * Math.PI / 4;
  });

  const initialPosition = useMemo(() => {
    const angle = direction * timeOffset;
    const x = Math.sin(angle) * orbitRadius;
    const z = Math.cos(angle) * orbitRadius - 43.4;
    return [x, altitude, z];
  }, [direction, timeOffset, orbitRadius, altitude]);

  return (
    <mesh ref={birdRef} position={initialPosition} scale={scale}>
      <primitive ref={sceneRef} object={clonedScene} />
    </mesh>
  );
}

useGLTF.preload(birdScene);
