import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { load } from 'cheerio';

const base = 'https://slickk.online';
const live = process.argv.includes('--live');
const output = process.argv.find(value => value.startsWith('--output='))?.slice(9) ?? 'SEO_URL_INVENTORY.csv';
const linksOutput = process.argv.find(value => value.startsWith('--links='))?.slice(8);
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const paths = [...sitemap.matchAll(/<loc>https:\/\/slickk\.online([^<]*)<\/loc>/g)].map(match => match[1] || '/');
const categoryNames = {
  'web-development': 'Website Development', 'website-development': 'Website Development',
  'software-development': 'Software Development', 'app-development': 'Mobile App Development',
  'seo-services': 'Search Engine Optimization', seo: 'Search Engine Optimization',
  'digital-marketing': 'Digital Marketing', 'content-creation': 'Content Creation',
};
const rows = [];
const links = [];
for (const pathname of paths) {
  const html = await readFile(join('dist', pathname.slice(1), 'index.html'), 'utf8');
  const $ = load(html);
  const segments = pathname.split('/').filter(Boolean);
  const category = categoryNames[segments.at(-1)] ?? categoryNames[segments[0]] ?? 'General';
  const outbound = new Set();
  $('a[href]').each((_, anchor) => {
    const raw = $(anchor).attr('href') ?? '';
    if (!raw.startsWith('/') || raw.startsWith('//')) return;
    const destination = new URL(raw, base).pathname;
    if (paths.includes(destination)) outbound.add(destination);
    links.push({ source: pathname, destination, anchor: $(anchor).text().replace(/\s+/g, ' ').trim() });
  });
  let status = 'not measured';
  if (live) {
    try { status = String((await fetch(base + pathname, { signal: AbortSignal.timeout(15000) })).status); }
    catch (error) { status = `error: ${error.message}`; }
  }
  rows.push({
    'Exact URL': base + pathname, 'HTTP status': status,
    'Canonical URL': $('link[rel="canonical"]').attr('href') ?? '',
    'Page title': $('title').text().trim(),
    'Meta description': $('meta[name="description"]').attr('content') ?? '',
    H1: $('h1').first().text().replace(/\s+/g, ' ').trim(),
    'Indexability status': $('meta[name="robots"]').attr('content') ?? '',
    'Inbound internal links': 0, 'Outbound internal links': outbound.size,
    'Assigned target keyword': category === 'General' ? '' : `${category.toLowerCase()} bangladesh`,
    'Assigned category': category,
    'Content and conversion purpose': segments[0] === 'insights' ? 'Editorial guide; relevant service inquiry' :
      category === 'General' ? 'Site information and navigation' : 'Service information; project inquiry',
    pathname,
  });
}
for (const row of rows) row['Inbound internal links'] = new Set(links.filter(link => link.destination === row.pathname && link.source !== row.pathname).map(link => link.source)).size;
const headers = Object.keys(rows[0]).filter(key => key !== 'pathname');
const csv = value => `"${String(value ?? '').replaceAll('"', '""')}"`;
await writeFile(output, [headers.map(csv).join(','), ...rows.map(row => headers.map(header => csv(row[header])).join(','))].join('\n') + '\n');
if (linksOutput) {
  const uniqueLinks = [...new Map(links.map(link => [`${link.source}|${link.destination}|${link.anchor}`, link])).values()];
  await writeFile(linksOutput, ['Source URL,Destination URL,Link Status,Anchor Text,Recommended Fix', ...uniqueLinks.map(link => [base + link.source, base + link.destination, paths.includes(link.destination) ? '200 in sitemap' : 'outside sitemap; review', link.anchor, paths.includes(link.destination) ? '' : 'Check destination'].map(csv).join(','))].join('\n') + '\n');
}
console.log(JSON.stringify({ output, routes: rows.length, non200: rows.filter(row => live && row['HTTP status'] !== '200').map(row => [row.pathname, row['HTTP status']]), orphans: rows.filter(row => row['Inbound internal links'] === 0).map(row => row.pathname) }));
