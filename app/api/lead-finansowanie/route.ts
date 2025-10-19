import { NextResponse } from 'next/server'
import { sendToN8n } from '@/lib/webhook'

export async function POST(req: Request) {
  try {
    const data = await req.json().catch(() => ({}))
    const url = process.env.N8N_WEBHOOK_CALC
    if (!url) throw new Error('Brak skonfigurowanego webhooka dla kalkulatora.')

    const payload = {
      Name: data.Name,
      Email: data.Email,
      Estimated_Funding: data.Estimate,
      Program_ID: data.Program_ID ?? data.Inputs?.program ?? null,
      Source: 'Kalkulator WWW',
      Intent_ID: 'CALC',
      Verification_Status: 'pending',
      ip: (req.headers.get('x-forwarded-for') || '').split(',')[0]?.trim(),
      ts: new Date().toISOString(),
    }

    const out = await sendToN8n(url, payload)
    return NextResponse.json({ ok: true, response: out })
  } catch (e:any) {
    return NextResponse.json({ ok:false, error: e.message }, { status: 500 })
  }
}
