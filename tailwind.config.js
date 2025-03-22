/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        twinkle: "twinkle 3s ease-in-out infinite",
        "float-slow": "float 15s ease-in-out infinite",
        "shooting-star": "shooting-star 3s ease-out infinite",
        swim: "swim 10s ease-in-out infinite",
        sway: "sway 3s ease-in-out infinite",
        "leaf-fall": "leaf-fall 10s ease-in-out infinite",
        firefly: "firefly 4s ease-in-out infinite",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: 0.2 },
          "50%": { opacity: 1 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(10deg)" },
        },
        "shooting-star": {
          "0%": { transform: "translateX(0) translateY(0)", opacity: 1 },
          "100%": {
            transform: "translateX(200px) translateY(200px)",
            opacity: 0,
          },
        },
        swim: {
          "0%, 100%": { transform: "translateX(0) translateY(0) rotate(0deg)" },
          "25%": {
            transform: "translateX(30px) translateY(-10px) rotate(10deg)",
          },
          "50%": { transform: "translateX(0) translateY(0) rotate(0deg)" },
          "75%": {
            transform: "translateX(-30px) translateY(10px) rotate(-10deg)",
          },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-10deg)" },
          "50%": { transform: "rotate(10deg)" },
        },
        "leaf-fall": {
          "0%": { transform: "translateY(-100%) rotate(0deg)", opacity: 0 },
          "10%": { opacity: 1 },
          "100%": { transform: "translateY(100vh) rotate(360deg)", opacity: 0 },
        },
        firefly: {
          "0%, 100%": { opacity: 0.2, transform: "translate(0, 0)" },
          "50%": { opacity: 1, transform: "translate(10px, -10px)" },
        },
      },
    },
  },
  plugins: [],
};
