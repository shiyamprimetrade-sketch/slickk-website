/* global Response, URL, URLSearchParams, fetch, AbortSignal */
import { limitedJson } from '../../lib/body.js';
import { allowRequest } from '../../lib/rate-limit.js';
import { AI_MODEL, aiCapacity, reserveAiRequest } from '../../lib/ai-availability.js';

const reply = (status, body) => new Response(JSON.stringify(body), {
  status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
});
const policies = {
  proposal: 'Draft a short business proposal outline using only supplied facts. Never invent clients, fees, deadlines, results, or commitments. Mark missing facts as questions. Plain text only.',
  seo: 'Draft a page title, meta description and a short list of search-intent questions from the supplied business description. Do not claim measured volume, rank or Google endorsement. Plain text only.',
  workspace: 'Give an example-only Google Workspace automation plan. Do not claim access to Gmail, Drive or Calendar. Mention permissions, testing and human approval before any real account action. Plain text only.',
};

export async function onRequest({ request, env }) {
  if (request.method !== 'POST') return reply(405, { ok: false, error: 'POST required' });
  const cap = aiCapacity(env);
  if (!cap) return reply(503, { ok: false, error: 'AI showcase unavailable' });
  if (request.headers.get('Origin') !== new URL(request.url).origin) return reply(403, { ok: false, error: 'Invalid origin' });
  if (request.headers.get('Content-Type')?.split(';', 1)[0].trim().toLowerCase() !== 'application/json') return reply(415, { ok: false, error: 'JSON required' });
  if (Number(request.headers.get('Content-Length') || 0) > 4_000) return reply(413, { ok: false, error: 'Request too large' });
  let data;
  try { data = await limitedJson(request, 4_000); }
  catch (error) { return reply(error instanceof RangeError ? 413 : 400, { ok: false, error: 'Invalid JSON' }); }
  const keys = data && typeof data === 'object' && !Array.isArray(data) ? Object.keys(data) : [];
  if (keys.length !== 4 || keys.some(key => !['mode', 'input', 'consent', 'turnstile'].includes(key)) ||
      !Object.hasOwn(policies, data.mode) || typeof data.input !== 'string' ||
      data.input.trim().length < 20 || data.input.length > 800 || data.consent !== true ||
      typeof data.turnstile !== 'string' || data.turnstile.length < 10 || data.turnstile.length > 2_048) {
    return reply(400, { ok: false, error: 'Check your input and consent' });
  }
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  try { if (!await allowRequest(env, ip, 'gemini', 3, 3_600)) return reply(429, { ok: false, error: 'Try again later' }); }
  catch { return reply(503, { ok: false, error: 'Rate limiting unavailable' }); }
  try {
    const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST', body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: data.turnstile, remoteip: ip }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!verification.ok) return reply(503, { ok: false, error: 'Verification unavailable' });
    const checked = await verification.json();
    if (!checked?.success || checked.hostname !== new URL(request.url).hostname || checked.action !== 'gemini') return reply(403, { ok: false, error: 'Verification failed' });
  } catch { return reply(503, { ok: false, error: 'Verification unavailable' }); }
  try { if (!await reserveAiRequest(env.INQUIRIES_DB, cap)) return reply(429, { ok: false, error: 'Daily capacity reached' }); }
  catch { return reply(503, { ok: false, error: 'Daily capacity unavailable' }); }
  const prompt = `${policies[data.mode]}\n\nBusiness input:\n${data.input.trim()}`;
  try {
    const upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${AI_MODEL}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { maxOutputTokens: 256, temperature: 0.4 } }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!upstream.ok) return reply(upstream.status === 429 ? 429 : 502, { ok: false, error: upstream.status === 429 ? 'AI capacity reached' : 'AI provider unavailable' });
    const result = await upstream.json();
    const output = result?.candidates?.[0]?.content?.parts?.map(part => typeof part.text === 'string' ? part.text : '').join('').trim();
    if (!output) return reply(502, { ok: false, error: 'AI response unavailable' });
    return reply(200, { ok: true, text: output.slice(0, 2_500), limited: output.length > 2_500 });
  } catch { return reply(502, { ok: false, error: 'AI provider unavailable' }); }
}
