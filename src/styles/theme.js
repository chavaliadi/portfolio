// Design tokens - single source of truth for portfolio theme
export const theme = {
  colors: {
    surface: {
      base: "var(--surface-base, #0b1020)",
      raised: "#131a2e",
      border: "rgba(148, 163, 184, 0.12)",
    },
    text: {
      primary: "#e8edf7",
      secondary: "#94a3b8",
    },
    accent: {
      primary: "#38bdf8",
      secondary: "#a78bfa",
    },
  },
  fontSize: {
    display: ["48px", { lineHeight: "56px", letterSpacing: "-0.02em" }],
    h2: ["32px", { lineHeight: "40px", letterSpacing: "-0.01em" }],
    h3: ["20px", { lineHeight: "28px" }],
    body: ["16px", { lineHeight: "26px" }],
    caption: ["14px", { lineHeight: "20px" }],
  },
  maxWidth: {
    content: "1100px",
  },
  spacing: {
    sectionDesktop: "96px",
    sectionMobile: "56px",
  },
};

export default theme;
