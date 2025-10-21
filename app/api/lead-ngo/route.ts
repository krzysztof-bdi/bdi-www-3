import { NextResponse } from 'next/server'
import { sendToN8n } from '@/lib/webhook'

export async function POST(req: Request) {
  try {
    const data = await req.json().catch(() => ({} as any))
    if ((data as any)?.hp) {
      return NextResponse.json({ ok: true, skipped: 'honeypot' })
    }

    const url = process.env.N8N_WEBHOOK_NGO
    if (!url) throw new Error('Brak N8N_WEBHOOK_NGO')

    const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0]?.trim()
    const payload = {
      Name: (data as any).Name,
      Email: (data as any).Email,
      Organization: (data as any).Organization ?? null,
      Message: (data as any).Message ?? null,
      Source: 'LP NGO',
      Intent_ID: 'LP_NGO',
      Verification_Status: 'pending',
      ip,
      ts: new Date().toISOString(),
    }

    const out = await sendToN8n(url, payload)
    return NextResponse.json({ ok: true, response: out })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
