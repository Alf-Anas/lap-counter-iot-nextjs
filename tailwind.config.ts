import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./containers/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                "primary-color": "#00796b",
                "primary-color-light": "#009688",
                "secondary-color": "#4caf50",
                "secondary-color-light": "#8bc34a",
                "accent-color": "#ff9800",
                "accent-color-light": "#ffcc80",
                // "siasn-orange": "#ffc432",
                // "siasn-purple": "#500094",
                // "siasn-dark": "#2d3c6c",
            },
        },
    },
    plugins: [],
};
export default config;
