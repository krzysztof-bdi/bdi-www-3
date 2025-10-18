'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function KontaktPage(){
  const [state, setState] = useState({ name:'', email:'', message:'', agree:false, company:'' }) // Dodajemy pole `company` dla honeypot
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string|undefined>(undefined)

  async function submit(e: React.FormEvent){
    e.preventDefault()
    setError(undefined)

    if (!state.name.trim()) return setError('Podaj imię i nazwisko.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) return setError('Podaj poprawny adres e-mail.')
    if (state.message.trim().length < 10) return setError('Napisz min. 10 znaków.')
    if (!state.agree) return setError('Zaznacz zgodę na przetwarzanie danych.')

    setSending(true)
    try{
      const res = await fetch('/api/contact', {
        method:'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({
          Name: state.name,
          Email: state.email,
          Message: state.message,
          Company: state.company, // Przesyłamy pole honeypot do API
          Source: 'Kontakt WWW'
        })
      })
      if (!res.ok) throw new Error('Błąd wysyłki')
      setDone(true)
    }catch(err:any){
      setError(err.message || 'Błąd wysyłki')
    }finally{
      setSending(false)
    }
  }

  if (done){
    return (
      <section className="container-p py-12 max-w-2xl">
        <h1 className="font-heading text-3xl mb-2">Dziękujemy!</h1>
        <p className="text-text-secondary">Twoja wiadomość została zapisana. Skontaktujemy się jak najszybciej.</p>
      </section>
    )
  }

  return (
    <section className="container-p py-12 max-w-2xl">
      <h1 className="font-heading text-3xl mb-2">Kontakt</h1>
      <p className="text-text-secondary mb-6">Napisz do nas — odezwiemy się zwykle w 1 dzień roboczy.</p>

      <form onSubmit={submit} className="card p-6 space-y-4">
        <div>
          <label className="block mb-1 text-sm text-text-secondary">Imię i nazwisko</label>
          <input className="w-full p-3 rounded-xl bg-background-secondary/60 border border-white/10" value={state.name} onChange={e=>setState(s=>({...s, name:e.target.value}))}/>
        </div>
        <div>
          <label className="block mb-1 text-sm text-text-secondary">E-mail</label>
          <input type="email" className="w-full p-3 rounded-xl bg-background-secondary/60 border border-white/10" value={state.email} onChange={e=>setState(s=>({...s, email:e.target.value}))}/>
        </div>
        <div>
          <label className="block mb-1 text-sm text-text-secondary">Wiadomość</label>
          <textarea rows={6} className="w-full p-3 rounded-xl bg-background-secondary/60 border border-white/10" value={state.message} onChange={e=>setState(s=>({...s, message:e.target.value}))}/>
        </div>
        
        {/* Honeypot: ukryte pole dla botów */}
        <input
          type="text"
          name="company"
          autoComplete="off"
          tabIndex={-1}
          className="hidden"
          aria-hidden="true"
          value={state.company}
          onChange={e=>setState(s=>({...s, company:e.target.value}))}
        />

        <label className="flex items-start gap-3 text-sm text-text-secondary">
          <input type="checkbox" className="mt-1" checked={state.agree} onChange={e=>setState(s=>({...s, agree:e.target.checked}))}/>
          <span>Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z <Link href="/polityka-prywatnosci" className="underline">Polityką prywatności</Link>.</span>
        </label>

        {error && <div className="text-red-400 text-sm">{error}</div>}

        <button disabled={sending} className="link-cta">{sending ? 'Wysyłanie…' : 'Wyślij'}</button>
      </form>
    </section>
  )
}

