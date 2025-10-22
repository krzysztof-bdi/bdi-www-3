import { NextResponse } from 'next/server'
import { sendToN8n } from '@/lib/webhook'

export async function POST(req: Request) {
  try {
    const data = await req.json().catch(() => ({}))
    if (data?.hp) return NextResponse.json({ ok: true, skipped: 'honeypot' })

    const url = process.env.N8N_WEBHOOK_PRAWNIKOW
    if (!url) throw new Error('Brak N8N_WEBHOOK_PRAWNIKOW')

    const payload = {
      Name: data.Name,
      Email: data.Email,
      Law_Firm: data.Law_Firm ?? null,
      Message: data.Message ?? null,
      Source: 'LP PRAWO',
      Intent_ID: 'LP_PRAWNICY',
      Verification_Status: 'pending',
      ip: (req.headers.get('x-forwarded-for') || '').split(',')[0]?.trim(),
      ts: new Date().toISOString()
    }

    const out = await sendToN8n(url, payload)
    return NextResponse.json({ ok: true, response: out })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
