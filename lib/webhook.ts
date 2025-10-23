import { createHmac } from 'node:crypto';

export async function sendToN8n(url: string, payload: unknown) {
  const secret = process.env.WEBHOOK_HMAC_SECRET ?? '';
  const body = JSON.stringify(payload);
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (secret) {
    const sig = createHmac('sha256', secret).update(body).digest('hex');
    headers['X-Signature'] = sig;
  }
  const res = await fetch(url, { method: 'POST', headers, body, cache: 'no-store' as any, next: { revalidate: 0 } as any });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`n8n_error ${res.status}: ${text}`);
  }
}
