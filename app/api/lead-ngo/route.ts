// app/api/lead-ngo/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendToN8n } from '@/lib/webhook';

const LeadSchema = z.object({
  Name: z.string().min(1),
  Email: z.string().email(),
  Phone: z.string().optional(),
  Organization: z.string().optional(),
  Interest_Intro: z.boolean().optional(),
  Interest_Premium: z.boolean().optional(),
  Lead_Source: z.string().optional(),
  Intent_ID: z.string().min(1).default('LP_NGO'),
  Marketing_Consent: z.boolean().default(false),
  hp: z.string().optional().default(''),
});

export async function POST(req: Request) {
  console.log('[lead-ngo] Otrzymano zapytanie...');
  try {
    const data = LeadSchema.parse(await req.json());

    if (data.hp) {
      console.log('[lead-ngo] Wykryto Honeypot, ciche odrzucenie.');
      return NextResponse.json({ ok: true });
    }

    const webhookUrl = process.env.N8N_WEBHOOK_NGO;
    if (!webhookUrl) {
      console.error('[lead-ngo] Błąd krytyczny: Brak zmiennej N8N_WEBHOOK_NGO.');
      throw new Error('Missing N8N_WEBHOOK_NGO');
    }

    const payload = {
      Name: data.Name,
      Email: data.Email,
      Phone: data.Phone,
      Organization: data.Organization,
      Interest_Intro: data.Interest_Intro,
      Interest_Premium: data.Interest_Premium,
      Lead_Source: data.Lead_Source || 'LP NGO',
      Intent_ID: data.Intent_ID,
      Marketing_Consent: data.Marketing_Consent,
      UTM_Source: '',
      UTM_Medium: '',
      UTM_Campaign: '',
    };

    console.log('[lead-ngo] Próba wysłania danych do n8n...');
    await sendToN8n(webhookUrl, payload);
    
    console.log('[lead-ngo] Sukces, wysłano dane.');
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error('[lead-ngo] BŁĄD KRYTYCZNY:', e.message);
    return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
  }
}