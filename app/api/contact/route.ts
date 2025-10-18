import { NextResponse } from 'next/server'
export async function POST(req: Request){
  const data = await req.json().catch(()=> ({}))
  console.log('contact-lead', data)
  // TODO: wpięcie Zoho (sekrety z ENV) + walidacja
  return NextResponse.json({ ok:true })
}
