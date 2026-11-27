/* global crypto, TextEncoder */
export async function allowRequest(env, ip, purpose, limit, seconds) {
  if (env.INQUIRY_RATE_LIMIT) return (await env.INQUIRY_RATE_LIMIT.limit({key:purpose+':'+ip})).success;
  if (!env.INQUIRIES_DB?.prepare || !env.TURNSTILE_SECRET) throw new Error('Rate limiting unavailable');
  const bucket=Math.floor(Date.now()/(seconds*1000));
  const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(env.TURNSTILE_SECRET+':'+purpose+':'+bucket+':'+ip));
  const key=Array.from(new Uint8Array(digest),byte=>byte.toString(16).padStart(2,'0')).join('');
  const count=await env.INQUIRIES_DB.prepare('INSERT INTO inquiry_limits(key,attempts,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET attempts=attempts+1 RETURNING attempts').bind(key,(bucket+1)*seconds).first();
  if(!Number.isInteger(count?.attempts))throw new Error('Rate limiting unavailable');
  if(count.attempts===1){
    try{await env.INQUIRIES_DB.prepare('DELETE FROM inquiry_limits WHERE expires_at < unixepoch()').bind().run();}
    catch{/* Expired keys cannot match the current bucket; cleanup failure must not reject valid traffic. */}
  }
  return count.attempts<=limit;
}
