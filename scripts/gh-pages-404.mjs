/**
 * GitHub Pages serves 404.html on unknown paths. Copying the SPA shell fixes
 * client-side routing on refresh/deep links when using a project site subpath.
 */
import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const dist = resolve(process.cwd(), "dist");
const index = resolve(dist, "index.html");
const notFound = resolve(dist, "404.html");

if (!existsSync(index)) {
  console.warn("gh-pages-404: dist/index.html missing (run vite build first).");
  process.exit(0);
}

copyFileSync(index, notFound);
console.log("gh-pages-404: copied dist/index.html → dist/404.html");
