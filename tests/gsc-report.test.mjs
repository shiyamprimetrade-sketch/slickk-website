import { test } from 'node:test';
import assert from 'node:assert/strict';
import { querySearchConsole } from '../scripts/gsc-report.mjs';

test('Search Console report calls the read endpoint without exposing its token in output', async () => {
  let request;
  const rows = [{ keys: ['slickk'], clicks: 0, impressions: 77 }];
  const result = await querySearchConsole({ token: 'test-token', startDate: '2026-10-23', endDate: '2026-10-27', dimensions: ['query'], fetcher: async (url, options) => {
    request = { url, options };
    return { ok: true, json: async () => ({ rows }) };
  } });
  assert.deepEqual(result.rows, rows);
  assert.equal(request.url, 'https://www.googleapis.com/webmasters/v3/sites/https%3A%2F%2Fslickk.online%2F/searchAnalytics/query');
  assert.deepEqual(JSON.parse(request.options.body), { startDate: '2026-10-23', endDate: '2026-10-27', dimensions: ['query'], rowLimit: 100 });
  assert.equal(request.options.headers.Authorization, 'Bearer test-token');
  assert.ok(!JSON.stringify(result).includes('test-token'));
});

test('Search Console report rejects missing credentials, invalid dates and access errors', async () => {
  const base = { token: 'test-token', startDate: '2026-10-23', endDate: '2026-10-27', dimensions: ['date'] };
  await assert.rejects(querySearchConsole({ ...base, token: '' }), /GSC_ACCESS_TOKEN/);
  await assert.rejects(querySearchConsole({ ...base, startDate: '2026-10-28' }), /valid --start/);
  await assert.rejects(querySearchConsole({ ...base, fetcher: async () => ({ ok: false, status: 403 }) }), /HTTP 403/);
});
