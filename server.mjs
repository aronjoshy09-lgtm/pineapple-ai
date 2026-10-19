import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { handler } from './netlify/functions/tutor.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const contentTypes = { '.html': 'text/html; charset=utf-8', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.js': 'text/javascript; charset=utf-8' };
const server = http.createServer(async (req, res) => {
  if (req.url === '/api/tutor' && req.method === 'POST') {
    let body = ''; req.on('data', chunk => { body += chunk; if (body.length > 400000) req.destroy(); });
    req.on('end', async () => {
      const result = await handler({ httpMethod: 'POST', body });
      res.writeHead(result.statusCode, result.headers); res.end(result.body);
    });
    return;
  }
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const file = pathname === '/' ? 'index.html' : decodeURIComponent(pathname.slice(1));
  if (file.includes('..') || file.includes('\\')) { res.writeHead(400); return res.end('Bad request'); }
  try { const data = await readFile(path.join(root, file)); res.writeHead(200, { 'Content-Type': contentTypes[path.extname(file)] || 'application/octet-stream' }); res.end(data); }
  catch { res.writeHead(404); res.end('Not found'); }
});
const port = Number(process.env.PORT || 4173);
server.listen(port, '0.0.0.0', () => console.log(`Pineapple AI is running at http://localhost:${port}`));
