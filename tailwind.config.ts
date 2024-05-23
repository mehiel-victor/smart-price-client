import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      'black': '#0c0a09',
      'white': '#fafaf9',
      'primary-gray': '#404040',
      'secondary-gray': '#e5e5e5',
      'blue': '#0369a1',
      'opacity-gray': 'rgba(180, 80, 57, 8.1)'
    },
  },
  plugins: [],
};
export default config;
