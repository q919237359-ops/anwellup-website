import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = resolve(projectRoot, "out");
const host = "127.0.0.1";
const port = Number.parseInt(process.env.ANWELLUP_PREVIEW_PORT ?? "4173", 10);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

async function fileForRequest(requestUrl) {
  const pathname = decodeURIComponent(new URL(requestUrl, `http://${host}:${port}`).pathname);
  const candidate = resolve(outputRoot, pathname.replace(/^\/+/, ""));

  if (candidate !== outputRoot && !candidate.startsWith(`${outputRoot}${sep}`)) {
    return null;
  }

  try {
    const details = await stat(candidate);
    return details.isDirectory() ? resolve(candidate, "index.html") : candidate;
  } catch {
    return null;
  }
}

const server = createServer(async (request, response) => {
  try {
    const requestedFile = await fileForRequest(request.url ?? "/");
    const filePath = requestedFile ?? resolve(outputRoot, "404.html");
    const body = await readFile(filePath);

    response.writeHead(requestedFile ? 200 : 404, {
      "Cache-Control": "no-store",
      "Content-Length": body.byteLength,
      "Content-Type": contentTypes[extname(filePath).toLowerCase()] ?? "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
    });

    response.end(request.method === "HEAD" ? undefined : body);
  } catch (error) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(error instanceof Error ? error.message : "Preview server error");
  }
});

server.listen(port, host, () => {
  console.log(`ANWELLUP preview: http://${host}:${port}/`);
});
