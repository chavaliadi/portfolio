/**
 * IMPORTANT: Loading glTF models into a Three.js scene is a lot of work.
 * Before we can configure or animate our model’s meshes, we need to iterate through
 * each part of our model’s meshes and save them separately.
 *
 * But luckily there is an app that turns gltf or glb files into jsx components
 * For this model, visit https://gltf.pmnd.rs/
 * And get the code. And then add the rest of the things.
 * YOU DON'T HAVE TO WRITE EVERYTHING FROM SCRATCH
 */

import { a } from "@react-spring/three";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import islandScene from "../assets/3d/island.glb";

const START_ROTATION = 4.50; // morning (t = 0)
const END_ROTATION = 4.50 - 2 * Math.PI; // morning return (t = 1, -1.7831853...)

// Canonical stage centres along the monotonically decreasing rotation sweep:
// 4.50 (Morning, t=0) -> 2.50 (Afternoon, t≈0.318) -> 1.075 (Evening, t≈0.545) -> 5.653 (Night, t≈0.816) -> 4.50 (Morning return, t=1.0)
const STAGE_CENTERS = [
  { stage: 1, center: 4.50 },
  { stage: 2, center: 2.50 },
  { stage: 3, center: 1.075 },
  { stage: 4, center: 5.653 },
];

const getNearestStage = (rotationY) => {
  const normalized = ((rotationY % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  let nearest = 1;
  let minDistance = Infinity;

  for (let i = 0; i < STAGE_CENTERS.length; i++) {
    const { stage, center } = STAGE_CENTERS[i];
    const diff = Math.abs(normalized - center);
    const circularDist = Math.min(diff, 2 * Math.PI - diff);
    if (circularDist < minDistance) {
      minDistance = circularDist;
      nearest = stage;
    }
  }
  return nearest;
};

export function Island({
  isRotating,
  setIsRotating,
  setCurrentStage,
  scrollProgressRef,
  prefersReducedMotion = false,
  ...props
}) {
  const islandRef = useRef();
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(islandScene, "/draco/gltf/");

  const lastX = useRef(0);
  const lastY = useRef(0);
  const isPointerDown = useRef(false);
  const pointerTypeRef = useRef("mouse");
  const activeStageRef = useRef(1);

  // Handle pointer down (mouse or touch)
  const handlePointerDown = (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    isPointerDown.current = true;
    pointerTypeRef.current = event.pointerType || (event.touches ? "touch" : "mouse");
    setIsRotating(true);

    const clientX = event.clientX ?? (event.touches ? event.touches[0].clientX : 0);
    const clientY = event.clientY ?? (event.touches ? event.touches[0].clientY : 0);
    lastX.current = clientX;
    lastY.current = clientY;
  };

  const handlePointerUp = () => {
    isPointerDown.current = false;
    setIsRotating(false);
  };

  const handlePointerMove = (event) => {
    if (!isPointerDown.current) return;

    const clientX = event.clientX ?? (event.touches ? event.touches[0].clientX : 0);
    const clientY = event.clientY ?? (event.touches ? event.touches[0].clientY : 0);

    const deltaX = (clientX - lastX.current) / viewport.width;
    const deltaY = (clientY - lastY.current) / viewport.height;

    // Horizontal drag keeps rotating the island
    islandRef.current.rotation.y += deltaX * 0.01 * Math.PI;

    // Remove vertical drag-to-tilt on touch devices: keep vertical tilt on mouse drag only
    if (pointerTypeRef.current === "mouse") {
      islandRef.current.rotation.x = THREE.MathUtils.clamp(
        islandRef.current.rotation.x + deltaY * 0.005 * Math.PI,
        -0.1,
        0.35
      );
    }

    lastX.current = clientX;
    lastY.current = clientY;
  };

  // Keep existing arrow-key controls
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);
      islandRef.current.rotation.y += 0.015 * Math.PI;
    } else if (event.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);
      islandRef.current.rotation.y -= 0.015 * Math.PI;
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, viewport]);

  // Frame update
  useFrame(() => {
    if (!islandRef.current) return;

    if (prefersReducedMotion) {
      // Under reduced motion: hold one fixed rotation, no scroll-linked movement
      islandRef.current.rotation.y = START_ROTATION;
      islandRef.current.rotation.x = 0.1;
      return;
    }

    const t = scrollProgressRef?.current ?? 0;
    const targetY = START_ROTATION + t * (END_ROTATION - START_ROTATION);

    if (!isRotating) {
      // Ease rotation toward the scroll-derived target (lerp ~0.08 per frame)
      islandRef.current.rotation.y = THREE.MathUtils.lerp(
        islandRef.current.rotation.y,
        targetY,
        0.08
      );
      // Ease tilt back to upright position (0.1)
      islandRef.current.rotation.x = THREE.MathUtils.lerp(
        islandRef.current.rotation.x,
        0.1,
        0.08
      );
    }

    // Refactor stage detection out of isRotating branch so it runs every frame
    const currentRotationY = islandRef.current.rotation.y;
    const stage = getNearestStage(currentRotationY);
    if (stage !== activeStageRef.current) {
      activeStageRef.current = stage;
      setCurrentStage(stage);
    }
  });

  return (
    // {Island 3D model from: https://sketchfab.com/3d-models/foxs-islands-163b68e09fcc47618450150be7785907}
    <a.group ref={islandRef} {...props}>
      <mesh
        geometry={nodes.polySurface944_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface945_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface946_tree2_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface947_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface948_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface949_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.pCube11_rocks1_0.geometry}
        material={materials.PaletteMaterial001}
      />
    </a.group>
  );
}
