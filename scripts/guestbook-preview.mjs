// Local-only RSVP test service. It never connects to Supabase or writes to disk.
// Start with: node scripts/guestbook-preview.mjs
// Then run Next dev with NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:4318
// and NEXT_PUBLIC_SUPABASE_ANON_KEY=local-preview-key.
import { createServer } from "node:http";

const entries = [];
const server = createServer(async (request, response) => {
  console.log(request.method, request.url?.split("?")[0]);
  response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:3001");
  response.setHeader("Access-Control-Allow-Headers", request.headers["access-control-request-headers"] ?? "apikey, authorization, content-type, x-client-info, prefer");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.setHeader("Content-Type", "application/json");
  if (request.method === "OPTIONS") { response.writeHead(204).end(); return; }
  if (!request.url?.startsWith("/rest/v1/guestbook")) { response.writeHead(404).end("{}"); return; }
  if (request.method === "GET") {
    response.end(JSON.stringify(entries.filter((entry) => entry.message).map(({ id, created_at, name, message }) => ({ id, created_at, name, message }))));
    return;
  }
  if (request.method === "POST") {
    let body = "";
    for await (const chunk of request) body += chunk;
    const entry = JSON.parse(body);
    if (entry.name === "Preview Error") {
      response.writeHead(503).end(JSON.stringify({ code: "PREVIEW_ERROR", message: "Intentional preview failure" }));
      return;
    }
    entries.unshift({ ...entry, id: crypto.randomUUID(), created_at: new Date().toISOString() });
    response.writeHead(201).end();
    return;
  }
  response.writeHead(405).end("{}");
});
server.listen(4318, "127.0.0.1", () => console.log("In-memory guestbook preview: http://127.0.0.1:4318"));
