/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      screens: {
        xs: "375px",
      },
      maxWidth: {
        "8xl": "90rem",
      },
      animation: {
        "spin-slow": "spin 30s linear infinite",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
