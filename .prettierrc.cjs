/** @type {import("prettier").Config} */
module.exports = {
  arrowParens: "always",
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  tailwindConfig: "./packages/config/tailwind",
};
