// Mirrors the motion values declared in globals.css @theme, for GSAP timelines.
export const motion = {
  easeSoft: "cubic-bezier(0.22, 1, 0.36, 1)",
  dur: { fast: 0.3, base: 0.6, slow: 0.9 },
  stagger: 0.08,
} as const;
