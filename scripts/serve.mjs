import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';

const root = resolve('dist');
const configuration = await readFile('dist/_headers', 'utf8');
const shared = Object.fromEntries(configuration.split('\n\n')[0].split('\n').slice(1).filter(Boolean).map((line) => { const index = line.indexOf(':'); return [line.slice(0, index).trim(), line.slice(index + 1).trim()]; }));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };
createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let path = resolve(root, `.${pathname}`);
    if (path !== root && !path.startsWith(`${root}${sep}`)) { response.writeHead(403); response.end(); return; }
    let status = 200;
    try { if ((await stat(path)).isDirectory()) path = resolve(path, 'index.html'); }
    catch { path = resolve(root, '404.html'); status = 404; }
    const body = await readFile(path);
    response.writeHead(status, { ...shared, 'Content-Type': types[extname(path)] ?? 'application/octet-stream' });
    response.end(body);
  } catch { response.writeHead(500); response.end('Unable to serve the page.'); }
}).listen(Number(process.env.PORT || 4321), '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${process.env.PORT || 4321}`));
