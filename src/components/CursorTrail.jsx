import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CursorTrail = () => {
  const pointsRef = useRef();
  const count = 40; // Optimal particle count
  
  const intersectionPoint = useMemo(() => new THREE.Vector3(), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  // Positions, ages, and velocities
  const [positions, ages, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ags = new Float32Array(count);
    const vels = [];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = 9999;
      pos[i * 3 + 1] = 9999;
      pos[i * 3 + 2] = 9999;
      ags[i] = 1.0; // Inactive
      vels.push(new THREE.Vector3());
    }
    return [pos, ags, vels];
  }, []);

  const lastPos = useMemo(() => new THREE.Vector3(), []);
  const activeIndex = useRef(0);

  useFrame((state, delta) => {
    const clampedDelta = Math.min(delta, 0.1);
    
    // Project mouse to 3D space slightly in front of camera
    raycaster.setFromCamera(state.pointer, state.camera);
    
    const camDir = new THREE.Vector3();
    state.camera.getWorldDirection(camDir);
    const planeNormal = camDir.clone().negate();
    
    // Intersect with plane 12 units in front of the camera
    const planeTarget = state.camera.position.clone().add(camDir.clone().multiplyScalar(12));
    const targetPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(planeNormal, planeTarget);
    
    raycaster.ray.intersectPlane(targetPlane, intersectionPoint);

    // If mouse has moved, emit a particle
    if (intersectionPoint.distanceTo(lastPos) > 0.05) {
      const idx = activeIndex.current;
      positions[idx * 3] = intersectionPoint.x + (Math.random() - 0.5) * 0.15;
      positions[idx * 3 + 1] = intersectionPoint.y + (Math.random() - 0.5) * 0.15;
      positions[idx * 3 + 2] = intersectionPoint.z + (Math.random() - 0.5) * 0.15;
      
      ages[idx] = 0.0; // Reset age
      
      // Drift velocity
      velocities[idx].set(
        (Math.random() - 0.5) * 0.8,
        (Math.random() - 0.5) * 0.8 + 0.3, // Slight upward drift
        (Math.random() - 0.5) * 0.8
      );

      activeIndex.current = (activeIndex.current + 1) % count;
      lastPos.copy(intersectionPoint);
    }

    // Update positions and ages
    if (pointsRef.current) {
      const positionsArr = pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        if (ages[i] < 1.0) {
          ages[i] += clampedDelta * 2.0; // Decay rate
          
          // Apply velocity
          positionsArr[i * 3] += velocities[i].x * clampedDelta;
          positionsArr[i * 3 + 1] += velocities[i].y * clampedDelta;
          positionsArr[i * 3 + 2] += velocities[i].z * clampedDelta;
        } else {
          // Hide particle off-screen
          positionsArr[i * 3] = 9999;
          positionsArr[i * 3 + 1] = 9999;
          positionsArr[i * 3 + 2] = 9999;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
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
        color="#60efff"
        size={0.12}
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
};

export default CursorTrail;
