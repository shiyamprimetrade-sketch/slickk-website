import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { load } from 'cheerio';
import { onRequestPost } from '../functions/api/inquiry.js';

const base = resolve('dist');
const routes = ['/', '/about/', '/services/', '/software-development/', '/app-development/', '/web-development/', '/seo-services/', '/digital-marketing/', '/content-creation/', '/portfolio/', '/pricing/', '/contact/', '/faq/', '/privacy/', '/terms/', '/cookies/'];
const fileFor = (path) => join(base, path, path === '/404.html' ? '' : 'index.html');

test('all agency pages have unique SEO, headings, accessible landmarks and working internal links', async () => {
  const titles = new Set(); const descriptions = new Set();
  for (const route of routes) {
    const $ = load(await readFile(fileFor(route), 'utf8'));
    const title = $('title').text(); const description = $('meta[name=description]').attr('content');
    assert.match(title, /Slickk/); assert.ok(description?.length > 70, route);
    assert.ok(!titles.has(title), route + ' duplicate title'); titles.add(title);
    assert.ok(!descriptions.has(description), route + ' duplicate description'); descriptions.add(description);
    assert.equal($('h1').length, 1, route);
    assert.equal($('main').length, 1, route);
    assert.equal($('html').attr('lang'), 'en', route);
    assert.equal($('link[rel=canonical]').attr('href'), 'https://slickk.online' + route, route);
    assert.equal($('meta[property="og:image"]').attr('content'), 'https://slickk.online/agency-social.svg');
    assert.ok($('a[href="mailto:contact@slickk.online"]').length > 0, route);
    const jsonld = JSON.parse($('script[type="application/ld+json"]').html());
    assert.equal(jsonld.email, 'contact@slickk.online');
    assert.ok(!$('h1').text().match(/fruit|oranges|grapes/i), route);
    for (const link of $('a[href], link[rel=stylesheet], link[rel=icon], script[src], img[src]').toArray()) {
      const raw = $(link).attr('href') || $(link).attr('src');
      if (!raw || /^(mailto:|https?:|tel:|#)/.test(raw)) continue;
      const target = new URL(raw, 'https://slickk.online' + route);
      await stat(join(base, target.pathname, target.pathname.endsWith('/') ? 'index.html' : ''));
    }
  }
});

test('robots, sitemap and retired fruit routes match migration', async () => {
  const $ = load(await readFile('dist/sitemap.xml', 'utf8'), { xmlMode: true });
  assert.deepEqual($('loc').map((_, el) => $(el).text()).get().sort(), routes.map((p) => 'https://slickk.online' + p).sort());
  assert.match(await readFile('dist/robots.txt', 'utf8'), /sitemap.xml/i);
  for (const route of ['/products/index.html','/global-sourcing/index.html','/quality-logistics/index.html','/for-exporters/index.html','/for-buyers/index.html']) {
    await assert.rejects(stat(join(base, route)));
  }
  const notFound = load(await readFile('dist/404.html', 'utf8'));
  assert.equal(notFound('meta[name=robots]').attr('content'), 'noindex, follow');
});

test('security headers retain restricted CSP and clear false marketing claims', async () => {
  const headers = await readFile('dist/_headers', 'utf8');
  assert.match(headers, /default-src 'none'/); assert.match(headers, /frame-ancestors 'none'/);
  assert.match(headers, /form-action 'self'/); assert.doesNotMatch(headers, /unsafe-inline/);
  assert.match(headers, /Strict-Transport-Security/);
  for (const route of routes) {
    const html = await readFile(fileFor(route), 'utf8');
    assert.doesNotMatch(html, /Freshness Across Borders|Our fresh-fruit portfolio|Sourcing market of interest/i, route);
  }
});

const request = (payload, headers = {}) => new Request('https://slickk.online/api/inquiry', {
  method: 'POST', headers: { 'Content-Type':'application/json', Origin: 'https://slickk.online', ...headers },
  body: JSON.stringify(payload),
});
const valid = { name: 'Demo User', company:'Example', email:'visitor@example.com', service:'web-development', budget:'Not specified', message:'I would like a responsive professional website for my business.', consent:'on', 'cf-turnstile-response':'mock-test-token', website:'' };

test('server inquiry remains disabled without verified Cloudflare bindings and secrets', async () => {
  const result = await onRequestPost({ request: request(valid), env: {} });
  assert.equal(result.status, 503);
});
test('server inquiry refuses cross-origin, invalid fields and fails closed', async () => {
  const env = { EMAIL: { send: async () => { throw Error('Should not send'); } }, TURNSTILE_SECRET:'private', INQUIRY_DESTINATION:'verified@example.com' };
  const cross = await onRequestPost({ request: request(valid, { Origin: 'https://evil.example' }), env });
  assert.equal(cross.status, 403);
  const invalid = await onRequestPost({ request: request({...valid, message:'short'}), env });
  assert.equal(invalid.status, 422);
  const oversized = await onRequestPost({ request: request({...valid, message:'a'.repeat(15000)}), env });
  assert.equal(oversized.status, 413);
});

test('server verifies Turnstile and only sends to configured recipient (mocked)', async () => {
  const oldFetch = globalThis.fetch; let sent;
  try {
    globalThis.fetch = async () => new Response(JSON.stringify({success:true,hostname:'slickk.online'}), {status:200,headers:{'Content-Type':'application/json'}});
    const env = { EMAIL: { send: async (payload) => { sent = payload; return { messageId: 'test-only' }; } }, TURNSTILE_SECRET:'private', INQUIRY_DESTINATION:'verified@example.com' };
    const response = await onRequestPost({request:request(valid),env});
    assert.equal(response.status,200);
    assert.equal(sent.to,'verified@example.com');
    assert.equal(sent.from,'contact@slickk.online');
    assert.equal(sent.replyTo,'visitor@example.com');
    assert.ok(sent.text.includes('I would like a responsive professional website'));
    globalThis.fetch = async () => new Response(JSON.stringify({success:false}), {status:200});
    const rejected = await onRequestPost({request:request(valid),env});
    assert.equal(rejected.status,403);
  } finally { globalThis.fetch = oldFetch; }
});
