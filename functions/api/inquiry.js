/* global Response, URL, fetch, URLSearchParams */
// Cloudflare Pages Function. No credentials or customer inquiries belong in the static bundle.
// Required: TURNSTILE_SECRET, INQUIRY_DESTINATION, and a restricted EMAIL send binding.
// Optional: INQUIRY_RATE_LIMIT binding with limit({ key }) and Cloudflare WAF rate limiting.
const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });
const services = new Set(['general','software-development','app-development','web-development','seo-services','digital-marketing','content-creation','branding-graphic-design','ai-automation','logo-design','brochure-design','brand-identity','company-profile-design','website-development','seo','graphic-design']);
const budgets = new Set(['Not specified','Under BDT 25000','BDT 25000-50000','BDT 50000-100000','BDT 100000+']);
const text = (value, max) => typeof value === 'string' && value.trim().length <= max ? value.trim() : null;
export async function onRequestPost({ request, env }) {
  if (!env?.EMAIL?.send || !env.TURNSTILE_SECRET || !env.INQUIRY_DESTINATION) return json(503, { ok: false, error: 'Not configured' });
  const origin = request.headers.get('Origin');
  if (!origin || origin !== new URL(request.url).origin) return json(403, { ok: false, error: 'Invalid origin' });
  if (!request.headers.get('Content-Type')?.startsWith('application/json')) return json(415, { ok: false, error: 'Unsupported request' });
  if (Number(request.headers.get('Content-Length') || 0) > 12_000) return json(413, { ok: false, error: 'Request too large' });
  let data;
  try {
    const raw = await request.text();
    if (raw.length > 12_000) return json(413, { ok: false, error: 'Request too large' });
    data = JSON.parse(raw);
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw Error('Invalid payload');
  } catch { return json(400, { ok: false, error: 'Invalid request' }); }
  if (data.website) return json(200, { ok: true }); // Honeypot traps automated spam without sending.
  const name = text(data.name, 100), company = text(data.company || '', 140);
  const email = text(data.email, 254), message = text(data.message, 3000);
  const service = text(data.service, 50), budget = text(data.budget, 50);
  const token = text(data['cf-turnstile-response'], 2048);
  const phone = text(data.phone || '',30), timeline = text(data.timeline || 'Flexible',50), reference = text(data.reference || '',500);
  if(phone === null || timeline === null || reference === null || (reference && !/^https:\/\/[a-z\d.-]+(?::\d{1,5})?(?:\/|$)/i.test(reference))) return json(422,{ok:false,error:'Invalid optional fields'});
  if (!name || !email || !message || message.length < 20 || !service || !services.has(service) || !budget || !budgets.has(budget) || data.consent !== 'on' || !token || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(422, { ok: false, error: 'Invalid fields' });
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (env.INQUIRY_RATE_LIMIT) {
    try {
      const limited = await env.INQUIRY_RATE_LIMIT.limit({ key: ip });
      if (!limited.success) return json(429, { ok: false, error: 'Try again later' });
    } catch { return json(503, { ok: false, error: 'Rate limiting unavailable' }); }
  }
  let verification;
  try {
    const check = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST', body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token, remoteip: ip })
    });
    verification = await check.json();
  } catch { return json(503, { ok: false, error: 'Verification unavailable' }); }
  const host = new URL(request.url).hostname;
  if (!verification?.success || verification.hostname !== host) return json(403, { ok: false, error: 'Verification failed' });
  const dest = text(env.INQUIRY_DESTINATION, 254);
  if (!dest || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dest)) return json(503, { ok: false, error: 'Destination unavailable' });
  try {
    await env.EMAIL.send({
      from: 'contact@slickk.online', to: dest, replyTo: email,
      subject: 'Slickk project inquiry — ' + service,
      text: ['Name: '+name,'Company: '+company,'Email: '+email,'Service: '+service,'Budget: '+budget,'Phone / WhatsApp: '+phone,'Timeline: '+timeline,'Reference: '+reference,'','Project:',''+message].join('\n'),
    });
    return json(200, { ok: true });
  } catch { return json(502, { ok: false, error: 'Delivery unavailable' }); }
}
