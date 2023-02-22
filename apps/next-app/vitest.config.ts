// /// <reference types="vitest"/>
// /// <reference types="vite/client"/>

// import { defineConfig } from "vitest/config";
// import react from "@vitejs/plugin-react";
// import { resolve } from "path";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), tsconfigPaths()],
//   test: {
//     globals: true,
//     environment: "jsdom",
//     // setupFiles: [
//     //   "./__tests___/setup/jest-dom.ts",
//     //   resolve(__dirname, "__tests__/setup/setup.ts"),
//     //   resolve(__dirname, "__tests__/setup/localstorage.ts"),
//     // ],
//     setupFiles: "./__tests__/setup/jest-dom.ts",
//     css: true,
//     // mockReset: false,
//   },
// });
/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
  },
});
