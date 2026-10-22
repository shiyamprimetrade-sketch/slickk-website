import type { APIRoute } from 'astro';
import { editorialPages } from '../data/pages';
import { site } from '../data/site';
export const GET: APIRoute = () => {
  const paths = ['/', '/products/', '/global-sourcing/', '/contact/', '/faq/', ...editorialPages.map((page) => `/${page.slug}/`)];
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${site.url}${path}</loc></url>`).join('')}</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
