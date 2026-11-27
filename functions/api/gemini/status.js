/* global Response */
import { aiCapacity } from '../../lib/ai-availability.js';

export async function onRequestGet({ env }) {
  let enabled = false;
  if (aiCapacity(env)) {
    try {
      await env.INQUIRIES_DB.prepare('SELECT requests FROM ai_usage_daily LIMIT 1').first();
      enabled = true;
    } catch { /* A missing budget ledger must fail closed. */ }
  }
  return new Response(JSON.stringify({ enabled }), {
    status: 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
