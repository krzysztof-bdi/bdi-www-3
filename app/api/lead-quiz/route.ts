import { NextResponse } from 'next/server'
import { sendZoho } from '@/lib/zoho'

const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 10
const hits = new Map<string, {count:number, ts:number}>()

export async function POST(req: Request){
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  const rec = hits.get(ip)
  if (!rec || now - rec.ts > WINDOW_MS) hits.set(ip, { count: 1, ts: now })
  else if (rec.count >= MAX_PER_WINDOW) return NextResponse.json({ ok:false, error:'Too many requests' }, { status: 429 })
  else { rec.count++; hits.set(ip, rec) }

  const data = await req.json().catch(()=> ({} as any))

  // honeypot
  if (data.Company && String(data.Company).trim().length > 0) {
    return NextResponse.json({ ok:true })
  }

  // minimalna walidacja
  if (!data.Email || !data.Score || !Array.isArray(data.Answers)) {
    return NextResponse.json({ ok:false, error:'Invalid payload' }, { status: 400 })
  }

  const payload = {
    Type: 'Quiz',
    Email: data.Email,
    Name: data.Name ?? '',
    Score: data.Score,
    Answers: data.Answers,
    Source: data.Source ?? 'Quiz WWW',
    ip, ts: new Date().toISOString()
  }

  try {
    const res = await sendZoho(payload)
    console.log('lead-quiz', { ...payload, sentToZoho: !res.dryRun })
    return NextResponse.json({ ok:true })
  } catch (e:any) {
    console.error('zoho-fail-quiz', e?.message)
    return NextResponse.json({ ok:false, error:'Integration error' }, { status: 502 })
  }
}
