import { NextResponse } from 'next/server'
import { sendToN8n } from '@/lib/webhook'

export async function POST(req: Request) {
  try {
    const data = await req.json().catch(() => ({}))
    const url = process.env.N8N_WEBHOOK_QUIZ
    if (!url) throw new Error('Brak skonfigurowanego webhooka dla quizu.')

    const payload = {
      Name: data.Name,
      Email: data.Email,
      Quiz_Score: data.Score,
      Segment_ID: data.Segment_ID,
      Source: 'Quiz WWW',
      Intent_ID: 'QUIZ',
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
