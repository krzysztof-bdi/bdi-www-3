'use client'
import { useMemo, useState } from 'react'

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

export default function KalkulatorPage() {
  const [email, setEmail] = useState('')
  const [kwota, setKwota] = useState<number | ''>('')
  const [okres, setOkres] = useState<number | ''>('') // w miesiącach
  const [error, setError] = useState<string | undefined>()
  const [done, setDone] = useState(false)
  const [sending, setSending] = useState(false)

  const estimate = useMemo(() => {
    const k = typeof kwota === 'number' ? kwota : 0
    const o = typeof okres === 'number' ? okres : 0
    // Prosta przykładowa kalkulacja:
    return Math.max(0, Math.round(k * 0.3 + o * 100))
  }, [kwota, okres])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(undefined)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Podaj poprawny e-mail.')
    if (kwota === '' || kwota <= 0) return setError('Podaj kwotę > 0.')
    if (okres === '' || okres <= 0) return setError('Podaj okres w miesiącach > 0.')

    setSending(true)
    try {
      await postJSON('/api/lead-finansowanie', {
        Name: "Uczestnik Kalkulatora", // Domyślna nazwa
        Email: email,
        Estimate: estimate,
        Inputs: { kwota, okres },
        Program_ID: "Startup", // Domyślna wartość, można ją później rozbudować
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
        <p className="text-text-secondary">Zapisaliśmy Twoje dane — wrócimy z ofertą finansowania.</p>
      </section>
    )
  }

  return (
    <section className="container-p py-12 max-w-2xl">
      <h1 className="font-heading text-3xl mb-4">Kalkulator finansowania rozwoju</h1>
      <form onSubmit={submit} className="card p-6 space-y-4">
        <div>
          <label className="block mb-1 text-sm text-text-secondary">Kwota (PLN)</label>
          <input type="number" min={0} className="w-full p-3 rounded-xl bg-background-secondary/60 border border-white/10"
            value={kwota} onChange={e => setKwota(e.target.value ? Number(e.target.value) : '')} />
        </div>
        <div>
          <label className="block mb-1 text-sm text-text-secondary">Okres (miesiące)</label>
          <input type="number" min={1} className="w-full p-3 rounded-xl bg-background-secondary/60 border border-white/10"
            value={okres} onChange={e => setOkres(e.target.value ? Number(e.target.value) : '')} />
        </div>

        <div className="p-3 rounded-xl border border-white/10 bg-white/5">
          Szacowana kwota wsparcia: <span className="font-heading text-xl">{estimate.toLocaleString('pl-PL')} PLN</span>
        </div>

        <div className="pt-4 border-t border-white/10">
          <label className="block mb-1 text-sm text-text-secondary">E-mail do wysyłki oferty</label>
          <input type="email" className="w-full p-3 rounded-xl bg-background-secondary/60 border border-white/10"
            value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button className="link-cta" disabled={sending}>{sending ? 'Wysyłanie…' : 'Wyślij zapytanie'}</button>
      </form>
    </section>
  )
}

