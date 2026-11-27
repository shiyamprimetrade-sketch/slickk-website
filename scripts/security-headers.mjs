import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

// Hash executable inline scripts; JSON-LD is a non-executable data block and needs no execution permission.
const hashes = new Set();
async function inspect(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, item.name);
    if (item.isDirectory()) await inspect(path);
    else if (item.name.endsWith('.html')) {
      const html = await readFile(path, 'utf8');
      for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
        if (!/\bsrc=/.test(match[1]) && !/type=["']application\/ld\+json["']/.test(match[1])) hashes.add(`'sha256-${createHash('sha256').update(match[2]).digest('base64')}'`);
      }
    }
  }
}
await inspect('dist');
const turnstile = Boolean(process.env.PUBLIC_TURNSTILE_SITE_KEY);
const cf = turnstile ? ' https://challenges.cloudflare.com' : '';
const csp = `default-src 'none'; script-src 'self' ${[...hashes].join(' ')}${cf}; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self'${cf}; frame-src ${turnstile ? 'https://challenges.cloudflare.com' : "'none'"}; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests`;
if (`  Content-Security-Policy: ${csp}`.length > 2000) throw new Error('Cloudflare Pages header line exceeds 2,000 characters; externalize executable scripts before deploying.');
await writeFile('dist/_headers', `/*
  Content-Security-Policy: ${csp}
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Strict-Transport-Security: max-age=31536000

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=86400

/fonts/*
  Cache-Control: public, max-age=604800
`);
console.log(`Security headers generated; ${hashes.size} inline script hash(es).`);
