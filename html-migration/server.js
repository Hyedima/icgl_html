import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const routes = {
  "/": "index.html",
  "/about": "about.html",
  "/services": "services.html",
  "/impact": "impact.html",
  "/eligibility": "eligibility.html",
  "/career": "career.html",
  "/contact": "contact.html",
  "/resources/news": "resources-news.html",
  "/resources/faqs": "resources-faqs.html",
  "/resources/publications": "resources-publications.html",
  "/resources/policies": "resources-policies.html",
  "/resources/privacy-policy": "resources-privacy-policy.html",
  "/resources/ratings": "resources-ratings.html",
  "/resources/whistleblowing": "resources-whistleblowing.html",
  "/resources/complaints": "resources-complaints.html",
  "/admin": "admin.html",
  "/admin/sign-in": "admin-sign-in.html",
};
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
};

http
  .createServer((request, response) => {
    const requestedPath = new URL(request.url, "http://localhost").pathname;
    const relativePath =
      routes[requestedPath] || requestedPath.replace(/^\//, "");
    let filePath = path.join(root, relativePath);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(root, "index.html");
    }
    response.setHeader(
      "Content-Type",
      types[path.extname(filePath)] || "application/octet-stream",
    );
    fs.createReadStream(filePath).pipe(response);
  })
  .listen(4173, () =>
    console.log("ICGL HTML migration: http://localhost:4173"),
  );
