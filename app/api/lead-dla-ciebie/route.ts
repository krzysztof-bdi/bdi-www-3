import { NextResponse } from 'next/server'
import { sendToN8n } from '@/lib/webhook'

export async function POST(req: Request){
  const data = await req.json().catch(()=> ({}))
  if (data?.hp) return NextResponse.json({ ok:true, skipped:'honeypot' })
  const url = process.env.N8N_WEBHOOK_DLA_CIEBIE
  if (!url) return NextResponse.json({ ok:false, error: 'Brak N8N_WEBHOOK_DLA_CIEBIE' }, { status: 500 })

  const payload = {
    Name: data.Name,
    Email: data.Email,
    Message: data.Message ?? null,
    Source: 'LP B2C',
    Intent_ID: 'LP_B2C',
    Verification_Status: 'pending',
    ip: (req.headers.get('x-forwarded-for') || '').split(',')[0]?.trim(),
    ts: new Date().toISOString(),
  }
  const out = await sendToN8n(url, payload)
  return NextResponse.json({ ok:true, response: out })
}
