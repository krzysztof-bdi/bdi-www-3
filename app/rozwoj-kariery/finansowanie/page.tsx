'use client'
import { useMemo, useState } from 'react'
type Program = { id:string; name:string; max:number; cofin:number; segment:'MŚP'|'Liderzy'|'Administracja'; requirements:string[] }
const PROGRAMY: Program[] = [
  { id:'ue-smart', name:'UE SMART — EIS', max: 1200000, cofin: 0.6, segment:'MŚP', requirements:['Innowacyjność','Wkład własny 40%','MVP/PoC'] },
  { id:'ai-voucher', name:'Voucher AI — PARP', max: 200000, cofin: 0.8, segment:'MŚP', requirements:['Diagnoza dojrzałości','Plan transformacji'] },
  { id:'nis2-b2g', name:'NIS2 — Modernizacja usług B2G', max: 3000000, cofin: 0.7, segment:'Administracja', requirements:['Audyt bezpieczeństwa','Plan ciągłości działania'] }
]
export default function Finansowanie(){
  const [seg, setSeg] = useState<string>('MŚP')
  const [capex, setCapex] = useState<number>(300000)
  const [opex, setOpex]   = useState<number>(120000)
  const propozycje = useMemo(()=> PROGRAMY.filter(p=> p.segment===seg), [seg])
  const calc = (p:Program) => {
    const budzet = capex + opex
    const kwal = Math.min(budzet, p.max)
    const dotacja = Math.round(kwal * p.cofin)
    const wkład = kwal - dotacja
    return { kwal, dotacja, wkład }
  }
  async function submitLead(p:Program){
    const { kwal, dotacja, wkład } = calc(p)
    const payload = {
      Financing_Program_ID: p.id,
      Estimated_Funding_Amount: dotacja,
      Verification_Status: 'Pre-Check',
      Input: { seg, capex, opex }
    }
    await fetch('/api/lead-finansowanie', { method:'POST', body: JSON.stringify(payload) })
    alert(`Wysłano zgłoszenie: ${p.name}. Dotacja: ${dotacja.toLocaleString('pl-PL')} zł`)
  }
  return (
    <section className="container-p py-12">
      <h1 className="font-heading text-3xl mb-2">Nawigator finansowania</h1>
      <p className="text-text-secondary mb-6">Wybierz segment i budżet. Zobacz pasujące programy i kwoty.</p>
      <div className="grid md:grid-cols-3 gap-3 mb-8">
        <select className="card p-3" value={seg} onChange={e=>setSeg(e.target.value)}>
          <option>MŚP</option>
          <option>Liderzy</option>
          <option>Administracja</option>
        </select>
        <input className="card p-3" type="number" value={capex} onChange={e=>setCapex(Number(e.target.value))} placeholder="CAPEX (zł)" />
        <input className="card p-3" type="number" value={opex} onChange={e=>setOpex(Number(e.target.value))} placeholder="OPEX 12m (zł)" />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {propozycje.map(p=>{
          const { kwal, dotacja, wkład } = calc(p)
          return (
            <div key={p.id} className="card p-5">
              <h3 className="font-heading text-xl mb-1">{p.name}</h3>
              <div className="text-text-secondary text-sm mb-3">Maks. {p.max.toLocaleString('pl-PL')} zł • Do {Math.round(p.cofin*100)}%</div>
              <ul className="text-sm text-text-secondary list-disc ml-5 mb-4">
                {p.requirements.map(r=> <li key={r}>{r}</li>)}
              </ul>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="p-3 rounded-xl bg-background-secondary/60 border border-white/10">
                  <div className="text-text-secondary">Koszty kwal.</div>
                  <div className="font-heading">{kwal.toLocaleString('pl-PL')} zł</div>
                </div>
                <div className="p-3 rounded-xl bg-background-secondary/60 border border-white/10">
                  <div className="text-text-secondary">Dotacja</div>
                  <div className="font-heading">{dotacja.toLocaleString('pl-PL')} zł</div>
                </div>
                <div className="p-3 rounded-xl bg-background-secondary/60 border border-white/10">
                  <div className="text-text-secondary">Wkład własny</div>
                  <div className="font-heading">{wkład.toLocaleString('pl-PL')} zł</div>
                </div>
              </div>
              <button className="link-cta mt-4" onClick={()=>submitLead(p)}>Chcę weryfikacji i asysty</button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
