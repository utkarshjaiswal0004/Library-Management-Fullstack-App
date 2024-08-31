// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1d4ed8", // Dark Blue
        secondary: "#f59e0b", // Yellow
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
