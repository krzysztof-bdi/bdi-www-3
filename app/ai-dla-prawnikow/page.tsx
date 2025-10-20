'use client'
import { useState } from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'AI dla Prawników — Baltic Digital Institute',
  description: 'Szkolenia AI dla kancelarii: analiza umów, automatyzacja pism, KPI.'
}

export default function Page(){
  const [state, setState] = useState({ name:'', email:'', kancelaria:'', message:'', agree:false, hp:'' })
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string|undefined>()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(undefined)
    if (!state.name || !state.email || !state.agree){ setError('Uzupełnij imię, e-mail i zgodę.'); return }
    setSending(true)
    try{
      const res = await fetch('/api/lead-prawnikow', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({
          Name: state.name,
          Email: state.email,
          Law_Firm: state.kancelaria,
          Message: state.message,
          hp: state.hp
        })
      })
      if (!res.ok) throw new Error('Błąd wysyłki')
      setDone(true)
    }catch(err:any){ setError(err.message || 'Błąd wysyłki') }
    finally{ setSending(false) }
  }

  if (done){
    return (
      <section className="container-p py-12 max-w-2xl">
        <h1 className="font-heading text-3xl mb-2">Dziękujemy!</h1>
        <p className="text-text-secondary">Zgłoszenie przyjęte. Skontaktujemy się w 1 dzień roboczy.</p>
      </section>
    )
  }

  return (
    <section className="container-p py-12 max-w-4xl">
      <h1 className="font-heading text-4xl mb-3">AI w kancelarii: szybciej, dokładniej, z KPI</h1>
      <p className="text-text-secondary mb-6">
        Program dla prawników i kancelarii. Automatyzacja analizy umów i pism, zachowując standardy etyczne.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="prose prose-invert">
          <h2>Korzyści</h2>
          <ul>
            <li>Analiza dokumentów i ekstrakcja klauzul</li>
            <li>Szablony pism i checklisty jakości</li>
            <li>Dofinansowanie (Warszawa), rozliczenia CPD</li>
          </ul>
        </div>

        <form onSubmit={submit} className="card p-6 space-y-4">
          <input type="text" className="hidden" autoComplete="off" value={state.hp} onChange={e=>setState(s=>({...s, hp:e.target.value}))}/>
          <div>
            <label className="block mb-1 text-sm text-text-secondary">Imię i nazwisko</label>
            <input className="w-full p-3 rounded-xl bg-background-secondary/60 border border-white/10"
                   value={state.name} onChange={e=>setState(s=>({...s, name:e.target.value}))}/>
          </div>
          <div>
            <label className="block mb-1 text-sm text-text-secondary">E-mail</label>
            <input type="email" className="w-full p-3 rounded-xl bg-background-secondary/60 border border-white/10"
                   value={state.email} onChange={e=>setState(s=>({...s, email:e.target.value}))}/>
          </div>
          <div>
            <label className="block mb-1 text-sm text-text-secondary">Kancelaria (opcjonalnie)</label>
            <input className="w-full p-3 rounded-xl bg-background-secondary/60 border border-white/10"
                   value={state.kancelaria} onChange={e=>setState(s=>({...s, kancelaria:e.target.value}))}/>
          </div>
          <div>
            <label className="block mb-1 text-sm text-text-secondary">Wiadomość (opcjonalnie)</label>
            <textarea rows={5} className="w-full p-3 rounded-xl bg-background-secondary/60 border border-white/10"
                      value={state.message} onChange={e=>setState(s=>({...s, message:e.target.value}))}/>
          </div>
          <label className="flex items-start gap-3 text-sm text-text-secondary">
            <input type="checkbox" className="mt-1" checked={state.agree} onChange={e=>setState(s=>({...s, agree:e.target.checked}))}/>
            <span>Wyrażam zgodę na przetwarzanie danych zgodnie z <Link href="/polityka-prywatnosci" className="underline">Polityką prywatności</Link>.</span>
          </label>
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button disabled={sending} className="link-cta">{sending ? 'Wysyłanie…' : 'Wyślij zgłoszenie'}</button>
        </form>
      </div>
    </section>
  )
}
