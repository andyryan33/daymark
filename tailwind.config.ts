import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              50: "#EAF7FA",
              100: "#EAF7FA",
              200: "#D6EDF6",
              300: "#B8D5E3",
              400: "#98B6C9",
              500: "#708EA5",
              600: "#51708D",
              700: "#385476",
              800: "#233B5F",
              900: "#15294F",
              foreground: "#FFFFFF",
              DEFAULT: "#708EA5",
            },
          },
        },
      },
    }),
  ],
};

export default config;