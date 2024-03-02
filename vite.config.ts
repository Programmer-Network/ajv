/// <reference types="vitest" />

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "AJV",
      formats: ["es", "umd"],
      fileName: (format) => `ajv.${format}.js`,
    },
  },
  test: {
    globals: true,
    environment: "node",
  },
});
