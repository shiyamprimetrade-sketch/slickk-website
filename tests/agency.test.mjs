import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { load } from 'cheerio';
import { onRequestPost } from '../functions/api/inquiry.js';
import { serviceSilos } from '../src/data/serviceSilos.ts';

const base = resolve('dist');
const routes = ['/insights/business-website-cost-bangladesh/','/insights/professional-brand-identity/','/insights/software-project-brief/',"/","/about/","/services/","/software-development/","/app-development/","/web-development/","/seo-services/","/digital-marketing/","/content-creation/","/portfolio/","/pricing/","/contact/","/faq/","/privacy/","/terms/","/cookies/","/industries/","/process/","/insights/","/request-quote/","/branding-graphic-design/","/ai-automation/","/services/logo-design/","/services/brochure-design/","/services/brand-identity/","/services/company-profile-design/","/services/website-development/","/services/app-development/","/services/digital-marketing/","/services/seo/","/services/graphic-design/","/services/ai-automation/","/portfolio/identity-system/","/portfolio/corporate-brochure/","/portfolio/commerce-experience/","/portfolio/operations-dashboard/","/portfolio/social-campaign/"];
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
    assert.equal($('meta[property="og:image"]').attr('content'), 'https://slickk.online/images/agency-social.jpg');
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

test('editorial metadata and contextual discovery links match visible content', async () => {
  const website = load(await readFile(fileFor('/services/website-development/'), 'utf8'));
  assert.equal(website('meta[property="og:type"]').attr('content'), 'website');
  assert.ok(website('a[href="/insights/business-website-cost-bangladesh/"]').length);
  const guide = load(await readFile(fileFor('/insights/business-website-cost-bangladesh/'), 'utf8'));
  assert.equal(guide('meta[property="og:type"]').attr('content'), 'article');
  assert.equal(guide('meta[property="article:published_time"]').attr('content'), '2026-10-28');
  assert.ok(guide('a[href="/services/website-development/"]').length);
  const softwareGuide = load(await readFile(fileFor('/insights/software-project-brief/'), 'utf8'));
  assert.ok(softwareGuide('a[href="/software-development/"]').length);
  const servicesPage = load(await readFile(fileFor('/services/'), 'utf8'));
  assert.ok(servicesPage('a[href="/industries/"]').length);
});

test('six service silos have homepage paths and reciprocal detail links', async () => {
  const home = load(await readFile(fileFor('/'), 'utf8'));
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  const titles = new Set();
  for (const silo of serviceSilos) {
    const parentPath = `/${silo.slug}/`;
    assert.ok(home(`a[href="${parentPath}"]`).length, parentPath + ' absent from homepage');
    assert.ok(sitemap.includes(`https://slickk.online${parentPath}`));
    const parent = load(await readFile(fileFor(parentPath), 'utf8'));
    const title = parent('title').text();
    const titleTerm = silo.slug === 'seo-services' ? 'SEO' : silo.name.split(' ')[0];
    assert.ok(title.toLowerCase().includes(titleTerm.toLowerCase()), parentPath + ' title intent');
    assert.ok(!titles.has(title), parentPath + ' duplicate category title'); titles.add(title);
    for (const detail of silo.details) {
      const detailPath = `/services/${detail.slug}/`;
      assert.ok(parent(`a[href="${detailPath}"]`).length, parentPath + ' missing child');
      assert.ok(sitemap.includes(`https://slickk.online${detailPath}`));
      const child = load(await readFile(fileFor(detailPath), 'utf8'));
      assert.ok(child(`a[href="${parentPath}"]`).length, detailPath + ' missing parent');
      const breadcrumbs = child('script[type="application/ld+json"]').toArray().map(node => JSON.parse(child(node).html())).find(schema => schema['@type'] === 'BreadcrumbList');
      assert.ok(breadcrumbs.itemListElement.some(item => item.item === `https://slickk.online${parentPath}`));
    }
  }
  assert.match(home('h1').text(), /websites, software and digital growth/i);
  assert.match(home('.hero-copy .lead').text(), /mobile apps, SEO, digital marketing and content creation/i);
});

test('optional analytics consent starts inert until its script makes it visible', async () => {
  const home = load(await readFile(fileFor('/'), 'utf8'));
  const panel = home('#analytics-consent');
  assert.equal(panel.attr('aria-hidden'), 'true');
  assert.notEqual(panel.attr('inert'), undefined);
  assert.ok(!panel.hasClass('is-visible'));
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
    globalThis.fetch = async () => new Response(JSON.stringify({success:true,hostname:'slickk.online',action:'inquiry'}), {status:200,headers:{'Content-Type':'application/json'}});
    const env = { INQUIRY_RATE_LIMIT:{limit:async()=>({success:true})}, EMAIL: { send: async (payload) => { sent = payload; return { messageId: 'test-only' }; } }, TURNSTILE_SECRET:'private', INQUIRY_DESTINATION:'verified@example.com' };
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

test('V2 creative disciplines and case-study routes are present with no fictitious client endorsements',async()=>{
 const home=await readFile('dist/index.html','utf8');
 assert.match(home,/We Design\./);assert.match(home,/We Elevate\./);
 assert.match(home,/branding-graphic-design/);assert.match(home,/brochure-design/);
 const portfolio=await readFile('dist/portfolio/index.html','utf8');
 assert.match(portfolio,/Demonstration project gallery/);
 assert.doesNotMatch(portfolio,/Trusted by BAT|Trusted by Unilever|99% customer satisfaction|100\+ completed projects/);
 const content=await readFile('dist/services/logo-design/index.html','utf8');
 assert.match(content,/Logo Essentials/);
});


test('flagship brand exports have expected dimensions and transparent PNG', async () => {
  const sharp = (await import('sharp')).default;
  const mark = await sharp('public/brand/slickk-wordmark-dark.png').metadata();
  assert.equal(mark.width, 2400); assert.equal(mark.hasAlpha, true);
  const favicon = await sharp('public/favicon-96.png').metadata();
  assert.equal(favicon.width, 96); assert.equal(favicon.height, 96);
  const share = await sharp('public/images/agency-social.jpg').metadata();
  assert.equal(share.width, 1200); assert.equal(share.height, 630);
});
