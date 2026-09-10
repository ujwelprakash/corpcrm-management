
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        "bg-soft": "rgb(var(--color-bg-soft) / <alpha-value>)",
        "bg-muted": "rgb(var(--color-bg-muted) / <alpha-value>)",

        // Text
        text: "rgb(var(--color-text) / <alpha-value>)",
        "text-soft": "rgb(var(--color-text-soft) / <alpha-value>)",
        "text-muted": "rgb(var(--color-text-muted) / <alpha-value>)",

        // Surface
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-raised": "rgb(var(--color-surface-raised) / <alpha-value>)",

        // Border
        border: "rgb(var(--color-border) / <alpha-value>)",
        "border-soft": "rgb(var(--color-border-soft) / <alpha-value>)",

        // Accent (important)
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-hover": "rgb(var(--accent-hover) / <alpha-value>)",
        "accent-light": "rgb(var(--accent-light) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
