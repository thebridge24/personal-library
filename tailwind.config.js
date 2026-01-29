/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideUp: {
          "0%": {
            transform: "translateY(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(-200%)",
            opacity: "0",
          },
        },
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shake: {
          "0%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-6px)" },
          "40%": { transform: "translateX(6px)" },
          "60%": { transform: "translateX(-4px)" },
          "80%": { transform: "translateX(4px)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        fade: "fade 0.6s ease-out forwards",
        shake: "shake 0.4s ease-in-out",
        "slide-up": "slideUp 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards",
      },
    },
  },
  plugins: [],
};
