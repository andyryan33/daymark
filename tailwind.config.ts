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
                        danger: {
                            DEFAULT: "#FF667F",
                            50: "#FFE6E0",
                            100: "#FFE6E0",
                            200: "#FFC9C1",
                            300: "#FFA5A3",
                            400: "#FF8C94",
                            500: "#FF667F",
                            600: "#DB4A6F",
                            700: "#B73361",
                            800: "#932053",
                            900: "#7A134A",
                        },
                        success: {
                            DEFAULT: "#11C16F",
                            50: "#CDFBD4",
                            100: "#CDFBD4",
                            200: "#9EF8B3",
                            300: "#6BEC96",
                            400: "#44D985",
                            500: "#11C16F",
                            600: "#0CA56D",
                            700: "#088A68",
                            800: "#056F5E",
                            900: "#035C56",
                        },
                        secondary: {
                            DEFAULT: "#949FFC",
                            50: "#E9ECFE",
                            100: "#E9ECFE",
                            200: "#D4DAFE",
                            300: "#BFC7FE",
                            400: "#AEB7FD",
                            500: "#949FFC",
                            600: "#6C76D8",
                            700: "#4A53B5",
                            800: "#2F3692",
                            900: "#1C2278",
                        },
                        warning: {
                            DEFAULT: "#FFC130",
                            50: "#FFF7D5",
                            100: "#FFF7D5",
                            200: "#FFEDAC",
                            300: "#FFE182",
                            400: "#FFD563",
                            500: "#FFC130",
                            600: "#DB9E23",
                            700: "#B77E18",
                            800: "#935F0F",
                            900: "#7A4A09",
                        }
                    },
                },
            },
        }),
    ],
};

export default config;