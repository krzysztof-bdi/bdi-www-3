import crypto from 'crypto'

function stableStringify(value: any): string {
  if (value === null || typeof value !== 'object') {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(',')}]`;
  }
  const keys = Object.keys(value).sort();
  return `{${keys.map(k => `${JSON.stringify(k)}:${stableStringify(value[k])}`).join(',')}}`;
}

export async function sendToN8n(url: string, payload: Record<string, any>) {
  const secret = process.env.WEBHOOK_HMAC_SECRET;
  if (!url) throw new Error('Brak URL webhooka n8n w konfiguracji serwera.');
  if (!secret) throw new Error('Brak WEBHOOK_HMAC_SECRET w konfiguracji serwera.');

  const body = stableStringify(payload);
  const ts = Date.now().toString();
  const sig = 'sha256=' + crypto.createHmac('sha256', secret).update(body).digest('hex');

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Timestamp': ts,
      'X-Signature': sig,
      'X-Request-ID': crypto.randomUUID(),
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Błąd odpowiedzi z n8n (status: ${res.status}): ${text}`);
  }
  
  return await res.json().catch(() => ({}));
}
