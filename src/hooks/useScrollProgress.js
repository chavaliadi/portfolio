import { useEffect, useRef } from "react";

/**
 * useScrollProgress
 * Passive scroll listener wrapped in requestAnimationFrame.
 * Writes 0 -> 1 progress across the target element's scrollable height to a ref.
 * Does not trigger React re-renders on scroll.
 */
export function useScrollProgress(targetRef, onProgress) {
  const scrollProgressRef = useRef(0);
  const onProgressRef = useRef(onProgress);

  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    let rafId = null;

    const updateScrollProgress = () => {
      rafId = null;

      const target = targetRef?.current;
      let progress = 0;

      if (target) {
        const maxScroll = target.offsetHeight - window.innerHeight;
        const scrollY = window.scrollY - target.offsetTop;
        progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
      } else {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        progress = maxScroll > 0 ? Math.min(Math.max(window.scrollY / maxScroll, 0), 1) : 0;
      }

      scrollProgressRef.current = progress;

      if (onProgressRef.current) {
        onProgressRef.current(progress);
      }
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(updateScrollProgress);
    };

    // Compute initial progress
    updateScrollProgress();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [targetRef]);

  return scrollProgressRef;
}

export default useScrollProgress;

