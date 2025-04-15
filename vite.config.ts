import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { viteExternalsPlugin } from "vite-plugin-externals";

export default defineConfig({
  plugins: [
    vue(),
    viteExternalsPlugin({
      vue: "Vue",
    }),
    dts({
      insertTypesEntry: true,
      outDir: "dist",
      exclude: ["**/*.spec.ts", "**/*.test.ts", "src/**/__tests__/**"],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "VueCommonsLib",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
