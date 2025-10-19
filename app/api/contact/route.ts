import { NextResponse } from 'next/server'
import { sendToN8n } from '@/lib/webhook'

export async function POST(req: Request){
  const data = await req.json().catch(()=> ({}))

  const payload = {
    Name: data.Name,
    Email: data.Email,
    Message: data.Message,
    Source: 'Formularz Kontaktowy WWW',
    Intent_ID: 'CONTACT',
    Verification_Status: 'pending',
    ip: (req.headers.get('x-forwarded-for') || '').split(',')[0]?.trim(),
    ts: new Date().toISOString(),
  }

  const url = process.env.N8N_WEBHOOK_CONTACT
  const res = await sendToN8n(url!, payload)
  return NextResponse.json({ ok:true, response: res })
}
