import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1A2F23",
          foreground: "#FFFFFF",
          hover: "#243D2E",
        },
        urgency: {
          DEFAULT: "#B71C1C",
          foreground: "#FFFFFF",
          hover: "#D32F2F",
        },
        success: {
          DEFAULT: "#2E7D32",
          foreground: "#FFFFFF",
          hover: "#388E3C",
        },
        warning: {
          DEFAULT: "#FF8F00",
          foreground: "#212121",
          hover: "#FFA000",
        },
        error: {
          DEFAULT: "#D32F2F",
          foreground: "#FFFFFF",
          hover: "#E53935",
        },
        background: {
          DEFAULT: "#F5F5F5",
          card: "#FFFFFF",
          muted: "#EEEEEE",
        },
        foreground: {
          DEFAULT: "#212121",
          muted: "#757575",
        },
        border: "#E0E0E0",
      },
      fontFamily: {
        sans: ["Roboto", "Public Sans", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
