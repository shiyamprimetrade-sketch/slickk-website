import type { APIRoute } from 'astro';
import { brand, indexablePaths } from '../data/agency';
export const GET: APIRoute = () => {
  const xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + indexablePaths.map((path) => '<url><loc>' + brand.url + path + '</loc></url>').join('') + '</urlset>';
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
