import Link from 'next/link'
import Image from 'next/image'

export default function Page(){
  return (
    <article>
      <section className="relative">
        <Image src="/assets/3.1.v3.svg" alt="MŚP" width={2400} height={1200} className="w-full h-[50svh] object-cover opacity-70" />
        <div className="absolute inset-0 container-p flex flex-col justify-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold">Przełam cykl paraliżu</h1>
          <p className="mt-3 max-w-2xl text-text-secondary">Czas × Pieniądze × Kompetencje — model Grant‑to‑Subscription.</p>
          <a href="#rozw" className="link-cta mt-6">Przełam cykl</a>
        </div>
      </section>

      <section id="rozw" className="container-p py-16">
        <h2 className="font-heading text-2xl mb-6">Cyfrowy Opiekun MŚP — pakiety</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-text-secondary">
              <tr>
                <th className="p-3">Zakres</th>
                <th className="p-3">Brąz</th>
                <th className="p-3">Srebro</th>
                <th className="p-3">Złoto</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Audyt startowy', '✓', '✓', '✓'],
                ['Asysta grantowa', '—', '✓', '✓'],
                ['Automatyzacje (mies.)', '—', '2', '5']
              ].map((r,idx)=> (
                <tr key={idx} className="border-t border-white/10">
                  {r.map((c,i)=> <td key={i} className="p-3">{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 flex gap-4">
          <Link href="/kontakt" className="link-cta">Umów warsztat</Link>
          <Link href="/rozwoj-kariery/finansowanie" className="link-cta">Nawigator finansowy MŚP</Link>
        </div>
      </section>
    </article>
  )
}
