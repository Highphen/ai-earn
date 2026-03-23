import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#17212b",
          secondary: "#232e3c",
          tertiary: "#1c2733",
        },
        accent: {
          primary: "#FFD60A",
          secondary: "#FFC107",
          dim: "rgba(255,214,10,0.12)",
        },
        positive: {
          DEFAULT: "#00C805",
          dim: "rgba(0,200,5,0.12)",
        },
        negative: {
          DEFAULT: "#FF6B35",
          dim: "rgba(255,107,53,0.12)",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#8899A6",
          muted: "#54677B",
        },
        border: {
          DEFAULT: "#2F3B47",
          light: "#3A4854",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        mono: [
          '"SF Mono"',
          '"JetBrains Mono"',
          '"Fira Code"',
          "monospace",
        ],
      },
      borderRadius: {
        card: "20px",
      },
      animation: {
        "reward-pop": "reward-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "fade-up": "fade-up 0.3s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        "reward-pop": {
          "0%": { transform: "scale(0) translateY(10px)", opacity: "0" },
          "60%": { transform: "scale(1.15) translateY(-5px)", opacity: "1" },
          "100%": { transform: "scale(1) translateY(0)", opacity: "1" },
        },
        "fade-up": {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
