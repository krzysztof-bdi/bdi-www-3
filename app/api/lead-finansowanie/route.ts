import { NextResponse } from 'next/server'
import { sendToN8n } from '@/lib/webhook'

export async function POST(req: Request) {
  try {
    const data = await req.json().catch(() => ({}));
    const url = process.env.N8N_WEBHOOK_CALC;

    if (!url) {
      throw new Error('Brak skonfigurowanego webhooka dla kalkulatora.');
    }

    const payload = {
      Name: data.Name,
      Email: data.Email,
      Estimated_Funding: data.Estimate,
      Program_ID: data.Inputs?.kwota, // Assuming this is what Program_ID should be
      Source: 'Kalkulator WWW',
      ip: (req.headers.get('x-forwarded-for') || '').split(',')[0]?.trim(),
      ts: new Date().toISOString(),
    };

    const n8nResponse = await sendToN8n(url, payload);
    return NextResponse.json({ ok: true, response: n8nResponse });
  } catch (error: any) {
    console.error('Błąd w /api/lead-finansowanie:', error.message);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
