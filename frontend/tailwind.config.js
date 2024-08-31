// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0491FD", // Dark Blue
        secondary: "#FFC247", // Yellow
        accent: "#ef4444", // Red
        backgroundLight: "#f3f4f6", // Light Gray
        backgroundDark: "#111827", // Gray
        textLight: "#f9fafb", // Near White
        textDark: "#333333", // Almost Black
        border: "#d1d5db",
      },
      fontFamily: {
        sans: ["Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
