import React from "react";
import useReducedMotion from "../hooks/useReducedMotion";

const AuroraBackground = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className='fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden bg-surface-base'
      style={{ overflow: "hidden" }}
      aria-hidden='true'
    >
      {/* Radial Gradient Blob 1 - Accent Primary (Sky Blue) */}
      <div
        className={`absolute -top-16 -left-10 w-[350px] h-[350px] sm:w-[700px] sm:h-[700px] rounded-full blur-[70px] sm:blur-[140px] opacity-[0.14] pointer-events-none ${
          prefersReducedMotion ? "" : "aurora-drift-1"
        }`}
        style={{
          background: "radial-gradient(circle, #38bdf8 0%, rgba(56, 189, 248, 0) 70%)",
        }}
      />

      {/* Radial Gradient Blob 2 - Accent Secondary (Violet) */}
      <div
        className={`absolute top-[30%] -right-10 w-[320px] h-[320px] sm:w-[650px] sm:h-[650px] rounded-full blur-[70px] sm:blur-[140px] opacity-[0.12] pointer-events-none ${
          prefersReducedMotion ? "" : "aurora-drift-2"
        }`}
        style={{
          background: "radial-gradient(circle, #a78bfa 0%, rgba(167, 139, 250, 0) 70%)",
        }}
      />

      {/* Radial Gradient Blob 3 - Complementary Accent (Sky Blue & Lavender) */}
      <div
        className={`absolute -bottom-20 left-[10%] w-[380px] h-[380px] sm:w-[750px] sm:h-[750px] rounded-full blur-[80px] sm:blur-[150px] opacity-[0.13] pointer-events-none ${
          prefersReducedMotion ? "" : "aurora-drift-3"
        }`}
        style={{
          background: "radial-gradient(circle, #38bdf8 0%, #818cf8 40%, rgba(56, 189, 248, 0) 70%)",
        }}
      />

      {/* Inline SVG noise texture (~3% opacity) to prevent gradient banding */}
      <svg
        className='fixed inset-0 w-full h-full pointer-events-none opacity-[0.03]'
        xmlns='http://www.w3.org/2000/svg'
      >
        <filter id='aurora-grain-filter'>
          <feTurbulence
            type='fractalNoise'
            baseFrequency='0.8'
            numOctaves='3'
            stitchTiles='stitch'
          />
          <feColorMatrix
            type='matrix'
            values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0'
          />
        </filter>
        <rect width='100%' height='100%' filter='url(#aurora-grain-filter)' />
      </svg>
    </div>
  );
};

export default AuroraBackground;
