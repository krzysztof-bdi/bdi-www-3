// app/api/lead-ngo/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendToN8n } from '@/lib/webhook';

// Sekcja 2.3 — preskryptywny szkielet: walidacja zod + honeypot + payload z dynamicznym Intent_ID
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
  try {
    const data = LeadSchema.parse(await req.json());

    // honeypot — ciche odrzucenie spamu
    if (data.hp) return NextResponse.json({ ok: true });

    const webhookUrl = process.env.N8N_WEBHOOK_NGO;
    if (!webhookUrl) throw new Error('Missing N8N_WEBHOOK_NGO');

    // payload do integracji (np. n8n → CRM)
    const payload = {
      Name: data.Name,
      Email: data.Email,
      Phone: data.Phone,
      Organization: data.Organization,
      Interest_Intro: data.Interest_Intro,
      Interest_Premium: data.Interest_Premium,
      Lead_Source: data.Lead_Source || 'LP NGO',
      Intent_ID: data.Intent_ID, // dynamiczny z formy/komponentu
      Marketing_Consent: data.Marketing_Consent,
      UTM_Source: '', // opcjonalnie: uzupełnić po stronie klienta
      UTM_Medium: '',
      UTM_Campaign: '',
    };

    await sendToN8n(webhookUrl, payload);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
  }
}
