import { cp, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";

const outDir = "dist";

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

for (const path of [
  "index.html",
  "offline.html",
  "manifest.webmanifest",
  "sw.js",
  "src",
  "public"
]) {
  if (existsSync(path)) {
    await cp(path, `${outDir}/${path}`, { recursive: true });
  }
}

console.log("Built Praise God Productions PWA into dist/");
