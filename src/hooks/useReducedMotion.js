import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return false;
    }

    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    if (!window.matchMedia) {
      return undefined;
    }

    const mediaQueryList = window.matchMedia(QUERY);
    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    setPrefersReducedMotion(mediaQueryList.matches);

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", handleChange);
      return () => mediaQueryList.removeEventListener("change", handleChange);
    }

    mediaQueryList.addListener(handleChange);
    return () => mediaQueryList.removeListener(handleChange);
  }, []);

  return prefersReducedMotion;
};

export default useReducedMotion;
