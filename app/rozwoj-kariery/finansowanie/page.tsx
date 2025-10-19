'use client'
import { useMemo, useState } from 'react'
import { listPrograms, estimateGrantCost } from '@/lib/programs'

type RegionKey =
  | 'mazowieckie' | 'pomorskie' | 'dolnoslaskie' | 'kujawsko-pomorskie'
  | 'lubelskie' | 'lubuskie' | 'lodzkie' | 'malopolskie'
  | 'opolskie' | 'podkarpackie' | 'podlaskie' | 'slaskie'
  | 'swietokrzyskie' | 'warminsko-mazurskie' | 'wielkopolskie' | 'zachodniopomorskie'

const REGIONS: Array<{ key: RegionKey, label: string }> = [
  { key: 'mazowieckie', label: 'Mazowieckie' },
  { key: 'pomorskie', label: 'Pomorskie' },
  { key: 'dolnoslaskie', label: 'Dolnośląskie' },
  { key: 'kujawsko-pomorskie', label: 'Kujawsko-Pomorskie' },
  { key: 'lubelskie', label: 'Lubelskie' },
  { key: 'lubuskie', label: 'Lubuskie' },
  { key: 'lodzkie', label: 'Łódzkie' },
  { key: 'malopolskie', label: 'Małopolskie' },
  { key: 'opolskie', label: 'Opolskie' },
  { key: 'podkarpackie', label: 'Podkarpackie' },
  { key: 'podlaskie', label: 'Podlaskie' },
  { key: 'slaskie', label: 'Śląskie' },
  { key: 'swietokrzyskie', label: 'Świętokrzyskie' },
  { key: 'warminsko-mazurskie', label: 'Warmińsko-Mazurskie' },
  { key: 'wielkopolskie', label: 'Wielkopolskie' },
  { key: 'zachodniopomorskie', label: 'Zachodniopomorskie' },
]

export default function Page(){
  const [region, setRegion] = useState<RegionKey>('pomorskie')
  const [cost, setCost] = useState<number>(10000)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const programs = useMemo(()=> listPrograms(region, 'osoba'), [region])
  const picked = programs[0] ?? null

  const calc = useMemo(()=>{
    if (picked) return estimateGrantCost(picked, Number(cost || 0))
    return null
  }, [picked, cost])

  async function submit(e: React.FormEvent){
    e.preventDefault()
    setSending(true); setError(null)
    try{
      const payload = {
        Name: name,
        Email: email,
        Estimate: calc?.grant ?? null,
        Program_ID: picked?.id ?? null,
        Inputs: {
          region,
          kwota: Number(cost || 0),
          profile: 'osoba'
        }
      }
      const res = await fetch('/api/lead-finansowanie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Błąd wysyłki. Spróbuj ponownie.')
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
        <p className="text-text-secondary">Zapisaliśmy Twoją prośbę o kalkulację i kontakt.</p>
      </section>
    )
  }

  return (
    <section className="container-p py-12 max-w-3xl">
      <h1 className="font-heading text-4xl mb-3">Kalkulator finansowania</h1>
      <p className="text-text-secondary mb-6">Wybierz region i wpisz koszt szkolenia. Dla Mazowieckiego i Pomorskiego policzymy dotację wg danych programu.</p>

      <form onSubmit={submit} className="card p-6 space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-text-secondary mb-1">Województwo</label>
            <select value={region} onChange={e=>setRegion(e.target.value as RegionKey)}
                    className="w-full p-3 rounded-xl bg-background-secondary/60 border border-white/10">
              {REGIONS.map(r=> <option key={r.key} value={r.key}>{r.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">Koszt szkolenia (PLN)</label>
            <input type="number" min={0} step={100} value={cost}
                   onChange={e=>setCost(Number(e.target.value))}
                   className="w-full p-3 rounded-xl bg-background-secondary/60 border border-white/10"/>
          </div>
        </div>

        {picked ? (
          <div className="rounded-xl border border-white/10 p-4 bg-background-secondary/50">
            <p className="mb-1"><b>Program:</b> {picked.name}</p>
            <p className="text-text-secondary text-sm mb-2">
              Pokrycie do {(picked.coverage*100).toFixed(0)}%, maks. {picked.cap_pln.toLocaleString('pl-PL')} PLN.
            </p>
            {calc && (
              <div className="grid md:grid-cols-3 gap-3">
                <div className="card p-3"><div className="text-sm text-text-secondary">Dotacja</div><div className="text-xl">{calc.grant.toLocaleString('pl-PL')} PLN</div></div>
                <div className="card p-3"><div className="text-sm text-text-secondary">Wkład własny</div><div className="text-xl">{calc.wkladWlasny?.toLocaleString?.('pl-PL') ?? (Math.max(Number(cost||0)-(calc?.grant||0),0)).toLocaleString('pl-PL')} PLN</div></div>
                <div className="card p-3"><div className="text-sm text-text-secondary">Koszt</div><div className="text-xl">{Number(cost||0).toLocaleString('pl-PL')} PLN</div></div>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 p-4 bg-background-secondary/50">
            <p><b>Wariant standardowy</b> — dla tego regionu wprowadzimy szczegóły po potwierdzeniu liczb. Zostaw kontakt, oddzwonimy z pre-kalkulacją.</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-text-secondary mb-1">Imię i nazwisko</label>
            <input className="w-full p-3 rounded-xl bg-background-secondary/60 border border-white/10"
                   value={name} onChange={e=>setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">E-mail</label>
            <input type="email" className="w-full p-3 rounded-xl bg-background-secondary/60 border border-white/10"
                   value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
        </div>

        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button disabled={sending} className="link-cta">{sending ? 'Wysyłanie…' : 'Wyślij zapytanie'}</button>
      </form>
    </section>
  )
}
