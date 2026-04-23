/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        poppins: ["Poopins", ...defaultTheme.fontFamily.sans],
        inter: ["Inter", "sans-serif"],
      },
      keyframes: {
        rotation: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        modalFadeIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(6px) scale(0.98)",
            filter: "blur(12px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0px) scale(1)",
            filter: "blur(0px)",
          },
        },
        modalFadeOut: {
          "0%": {
            opacity: "1",
            transform: "translateY(0px) scale(1)",
            filter: "blur(0px)",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(6px) scale(0.98)",
            filter: "blur(12px)",
          },
        },
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        blurIn: {
          "0%": {
            opacity: "0",
            filter: "blur(12px)",
          },
          "100%": {
            opacity: "1",
            filter: "blur(0px)",
          },
        },
        blurOut: {
          "0%": {
            opacity: "1",
            filter: "blur(0px)",
          },
          "100%": {
            opacity: "0",
            filter: "blur(30px)",
          },
        },
        iconFill: {
          "0%": { fillOpacity: "0" },
          "100%": { fillOpacity: "1" },
        },
        clickEffect: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.96)" },
          "100%": { transform: "scale(1)" },
        },
        blurUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
            filter: "blur(4px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
            filter: "blur(0)",
          },
        },
        toastIn: {
          "0%": {
            transform : "translateY(-80px) scale(0.80)"
          },
          "100%": {
            transform: "translateY(0px) scale(1)"
          },
        },
      },
      animation: {
        fade: "fade 0.3s ease-out forwards",
        blurIn: "blurIn 0.3s ease-out forwards",
        blurOut: "blurOut 0.3s ease-in forwards",
        rotation: "rotation 1s linear infinite",
        iconFill: "iconFill 0.3s cubic-bezier(.48, 0, 0, 1)",
        clickEffect: "clickEffect 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        modalFadeIn: "modalFadeIn 0.3s cubic-bezier(.56,.27,0,1) forwards",
        modalFadeOut: "modalFadeOut 0.3s cubic-bezier(.56,.27,0,1) forwards",
        blurUp: "blurUp 0.3s ease-in forwards",
        toastIn: "toastIn 0.2s cubic-bezier(.56,.27,0,1) forwards"
      },
    },
  },
  plugins: [],
  safelist: [
    { pattern: /row-span-(2|3|4|5|6|7|8|9|10|11|12)/ },
    { pattern: /col-span-(2|3|4|5|6|7|8|9|10|11|12)/ },
    { pattern: /z-(50|100|150)/ },
    "flex-col",
    "self-end",
    "bg-black",
    "bg-red-600",
    "w-64",
    "hidden",
    "z-50",
    "z-100",
    "z-150",
    "animate-modalFadeOut",
    "animate-modelFadeIn",
    "animate-blurUp",
    "users-background",
    "bg-green-500",
  ],
};
