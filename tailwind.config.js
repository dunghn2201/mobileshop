/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0A84FF",
          50: "#E8F4FF",
          100: "#CCE7FF",
          200: "#99CEFF",
          300: "#66B5FF",
          400: "#339CFF",
          500: "#0A84FF",
          600: "#0068CC",
          700: "#004E99",
          800: "#003466",
          900: "#001A33",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
