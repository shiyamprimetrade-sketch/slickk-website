/* global TextDecoder */
export async function limitedJson(request, limit) {
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError('Body required');
  const chunks = []; let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) { await reader.cancel(); throw new RangeError('Body too large'); }
    chunks.push(value);
  }
  const combined = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { combined.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(combined));
}
