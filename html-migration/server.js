import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);
const routes = new Map([
  ["/", "index.html"],
  ["/about", "about.html"],
  ["/services", "services.html"],
  ["/impact", "impact.html"],
  ["/eligibility", "eligibility.html"],
  ["/career", "career.html"],
  ["/contact", "contact.html"],
  ["/resources/news", "resources-news.html"],
  ["/resources/faqs", "resources-faqs.html"],
  ["/resources/publications", "resources-publications.html"],
  ["/resources/policies", "resources-policies.html"],
  ["/resources/privacy-policy", "resources-privacy-policy.html"],
  ["/resources/ratings", "resources-ratings.html"],
  ["/resources/whistleblowing", "resources-whistleblowing.html"],
  ["/resources/complaints", "resources-complaints.html"],
  ["/admin", "admin.html"],
  ["/admin/sign-in", "admin-sign-in.html"],
  ["/admin/sign-up", "admin-sign-up.html"],
  ["/about/board/abubakar-jimoh", "team-abubakar-jimoh.html"],
  ["/about/board/tony-okpanachi", "team-tony-okpanachi.html"],
  ["/about/management/tony-okpanachi", "team-tony-okpanachi.html"],
  ["/career/relationship-manager-pfis", "career-relationship-manager-pfis.html"],
  ["/career/senior-credit-risk-analyst", "career-senior-credit-risk-analyst.html"],
]);
const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const server = http.createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end("Method not allowed");
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch {
    response.writeHead(400);
    response.end("Bad request");
    return;
  }

  const requestedFile = path.resolve(root, routes.get(pathname) || `.${pathname}`);
  if (requestedFile !== root && !requestedFile.startsWith(`${root}${path.sep}`)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    let filePath = requestedFile;
    let stat;
    try {
      stat = await fs.promises.stat(filePath);
      if (stat.isDirectory()) {
        filePath = path.join(filePath, "index.html");
        stat = await fs.promises.stat(filePath);
      }
    } catch (error) {
      if (error.code !== "ENOENT" && error.code !== "ENOTDIR") throw error;
      if (path.extname(pathname)) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }
      filePath = path.join(root, "index.html");
      stat = await fs.promises.stat(filePath);
    }

    if (request.method === "HEAD") {
      response.writeHead(200, {
        "Content-Length": stat.size,
        "Content-Type": types[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      });
      response.end();
      return;
    }
    if (path.extname(filePath).toLowerCase() === ".html") {
      const source = await fs.promises.readFile(filePath, "utf8");
      const html = source.replace("<head>", '<head>\n    <base href="/">');
      response.writeHead(200, {
        "Content-Type": types[".html"],
      });
      response.end(html);
      return;
    }
    response.writeHead(200, {
      "Content-Length": stat.size,
      "Content-Type": types[path.extname(filePath).toLowerCase()] || "application/octet-stream",
    });
    const stream = fs.createReadStream(filePath);
    stream.on("error", (error) => {
      console.error(`Unable to serve ${filePath}:`, error);
      if (!response.headersSent) response.writeHead(500);
      response.end("Internal server error");
    });
    stream.pipe(response);
  } catch (error) {
    console.error(`Unable to serve ${pathname}:`, error);
    response.writeHead(500);
    response.end("Internal server error");
  }
});

server.listen(port, () => {
  console.log(`ICGL static site: http://localhost:${port}`);
});
