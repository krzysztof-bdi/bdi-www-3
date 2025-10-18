import { NextResponse } from 'next/server'

// Prosty rate-limiter w pamięci
const WINDOW_MS = 60 * 1000;     // 1 minuta
const MAX_PER_WINDOW = 5;      // max 5 zgłoszeń na IP na minutę
const hits = new Map<string, {count:number, ts:number}>()

export async function POST(req: Request){
  // --- Rate Limiter ---
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  const rec = hits.get(ip)

  if (!rec || now - rec.ts > WINDOW_MS) {
    // Pierwsze zapytanie lub okno czasowe minęło
    hits.set(ip, { count: 1, ts: now })
  } else if (rec.count >= MAX_PER_WINDOW) {
    // Zbyt wiele zapytań
    return NextResponse.json({ ok:false, error:'Too many requests' }, { status: 429 })
  } else {
    // Zwiększ licznik
    rec.count++; 
    hits.set(ip, rec)
  }

  const data = await req.json().catch(()=> ({} as any))

  // --- Honeypot ---
  // Jeśli bot wypełnił ukryte pole `Company`, cicho ignorujemy zapytanie
  if (data.Company && String(data.Company).trim().length > 0) {
    return NextResponse.json({ ok:true }) // Udajemy sukces, ale nic nie robimy
  }

  // --- Minimalna walidacja ---
  if (!data.Name || !data.Email || !data.Message) {
    return NextResponse.json({ ok:false, error:'Invalid payload' }, { status: 400 })
  }

  // Jeśli wszystko OK, logujemy dane (w przyszłości wyślemy do Zoho)
  console.log('contact-lead', {
    Name: data.Name,
    Email: data.Email,
    Message: data.Message,
    Source: data.Source,
    ip,
  })

  return NextResponse.json({ ok:true })
}

