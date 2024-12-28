import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        navbar: "1px 1px 5px 0px #d9dfe2",
        forms: "0px 10px 15px -3px rgba(0,0,0,0.1)"
      }
    },
  },
  plugins: [],
};
export default config;
