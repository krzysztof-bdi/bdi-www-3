// sendLead.ts

// --- 1) Sekret HMAC (ten sam co w n8n) ---
const SECRET = 'BDI_HMAC_2KT95N_2025_#KASZUBY';

// --- 2) Stabilne JSON.stringify (sortuje klucze, aby podpis zawsze się zgadzał) ---
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

// --- 3) Helper do konwersji na HEX ---
function toHex(buf: ArrayBuffer | Uint8Array): string {
  const u8 = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  return Array.from(u8, b => b.toString(16).padStart(2, '0')).join('');
}

// --- 4) Liczenie podpisu HMAC SHA-256 (działa w przeglądarce i po stronie serwera) ---
async function hmacSHA256Hex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  // Wersja dla przeglądarki (Web Crypto API)
  if (globalThis.crypto?.subtle) {
    const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
    return 'sha256=' + toHex(sig);
  }
  // Wersja rezerwowa dla Node.js (np. Vercel)
  const { createHmac } = await import('crypto');
  return 'sha256=' + createHmac('sha256', secret).update(message).digest('hex');
}

// --- 5) Funkcja pomocnicza do pauzy (dla retry) ---
function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

export type SendLeadOptions = {
  timeoutMs?: number;    // domyślnie 15000
  retries?: number;      // domyślnie 2 (łącznie 3 próby)
  requestId?: string;
};

// --- Główna funkcja do wysyłania danych ---
export async function sendLeadHmac<T = unknown>(
  url: string,
  payload: Record<string, any>,
  opts: SendLeadOptions = {}
): Promise<T> {
  const timeoutMs = opts.timeoutMs ?? 15000;
  const retries = opts.retries ?? 2;

  const body = stableStringify(payload);
  const ts = Date.now().toString();
  const signature = await hmacSHA256Hex(SECRET, body);
  const requestId = opts.requestId ?? (globalThis.crypto?.randomUUID?.() || `req_${Math.random().toString(36).slice(2)}`);

  let attempt = 0, lastErr: unknown;

  while (attempt <= retries) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Timestamp': ts,
          'X-Signature': signature,
          'X-Request-ID': requestId,
        },
        body,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        try { return (await res.json()) as T; } catch { return ({} as T); }
      }
      if (res.status >= 400 && res.status < 500 && res.status !== 408 && res.status !== 429) {
        throw new Error(`Błąd po stronie serwera (HTTP ${res.status}): ${await res.text()}`);
      }
      lastErr = new Error(`Błąd serwera lub sieci (HTTP ${res.status}): ${await res.text()}`);
    } catch (e) {
      lastErr = e;
      if ((e as any)?.name === 'AbortError') {
        lastErr = new Error('Przekroczono czas oczekiwania na odpowiedź serwera.');
      }
      if (attempt === retries) break;
    } finally {
      clearTimeout(timeoutId);
    }

    const backoff = 1000 * Math.pow(2, attempt);
    await sleep(backoff);
    attempt++;
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
}
