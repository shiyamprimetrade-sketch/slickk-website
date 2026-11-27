/* global fetch, AbortSignal */
const emailAddress = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const accountId = /^[a-f0-9]{32}$/i;

export function createInquiryNotifier(env) {
  const destination = env.INQUIRY_DESTINATION?.trim();
  const sender = env.INQUIRY_NOTIFICATION_FROM?.trim();
  if (!emailAddress.test(destination ?? '')) return null;

  if (env.EMAIL?.send) {
    return (message) => env.EMAIL.send({
      ...message,
      from: sender || 'contact@slickk.online',
      to: destination,
    });
  }

  if (!env.INQUIRY_EMAIL_API_TOKEN || !accountId.test(env.INQUIRY_EMAIL_ACCOUNT_ID ?? '') || !emailAddress.test(sender ?? '')) return null;
  return async (message) => {
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.INQUIRY_EMAIL_ACCOUNT_ID}/email/sending/send`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + env.INQUIRY_EMAIL_API_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...message, from: sender, to: destination }),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok || !(await response.json()).success) throw new Error('Inquiry email rejected');
  };
}
