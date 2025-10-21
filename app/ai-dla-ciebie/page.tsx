'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import OrgStamp from '@/components/OrgStamp'

export default function Page() {
  const [form, setForm] = useState({ name:'', email:'', message:'', agree:false, hp:'' })
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | undefined>()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(undefined)
    if (form.hp) return setDone(true)
    if (!form.email || !form.agree) { setError('Podaj e-mail i zgodę.'); return }

    try {
      setSending(true)
      const res = await fetch('/api/lead-dla-ciebie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Name: form.name,
          Email: form.email,
          Message: form.message || null,
          hp: form.hp
        })
      })
      if (!res.ok) throw new Error('Błąd wysyłki')
      setDone(true)
    } catch (err: any) {
      setError(err?.message || 'Błąd wysyłki')
    } finally { setSending(false) }
  }

  if (done) {
    return (
      <section className="container-p py-12 max-w-2xl">
        <h1 className="font-heading text-3xl mb-2">Dziękujemy!</h1>
        <p className="text-text-secondary">Mamy Twój kontakt.</p>
        <OrgStamp />
      </section>
    )
  }

  return (
    <section className="container-p py-12 max-w-2xl">
      <h1 className="font-heading text-4xl mb-3">AI dla Ciebie (Warszawa)</h1>
      <p className="text-text-secondary mb-6">Zostaw kontakt — wyślemy opcje dofinansowania.</p>

      <form onSubmit={submit} className="card p-6 space-y-4">
        <input type="text" className="hidden" value={form.hp} onChange={e=>setForm(s=>({ ...s, hp:e.target.value }))} />
        <div>
          <label className="block mb-1 text-sm text-text-secondary">Imię i nazwisko</label>
          <input className="w-full p-3 rounded-xl bg-background-secondary/60 border border-white/10"
                 value={form.name} onChange={e=>setForm(s=>({ ...s, name:e.target.value }))}/>
        </div>
        <div>
          <label className="block mb-1 text-sm text-text-secondary">E-mail</label>
          <input type="email" className="w-full p-3 rounded-xl bg-background-secondary/60 border border-white/10"
                 value={form.email} onChange={e=>setForm(s=>({ ...s, email:e.target.value }))}/>
        </div>
        <div>
          <label className="block mb-1 text-sm text-text-secondary">Wiadomość</label>
          <textarea rows={5} className="w-full p-3 rounded-xl bg-background-secondary/60 border border-white/10"
                    value={form.message} onChange={e=>setForm(s=>({ ...s, message:e.target.value }))}/>
        </div>
        <label className="flex items-start gap-3 text-sm text-text-secondary">
          <input type="checkbox" className="mt-1" checked={form.agree}
                 onChange={e=>setForm(s=>({ ...s, agree:e.target.checked }))}/>
          <span>Wyrażam zgodę na przetwarzanie danych zgodnie z <Link href="/polityka-prywatnosci" className="underline">Polityką prywatności</Link>.</span>
        </label>

        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button disabled={sending} className="link-cta">{sending ? 'Wysyłanie…' : 'Wyślij'}</button>
      </form>

      <div className="mt-8"><OrgStamp /></div>
    </section>
  )
}
