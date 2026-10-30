import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { onRequest } from '../functions/api/gemini/process.js';
import { onRequestGet } from '../functions/api/gemini/status.js';
import { AI_MODEL, reserveAiRequest } from '../functions/lib/ai-availability.js';

const input = { mode: 'proposal', input: 'We need a simple website for our business customers.', consent: true, turnstile: 'valid-mock-token' };
const request = (value = input, options = {}) => new Request('https://slickk.online/api/gemini/process', {
  method: options.method ?? 'POST',
  headers: { Origin: options.origin ?? 'https://slickk.online', 'Content-Type': options.contentType ?? 'application/json' },
  body: options.method === 'GET' ? undefined : typeof value === 'string' ? value : JSON.stringify(value),
});
const env = (overrides = {}) => ({
  GEMINI_SHOWCASE_ENABLED: 'true', GEMINI_API_KEY: 'mock-key-longer-than-twenty-characters', GEMINI_MODEL: AI_MODEL,
  MAX_AI_REQUESTS_PER_DAY: '2', TURNSTILE_SECRET: 'test-secret',
  INQUIRY_RATE_LIMIT: { limit: async () => ({ success: true }) },
  INQUIRIES_DB: { prepare: () => ({ bind: () => ({ first: async () => ({ requests: 1 }) }), first: async () => null }) },
  ...overrides,
});
const run = async (value, overrides = {}, options = {}) => onRequest({ request: request(value, options), env: env(overrides) });

test('AI endpoint fails closed without key, model, migration, or feature flag', async () => {
  for (const overrides of [
    { GEMINI_SHOWCASE_ENABLED: 'false' }, { GEMINI_API_KEY: '' }, { GEMINI_MODEL: 'unknown-model' },
    { MAX_AI_REQUESTS_PER_DAY: '0' }, { INQUIRIES_DB: null },
  ]) {
    const response = await run(input, overrides);
    assert.equal(response.status, 503);
  }
  const status = await onRequestGet({ env: env({ GEMINI_SHOWCASE_ENABLED: 'false' }) });
  assert.deepEqual(await status.json(), { enabled: false });
  assert.equal(status.headers.get('Cache-Control'), 'no-store');
  const missingLedger = await onRequestGet({ env: env({ INQUIRIES_DB: { prepare: () => { throw Error('table missing'); } } }) });
  assert.deepEqual(await missingLedger.json(), { enabled: false });
});

test('AI endpoint enforces method, origin, JSON, body and schema', async () => {
  assert.equal((await run(input, {}, { method: 'GET' })).status, 405);
  assert.equal((await run(input, {}, { origin: 'https://evil.example' })).status, 403);
  assert.equal((await run(input, {}, { contentType: 'text/plain' })).status, 415);
  assert.equal((await run('{bad json')).status, 400);
  assert.equal((await run({ ...input, input: 'x'.repeat(4_100) })).status, 413);
  assert.equal((await run({ ...input, mode: 'admin' })).status, 400);
  assert.equal((await run({ ...input, consent: false })).status, 400);
  assert.equal((await run({ ...input, extra: 'value' })).status, 400);
});

test('AI endpoint verifies Turnstile, per-IP limit, daily budget and provider errors', async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () => new Response(JSON.stringify({ success: false }), { status: 200 });
    assert.equal((await run(input)).status, 403);
    assert.equal((await run(input, { INQUIRY_RATE_LIMIT: { limit: async () => ({ success: false }) } })).status, 429);
    globalThis.fetch = async url => url.includes('turnstile')
      ? new Response(JSON.stringify({ success: true, hostname: 'slickk.online', action: 'gemini' }))
      : new Response('{}', { status: 500 });
    const capped = { INQUIRIES_DB: { prepare: () => ({ bind: () => ({ first: async () => null }) }) } };
    assert.equal((await run(input, capped)).status, 429);
    assert.equal((await run(input)).status, 502);
    globalThis.fetch = async url => url.includes('turnstile')
      ? new Response(JSON.stringify({ success: true, hostname: 'slickk.online', action: 'gemini' }))
      : new Response('{}', { status: 429 });
    assert.equal((await run(input)).status, 429);
  } finally { globalThis.fetch = original; }
});

test('AI happy path returns escaped JSON text and never exposes key or HTML markup', async () => {
  const original = globalThis.fetch;
  const seen = [];
  try {
    globalThis.fetch = async (url, options) => {
      seen.push({ url, headers: options.headers, body: options.body });
      return url.includes('turnstile')
        ? new Response(JSON.stringify({ success: true, hostname: 'slickk.online', action: 'gemini' }))
        : new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: '<script>alert(1)</script>' }] } }] }));
    };
    const response = await run(input);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    const body = await response.json();
    assert.deepEqual(body, { ok: true, text: '<script>alert(1)</script>', limited: false });
    assert.ok(seen[1].url.endsWith(`/${AI_MODEL}:generateContent`));
    assert.ok(!seen[1].url.includes('mock-key'));
    assert.ok(!JSON.stringify(body).includes('mock-key'));
  } finally { globalThis.fetch = original; }
});

test('daily AI reservations stop atomically at the configured cap without prompt data', async () => {
  const database = new DatabaseSync(':memory:');
  database.exec(readFileSync('migrations/0003_ai_usage.sql', 'utf8'));
  const adapter = { prepare: sql => ({ bind: cap => ({ first: async () => database.prepare(sql).get(cap) }) }) };
  assert.equal(await reserveAiRequest(adapter, 2), true);
  assert.equal(await reserveAiRequest(adapter, 2), true);
  assert.equal(await reserveAiRequest(adapter, 2), false);
  assert.equal(database.prepare('SELECT requests FROM ai_usage_daily').get().requests, 2);
  database.close();
});
