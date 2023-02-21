/** @type {import("tailwindcss").Config} */
module.exports = {
  presets: [require("@aquacloud/tailwind-config")],
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx}",
    "./src/_app.tsx",
    "../../packages/ui/**/*.{ts,tsx}",
  ],
};
