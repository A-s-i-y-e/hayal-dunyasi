/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        twinkle: "twinkle 4s ease-in-out infinite",
        "shooting-star": "shooting-star 8s linear infinite",
        "float-slow": "float-slow 20s linear infinite",
        rotate: "rotate 30s linear infinite",
        fadeIn: "fadeIn 1s ease-out forwards",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.3",
            transform: "scale(0.8)",
          },
        },
        "shooting-star": {
          "0%": {
            transform: "translateX(200%) translateY(-200%)",
            opacity: "0",
          },
          "10%, 90%": {
            opacity: "1",
          },
          "100%": {
            transform: "translateX(-200%) translateY(200%)",
            opacity: "0",
          },
        },
        "float-slow": {
          "0%": {
            transform: "translateY(0) translateX(0) rotate(0deg)",
          },
          "50%": {
            transform: "translateY(-20px) translateX(20px) rotate(180deg)",
          },
          "100%": {
            transform: "translateY(0) translateX(0) rotate(360deg)",
          },
        },
        rotate: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        fadeIn: {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [],
};
