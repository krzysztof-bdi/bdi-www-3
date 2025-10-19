import { NextResponse } from 'next/server'
import { sendToN8n } from '@/lib/webhook'

export async function POST(req: Request) {
  try {
    const data = await req.json().catch(() => ({}));
    const url = process.env.N8N_WEBHOOK_QUIZ;

    if (!url) {
      throw new Error('Brak skonfigurowanego webhooka dla quizu.');
    }
    
    const payload = {
      Name: data.Name,
      Email: data.Email,
      Quiz_Score: data.Score,
      Segment_ID: data.Segment_ID,
      Source: 'Quiz WWW',
      ip: (req.headers.get('x-forwarded-for') || '').split(',')[0]?.trim(),
      ts: new Date().toISOString(),
    };
    
    const n8nResponse = await sendToN8n(url, payload);
    return NextResponse.json({ ok: true, response: n8nResponse });
  } catch (error: any) {
    console.error('Błąd w /api/lead-quiz:', error.message);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
