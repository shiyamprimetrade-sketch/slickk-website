export const AI_MODEL = 'gemini-3.5-flash-lite';

export function aiCapacity(env) {
  const cap = Number(env?.MAX_AI_REQUESTS_PER_DAY);
  return env?.GEMINI_SHOWCASE_ENABLED === 'true' &&
    typeof env.GEMINI_API_KEY === 'string' && env.GEMINI_API_KEY.length > 20 &&
    env.GEMINI_MODEL === AI_MODEL &&
    Boolean(env.TURNSTILE_SECRET && env.INQUIRIES_DB?.prepare) &&
    Number.isSafeInteger(cap) && cap >= 1 && cap <= 100 ? cap : 0;
}

export async function reserveAiRequest(db, cap) {
  const result = await db.prepare(
    "INSERT INTO ai_usage_daily(day,requests) VALUES (date('now'),1) " +
    'ON CONFLICT(day) DO UPDATE SET requests=requests+1 WHERE requests < ? RETURNING requests'
  ).bind(cap).first();
  return Boolean(result && Number.isInteger(result.requests) && result.requests <= cap);
}
