import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const RainParticles = ({ currentStage, prefersReducedMotion = false }) => {
  const pointsRef = useRef();
  const count = 800; // Optimal particle count for performance
  
  // Target opacity for the rain particles
  const targetOpacityRef = useRef(0);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Spread particles across a box around the island
      pos[i * 3] = (Math.random() - 0.5) * 60;     // X: -30 to 30
      pos[i * 3 + 1] = Math.random() * 45 - 15;    // Y: -15 to 30
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60; // Z: -30 to 30
      
      vel[i] = 12 + Math.random() * 18;             // Speed of fall
    }
    return [pos, vel];
  }, []);

  useFrame((state, delta) => {
    if (prefersReducedMotion) {
      if (pointsRef.current) {
        pointsRef.current.material.opacity = 0;
      }
      return;
    }

    const clampedDelta = Math.min(delta, 0.1);
    
    // Determine target opacity based on current stage
    const targetOpacity = currentStage === 3 ? 0.65 : 0;
    targetOpacityRef.current = THREE.MathUtils.lerp(targetOpacityRef.current, targetOpacity, 3 * clampedDelta);

    if (pointsRef.current) {
      pointsRef.current.material.opacity = targetOpacityRef.current;
      
      // If opacity is near 0, don't run heavy math
      if (targetOpacityRef.current > 0.01) {
        const positionsArr = pointsRef.current.geometry.attributes.position.array;
        for (let i = 0; i < count; i++) {
          positionsArr[i * 3 + 1] -= velocities[i] * clampedDelta * 1.8; // Move down
          // Reset when hitting ground (Y < -15)
          if (positionsArr[i * 3 + 1] < -15) {
            positionsArr[i * 3 + 1] = 25 + Math.random() * 5;
          }
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
      }
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a5c4e8"
        size={0.08}
        transparent
        opacity={0}
        depthWrite={false}
      />
    </points>
  );
};

export default RainParticles;
