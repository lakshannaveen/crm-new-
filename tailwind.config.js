/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        dockyard: {
          blue: "#1e3a8a",
          navy: "#0f172a",
          light: "#93c5fd",
          dark: "#1e293b",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-thin": {
          "scrollbar-width": "thin",
        },
        ".scrollbar-thumb-gray-400": {
          "scrollbar-color": "rgb(156, 163, 175) rgb(243, 244, 246)",
        },
        ".dark .scrollbar-thumb-blue-500": {
          "scrollbar-color": "rgb(59, 130, 246) rgb(15, 23, 42)",
        },
        ".scrollbar-custom": {
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgb(243, 244, 246)",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgb(156, 163, 175)",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "rgb(107, 114, 128)",
          },
        },
        ".dark .scrollbar-custom": {
          "&::-webkit-scrollbar-track": {
            background: "rgb(15, 23, 42)",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgb(59, 130, 246)",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "rgb(37, 99, 235)",
          },
        },
      });
    },
  ],
};
