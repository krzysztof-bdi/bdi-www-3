'use client'
import OrgStamp from "@/components/OrgStamp"
import { useState } from 'react'
import Link from 'next/link'

async function postJSON(url: string, payload: any) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`HTTP error ${res.status}: ${await res.text()}`)
  try {
    return await res.json()
  } catch {
    return {}
  }
}

export default function KontaktPage() {
  const [state, setState] = useState({ name: '', email: '', message: '', agree: false, company: '' })
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(undefined)

    if (!state.name.trim()) return setError('Podaj imię i nazwisko.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) return setError('Podaj poprawny adres e-mail.')
    if (state.message.trim().length < 10) return setError('Napisz min. 10 znaków.')
    if (!state.agree) return setError('Zaznacz zgodę na przetwarzanie danych.')

    setSending(true)
    try {
      await postJSON('/api/contact', {
        name: state.name,
        email: state.email,
        message: state.message,
        company: state.company, // Honeypot
      })
      setDone(true)
    } catch (err: any) {
      setError(err.message || 'Błąd wysyłki')
    } finally {
      setSending(false)
    }
  }

  if (done) {
    return (
      <section className="container-p py-12 max-w-2xl">
        <h1 className="font-heading text-3xl mb-2">Dziękujemy!</h1>
        <p className="text-text-secondary">Twoja wiadomość została zapisana. Skontaktujemy się jak najszybciej.</p>
      <OrgStamp />
<OrgStamp />
<OrgStamp />\n</section>
    )
  }

  return (
    <section className="container-p py-12 max-w-2xl">
      <h1 className="font-heading text-3xl mb-2">Kontakt</h1>
      <p className="text-text-secondary mb-6">Napisz do nas — odezwiemy się zwykle w 1 dzień roboczy.</p>

      <form onSubmit={submit} className="card p-6 space-y-4">
        <div>
          <label className="block mb-1 text-sm text-text-secondary">Imię i nazwisko</label>
          <input className="w-full p-3 rounded-xl bg-background-secondary/60 border border-white/10" value={state.name} onChange={e => setState(s => ({ ...s, name: e.target.value }))} />
        </div>
        <div>
          <label className="block mb-1 text-sm text-text-secondary">E-mail</label>
          <input type="email" className="w-full p-3 rounded-xl bg-background-secondary/60 border border-white/10" value={state.email} onChange={e => setState(s => ({ ...s, email: e.target.value }))} />
        </div>
        <div>
          <label className="block mb-1 text-sm text-text-secondary">Wiadomość</label>
          <textarea rows={6} className="w-full p-3 rounded-xl bg-background-secondary/60 border border-white/10" value={state.message} onChange={e => setState(s => ({ ...s, message: e.target.value }))} />
        </div>

        {/* Honeypot Field */}
        <input
          type="text"
          name="company"
          className="hidden"
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
          value={state.company}
          onChange={e => setState(s => ({...s, company: e.target.value}))}
        />

        <label className="flex items-start gap-3 text-sm text-text-secondary">
          <input type="checkbox" className="mt-1" checked={state.agree} onChange={e => setState(s => ({ ...s, agree: e.target.checked }))} />
          <span>Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z <Link href="/polityka-prywatnosci" className="underline">Polityką prywatności</Link>.</span>
        </label>

        {error && <div className="text-red-400 text-sm">{error}</div>}

        <button disabled={sending} className="link-cta">{sending ? 'Wysyłanie…' : 'Wyślij'}</button>
      </form>
    <OrgStamp />
<OrgStamp />
<OrgStamp />\n</section>
  )
}

