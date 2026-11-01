import { pathToFileURL } from 'node:url';

const site = 'https://slickk.online/';
const isoDate = /^\d{4}-\d{2}-\d{2}$/;

export async function querySearchConsole({ token, startDate, endDate, dimensions, fetcher = fetch }) {
  if (!token) throw new Error('GSC_ACCESS_TOKEN is required. Use a short-lived OAuth token with webmasters.readonly scope.');
  if (!isoDate.test(startDate) || !isoDate.test(endDate) || startDate > endDate) throw new Error('Use valid --start and --end dates in YYYY-MM-DD order.');
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}/searchAnalytics/query`;
  const response = await fetcher(endpoint, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ startDate, endDate, dimensions, rowLimit: 100 }),
  });
  if (!response.ok) throw new Error(`Search Console API returned HTTP ${response.status}. Check property access and OAuth scope.`);
  return response.json();
}

async function main() {
  const args = Object.fromEntries(process.argv.slice(2).map(arg => {
    const match = /^--(start|end)=(\d{4}-\d{2}-\d{2})$/.exec(arg);
    if (!match) throw new Error('Usage: npm run gsc:report -- --start=YYYY-MM-DD --end=YYYY-MM-DD');
    return [match[1], match[2]];
  }));
  if (!args.start || !args.end) throw new Error('Usage: npm run gsc:report -- --start=YYYY-MM-DD --end=YYYY-MM-DD');
  const token = process.env.GSC_ACCESS_TOKEN;
  const [daily, queries, pages] = await Promise.all([
    querySearchConsole({ token, startDate: args.start, endDate: args.end, dimensions: ['date'] }),
    querySearchConsole({ token, startDate: args.start, endDate: args.end, dimensions: ['query'] }),
    querySearchConsole({ token, startDate: args.start, endDate: args.end, dimensions: ['page'] }),
  ]);
  console.log(JSON.stringify({ property: site, period: args, daily: daily.rows ?? [], queries: queries.rows ?? [], pages: pages.rows ?? [] }, null, 2));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
