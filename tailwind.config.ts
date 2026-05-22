import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#061525",
        panel: "#0b2138",
        line: "rgba(125, 211, 252, 0.24)"
      },
      boxShadow: {
        glow: "0 0 44px rgba(56, 189, 248, 0.2)"
      }
    }
  },
  plugins: []
};

export default config;
