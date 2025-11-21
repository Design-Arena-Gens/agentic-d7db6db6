import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#EF4444",
          dark: "#B91C1C",
          light: "#FCA5A5"
        }
      },
      boxShadow: {
        neon: "0 10px 30px rgba(239, 68, 68, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
