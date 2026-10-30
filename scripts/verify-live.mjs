import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { load } from 'cheerio';

// Native fetch validates TLS certificates; no insecure override is used.
const request = (url, options = {}) => fetch(url, { signal: AbortSignal.timeout(25000), ...options });

const origin = process.argv[2] ?? 'https://slickk.online';
assert.match(origin, /^https:\/\//, 'Use HTTPS for production verification');
const routes = [...readFileSync('dist/sitemap.xml','utf8').matchAll(/<loc>https:\/\/slickk\.online([^<]*)<\/loc>/g)].map(match=>match[1]||'/');
assert.equal(routes.length,55,'Expected all indexable agency and partner-growth routes');
assert.equal(new Set(routes).size,routes.length,'Sitemap must not contain duplicate routes');
for (const route of routes) {
  const response = await request(new URL(route, origin));
  assert.equal(response.status, 200, route); const html = await response.text();
  assert.match(html, /Slickk/i); assert.match(html, /contact@slickk.online/);
  assert.ok(response.headers.get('content-security-policy'), `${route}: CSP missing`);
  const $=load(html), expected=load(readFileSync('dist'+route+'index.html','utf8'));
  assert.equal($('title').text(),expected('title').text(),route+': title mismatch');
  assert.equal($('h1').length,1,route+': heading count');
  assert.equal($('link[rel=canonical]').attr('href'),'https://slickk.online'+route,route+': canonical');
  assert.equal($('meta[property="og:image"]').attr('content'),'https://slickk.online/images/agency-social.jpg');
  assert.equal($('body').attr('data-tracking-enabled'),'true');
  for(const script of $('script[type="application/ld+json"]').toArray())JSON.parse($(script).text());
  if(['/contact/','/request-quote/'].includes(route))assert.equal($('#project-inquiry').attr('data-mode'),'secure');
  console.log(`PASS ${route} HTTP 200, flagship metadata, canonical, schema, CSP and TLS`);
}
for (const path of ['/sitemap.xml', '/robots.txt', '/images/agency-social.jpg', '/images/portfolio/identity-system.svg', '/fonts/inter-latin.woff2', '/favicon.ico', '/icon-192.png', '/icon-512.png', '/site.webmanifest']) {
  const response = await request(new URL(path, origin));
  assert.equal(response.status, 200, path); console.log(`PASS ${path}`);
}
const aiStatus=await request(new URL('/api/gemini/status',origin));
assert.equal(aiStatus.status,200);assert.equal((await aiStatus.json()).enabled,true,'Existing guarded Gemini demo must remain enabled');
for(const path of ['/api/admin/leads','/api/admin/metrics'])assert.equal((await request(new URL(path,origin))).status,401,'Private API must reject unauthenticated access');
const inbox=load(await (await request(new URL('/internal-leads/',origin))).text());
assert.match(inbox('meta[name=robots]').attr('content'),/noindex/);
const missing = await request(new URL('/verification-missing-page/', origin)); assert.equal(missing.status, 404); assert.match(await missing.text(), /doesn't exist/);
const www = await request('https://www.slickk.online/services/', { redirect: 'manual' });
assert.ok([301, 308].includes(www.status)); assert.equal(www.headers.get('location'), 'https://slickk.online/services/');
console.log('PASS branded 404 and WWW canonical redirect. Mail delivery is a separate end-to-end check.');
for (const host of ['slickk.online', 'www.slickk.online']) {
  const response = await request(`http://${host}/`, { redirect: 'manual' });
  assert.ok([301, 308].includes(response.status), `HTTP must redirect: ${host}`);
  assert.ok(response.headers.get('location')?.startsWith('https://'), `HTTPS redirect required: ${host}`);
  console.log(`PASS http://${host}/ redirects to HTTPS`);
}
