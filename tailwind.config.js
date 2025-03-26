/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        twinkle: "twinkle 4s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: 0.2, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.2)" },
        },
      },
    },
  },
  plugins: [],
};
