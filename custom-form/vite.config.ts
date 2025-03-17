import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [react(), tailwindcss(), cssInjectedByJsPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssCodeSplit: false,
    outDir: "./assets",
    rollupOptions: {
      input: "./src/web-components/AccommodationFormElement.tsx",
      output: {
        entryFileNames: "custom-react-form.js",
        assetFileNames: "custom-react-form.[ext]",
      },
    },
  },
});
