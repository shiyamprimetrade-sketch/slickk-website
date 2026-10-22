import assert from 'node:assert/strict';

const origin = process.argv[2] ?? 'https://slickk.online';
assert.match(origin, /^https:\/\//, 'Use HTTPS for production verification');
const routes = ['/', '/about/', '/products/', '/global-sourcing/', '/quality-logistics/', '/why-slickk/', '/for-exporters/', '/for-buyers/', '/contact/', '/faq/', '/privacy/', '/terms/', '/responsible-sourcing/'];
for (const route of routes) {
  const response = await fetch(new URL(route, origin), { signal: AbortSignal.timeout(20000) });
  assert.equal(response.status, 200, route); const html = await response.text();
  assert.match(html, /SLICKK/); assert.match(html, /contact@slickk.online/);
  assert.ok(response.headers.get('content-security-policy'), `${route}: CSP missing`);
  console.log(`PASS ${route} HTTP 200, brand, contact, CSP; TLS validation enabled`);
}
for (const path of ['/sitemap.xml', '/robots.txt', '/images/hero.webp', '/images/social.jpg', '/fonts/inter-latin.woff2']) {
  const response = await fetch(new URL(path, origin), { signal: AbortSignal.timeout(20000) });
  assert.equal(response.status, 200, path); console.log(`PASS ${path}`);
}
const missing = await fetch(new URL('/verification-missing-page/', origin)); assert.equal(missing.status, 404); assert.match(await missing.text(), /out of season/);
const www = await fetch('https://www.slickk.online/products/', { redirect: 'manual' });
assert.ok([301, 308].includes(www.status)); assert.equal(www.headers.get('location'), 'https://slickk.online/products/');
console.log('PASS branded 404 and WWW canonical redirect. Mail delivery is a separate end-to-end check.');
