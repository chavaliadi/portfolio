import { theme as designTokens } from "./src/styles/theme.js";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: designTokens.colors.surface,
        text: designTokens.colors.text,
        accent: designTokens.colors.accent,
        "text-primary": designTokens.colors.text.primary,
        "text-secondary": designTokens.colors.text.secondary,
        "accent-primary": designTokens.colors.accent.primary,
        "accent-secondary": designTokens.colors.accent.secondary,
        gray: {
          200: "#D5DAE1"
        },
        black: {
          DEFAULT: "#000",
          500: "#1D2235"
        },
        blue: {
          500: "#2b77e7"
        }
      },
      fontSize: designTokens.fontSize,
      maxWidth: {
        content: designTokens.maxWidth.content,
      },
      fontFamily: {
        worksans: ["Work Sans", "sans-serif"],
        poppins: ['Poppins', "sans-serif"]
      },
      boxShadow: {
        card: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
        glow: '0 0 25px -5px rgba(56, 189, 248, 0.15)',
      }
    },
  },
  plugins: [],
}
