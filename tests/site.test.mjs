import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { load } from 'cheerio';
import { buildInquiry, validProduct } from '../src/lib/inquiry.ts';

const root = resolve('dist');
const routes = ['/', '/about/', '/products/', '/global-sourcing/', '/quality-logistics/', '/why-slickk/', '/for-exporters/', '/for-buyers/', '/contact/', '/faq/', '/privacy/', '/terms/', '/responsible-sourcing/'];
const fileFor = (pathname) => join(root, pathname.endsWith('/') ? `${pathname}index.html` : pathname);

test('all 13 public pages and branded 404 have unique SEO, landmarks and valid internal links', async () => {
  const titles = new Set(); const descriptions = new Set();
  for (const route of [...routes, '/404.html']) {
    const html = await readFile(fileFor(route), 'utf8'); const $ = load(html);
    const title = $('title').text(); const description = $('meta[name=description]').attr('content');
    assert.ok(title.includes('SLICKK'), route); assert.ok(description?.length > 60, route);
    assert.ok(!titles.has(title), `Duplicate title ${route}`); titles.add(title);
    assert.ok(!descriptions.has(description), `Duplicate description ${route}`); descriptions.add(description);
    assert.equal($('h1').length, 1, route); assert.equal($('main').length, 1, route);
    assert.equal($('html').attr('lang'), 'en');
    assert.equal($('link[rel=canonical]').attr('href'), route === '/404.html' ? undefined : `https://slickk.online${route}`);
    assert.equal($('meta[property="og:image"]').attr('content'), 'https://slickk.online/images/social.jpg');
    assert.ok($('a[href="mailto:contact@slickk.online"]').length > 0);
    assert.equal(JSON.parse($('script[type="application/ld+json"]').html()).email, 'contact@slickk.online');
    for (const element of $('a[href],img[src],script[src],link[rel=stylesheet],link[rel=icon]').toArray()) {
      const value = $(element).attr('href') ?? $(element).attr('src');
      if (!value || /^(mailto:|https?:)/.test(value)) continue;
      const target = new URL(value, `https://slickk.online${route}`);
      const path = fileFor(decodeURIComponent(target.pathname));
      assert.ok((await stat(path)).isFile(), `${route} broken link: ${value}`);
      if (target.hash) {
        const targetHtml = load(await readFile(path, 'utf8'));
        assert.ok(targetHtml('[id]').toArray().some((node) => targetHtml(node).attr('id') === decodeURIComponent(target.hash.slice(1))), `${route} missing fragment ${value}`);
      }
    }
    for (const image of $('img').toArray()) {
      assert.ok($(image).attr('alt')); assert.ok($(image).attr('width')); assert.ok($(image).attr('height'));
      for (const source of ($(image).attr('srcset') ?? '').split(',').filter(Boolean)) assert.ok((await stat(fileFor(source.trim().split(/\s/)[0]))).isFile());
    }
    assert.equal($('script[src^="http"],iframe').length, 0);
  }
});

test('sitemap and robots describe exactly the public routes; 404 stays noindex', async () => {
  const $ = load(await readFile('dist/sitemap.xml', 'utf8'), { xmlMode: true });
  assert.deepEqual($('loc').map((_, node) => $(node).text()).get().sort(), routes.map((route) => `https://slickk.online${route}`).sort());
  assert.match(await readFile('dist/robots.txt', 'utf8'), /Sitemap: https:\/\/slickk.online\/sitemap.xml/);
  assert.match(await readFile('dist/404.html', 'utf8'), /noindex, follow/);
});

test('security headers cover scripts with hashes and exclude unsafe inline execution', async () => {
  const headers = await readFile('dist/_headers', 'utf8');
  for (const directive of ["default-src 'none'", "script-src 'self'", "object-src 'none'", "frame-ancestors 'none'", "form-action 'none'", 'X-Content-Type-Options: nosniff', 'Strict-Transport-Security']) assert.ok(headers.includes(directive), directive);
  assert.ok(!headers.includes('unsafe-inline')); assert.ok(!headers.includes('includeSubDomains'));
  for (const route of routes) {
    const html = await readFile(fileFor(route), 'utf8');
    for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) if (!/\bsrc=/.test(match[1])) assert.ok(headers.includes(createHash('sha256').update(match[2]).digest('base64')));
    assert.ok(!/\son\w+=/.test(html), 'No inline event handlers');
  }
});

test('inquiry draft validates, encodes untrusted input and fixes recipient and subject', () => {
  const data = new FormData();
  Object.entries({ name: 'Buyer & Co\nBcc: attacker@example.com', business: 'Fresh <Fruit>', email: 'buyer@example.com', country: 'Bangladesh', message: 'Please discuss 100 cartons of apples & packing.', consent: 'on', type: 'Wholesale buyer inquiry', product: 'apples' }).forEach(([key, value]) => data.set(key, value));
  const link = new URL(buildInquiry(data));
  assert.equal(link.pathname, 'contact@slickk.online'); assert.equal([...link.searchParams].length, 2);
  assert.equal(link.searchParams.get('subject'), 'SLICKK — Wholesale buyer inquiry');
  assert.ok(link.searchParams.get('body').includes('Fresh <Fruit>'));
  assert.equal(validProduct('<script>'), 'all');
  data.set('consent', ''); assert.throws(() => buildInquiry(data));
  data.set('consent', 'on'); data.set('message', 'short'); assert.throws(() => buildInquiry(data));
  data.set('message', 'a'.repeat(1201)); assert.throws(() => buildInquiry(data));
  data.set('message', 'A valid message with enough detail.'); data.set('email', 'not-email'); assert.throws(() => buildInquiry(data));
});

test('static output contains no credential files or obvious secrets', async () => {
  async function scan(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      assert.ok(!/^(\.env|\.git|node_modules|\.wrangler)$/.test(entry.name), path);
      if (entry.isDirectory()) await scan(path);
      else if (/\.(html|js|css|json|txt)$/.test(entry.name)) assert.ok(!/(?:sk-proj-|ghp_|-----BEGIN (?:RSA |EC )?PRIVATE KEY)/.test(await readFile(path, 'utf8')), path);
    }
  }
  await scan(root);
  assert.ok((await stat('dist/images/hero.webp')).size < 600_000, 'Optimized hero');
});
