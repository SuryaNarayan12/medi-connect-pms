/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        "primary-dark": "#1D4ED8",
        accent: "#FBBF24",
        "accent-dark": "#F59E0B",
      },
    },
  },
  plugins: [],
};
