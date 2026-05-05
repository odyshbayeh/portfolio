import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages project site: https://<user>.github.io/<repo>/
// Dev server uses "/" so local links match the default setup.
const repoBase = "/portfolio/";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: command === "build" ? repoBase : "/",
  plugins: [react()],
  resolve: {
    dedupe: ["three"],
  },
}));
