'use client'
import { useState } from 'react'
import Link from 'next/link'
import OrgStamp from "@/components/OrgStamp"
export default function Page(){
  const = useState({ name:'', email:'', org:'', message:'', agree:false, hp:'' })
  const = useState(false)
  const = useState(false)
  const [error, setError] = useState<string|undefined>()
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(undefined)
    if (!state.name ||!state.email ||!state.agree){ setError('Uzupełnij imię, e-mail i zgodę.'); return }
    setSending(true)
    try{
      const res = await fetch('/api/lead-ngo', {
        method:'POST', headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ Name: state.name, Email: state.email, Organization: state.org, Message: state.message, hp: state.hp })
      });
      if (!res.ok) throw new Error('Błąd wysyłki'); setDone(true)
    }catch(err:any){ setError(err.message |

| 'Błąd wysyłki') }
    finally{ setSending(false) }
  }
  if (done){ return (
    <section className="container-p py-12 max-w-2xl"><h1 className="font-heading text-3xl mb-2">Dziękujemy!</h1><p className="text-text-secondary">Zgłoszenie przyjęte. Skontaktujemy się w 1 dzień roboczy.</p></section>
  )}
  return (
    <section className="container-p py-12 max-w-4xl">
      <h1 className="font-heading text-4xl mb-3">AI dla NGO: mniej papierów, więcej wpływu</h1>
      <p className="text-text-secondary mb-6">Certyfikowane szkolenia AI dla organizacji pozarządowych. Dostępne dofinansowanie (Warszawa).</p>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="prose prose-invert"><h2>Co zyskujesz</h2><ul><li>Automatyzacja wniosków i raportów</li><li>Szablony i dobre praktyki (NGO)</li><li>Wsparcie w procesie dofinansowania</li></ul><p className="text-sm text-text-secondary">Masz pytania? <Link className="underline" href="/kontakt">Napisz do nas</Link>.</p></div>
        <form onSubmit={submit} className="card p-6 space-y-4">
          <input type="text" className="hidden" autoComplete="off" value={state.hp} onChange={e=>setState(s=>({...s, hp:e.target.value}))}/>
          <div><label className="block mb-1 text-sm text-text-secondary">Imię i nazwisko</label><input className="w-full p-3 rounded-xl bg-background-secondary/60 border border-white/10" value={state.name} onChange={e=>setState(s=>({...s, name:e.target.value}))}/></div>
          <div><label className="block mb-1 text-sm text-text-secondary">E-mail</label><input type="email" className="w-full p-3 rounded-xl bg-background-secondary/60 border border-white/10" value={state.email} onChange={e=>setState(s=>({...s, email:e.target.value}))}/></div>
          <div><label className="block mb-1 text-sm text-text-secondary">Organizacja</label><input className="w-full p-3 rounded-xl bg-background-secondary/60 border border-white/10" value={state.org} onChange={e=>setState(s=>({...s, org:e.target.value}))}/></div>
          <label className="flex items-start gap-3 text-sm text-text-secondary"><input type="checkbox" className="mt-1" checked={state.agree} onChange={e=>setState(s=>({...s, agree:e.target.checked}))}/><span>Wyrażam zgodę na przetwarzanie danych zgodnie z <Link href="/polityka-prywatnosci" className="underline">Polityką prywatności</Link>.</span></label>
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button disabled={sending} className="link-cta">{sending? 'Wysyłanie…' : 'Wyślij zgłoszenie'}</button>
        </form>
      </div>
      <OrgStamp />
    </section>
  )
}
