import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { load } from 'cheerio';
import { partnerPrograms } from '../src/data/partnerPrograms.ts';
import { businessTools } from '../src/data/businessTools.ts';
import { growthSolutions } from '../src/data/growthSolutions.ts';

const officialHosts = /(^|\.)(google\.com|microsoft\.com|amazon\.com|cloudflare\.com|digitalocean\.com|shopify\.com|hostinger\.com|namecheap\.com|godaddy\.com|kinsta\.com|cloudways\.com|webflow\.com|framer\.com|wix\.com|squarespace\.com|elementor\.com|hubspot\.com|pipedrive\.com|make\.com|zapier\.com|zoho\.com|brevo\.com|semrush\.com)$/;
const html = path => load(readFileSync(`dist${path}index.html`, 'utf8'));

test('35 official program records stay research only without tracking or badges', () => {
  assert.equal(partnerPrograms.length, 35);
  assert.equal(new Set(partnerPrograms.map(program => program.id)).size, 35);
  for (const program of partnerPrograms) {
    assert.equal(program.approvedTrackingUrl, '');
    assert.equal(program.publicBadgeAllowed, false);
    assert.ok(['research_only','ineligible'].includes(program.approvalStatus));
    assert.match(new URL(program.officialUrl).hostname, officialHosts);
    assert.match(new URL(program.evidenceUrl).hostname, officialHosts);
  }
  assert.equal(partnerPrograms.find(p=>p.id==='google-workspace-referral').geoEligibility,'bd_not_listed');
  assert.equal(partnerPrograms.find(p=>p.id==='google-cloud-affiliate').geoEligibility,'us_ca_only');
  assert.equal(partnerPrograms.find(p=>p.id==='digitalocean-referral').payoutType,'credits');
  assert.equal(partnerPrograms.find(p=>p.id==='webflow-affiliate').clientReferralAllowed,'no');
});

test('public program and tool pages disclose status and link directly to official sites', () => {
  const partners=html('/partners/');
  assert.match(partners('h1').text(),/programs we evaluate/i);
  assert.match(partners('main').text(),/no verified approval/i);
  assert.equal(partners('main a[href^="https:"]').length,35);
  for(const link of partners('main a[href^="https:"]').toArray()) {
    assert.match(partners(link).attr('rel'),/noopener noreferrer/);
    assert.ok(!partners(link).attr('href').includes('ref='));
  }
  const disclosure=html('/affiliate-disclosure/');
  assert.match(disclosure('main').text(),/not tracked affiliate links/i);
  const hub=html('/business-tools/');
  assert.equal(hub('#stack-form').length,1);
  for(const tool of businessTools.filter(item=>item.detail)) {
    const page=html(`/business-tools/${tool.slug}/`);
    assert.equal(page('h1').length,1);
    assert.equal(page(`a[href="${tool.officialUrl}"]`).length,1);
    assert.match(page('main').text(),/non-affiliate links/i);
  }
});

test('solutions and editorial routes give a service path without modifying intake', () => {
  for(const solution of growthSolutions) {
    const page=html(`/solutions/${solution.slug}/`);
    assert.equal(page('h1').length,1);
    assert.ok(page(`a[href="/request-quote/?service=${solution.service}"]`).length);
  }
  const sitemap=readFileSync('dist/sitemap.xml','utf8');
  const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>match[1]);
  assert.equal(new Set(urls).size,urls.length);
  assert.equal(urls.filter(url=>url.includes('/business-tools/')).length,5);
  assert.equal(urls.filter(url=>url.includes('/solutions/')).length,4);
});

test('brand favicon is explicit and supports private browser tabs and Android icons', () => {
  const home=html('/');
  assert.equal(home('link[rel="icon"][href="/favicon.ico"]').length,1);
  assert.equal(home('link[rel="manifest"][href="/site.webmanifest"]').length,1);
  const icon=readFileSync('dist/favicon.ico');
  assert.equal(icon.readUInt16LE(2),1);
  assert.ok(icon.readUInt16LE(4)>=4);
  const manifest=JSON.parse(readFileSync('dist/site.webmanifest','utf8'));
  assert.deepEqual(manifest.icons.map(item=>item.sizes),['192x192','512x512']);
});
