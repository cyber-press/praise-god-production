import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const root = process.argv[2] || ".";
const port = Number(process.env.PORT || 4173);

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8"
};

const server = createServer((req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);
  const clean = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
  let file = join(root, clean === "/" ? "index.html" : clean);

  if (!existsSync(file) || statSync(file).isDirectory()) {
    file = join(root, "index.html");
  }

  res.setHeader("Content-Type", types[extname(file)] || "application/octet-stream");
  createReadStream(file).pipe(res);
});

server.listen(port, () => {
  console.log(`Praise God Productions PWA running at http://localhost:${port}`);
});
