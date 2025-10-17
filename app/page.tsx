import Image from 'next/image'
import Link from 'next/link'

export default function Home(){
  return (
    <>
      <section className="relative overflow-hidden">
        <Image src="/assets/1.1.v2.svg" alt="Hero" width={2400} height={1200} priority className="w-full h-[70svh] object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-primary"></div>
        <div className="absolute inset-0 container-p flex flex-col justify-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold">Od chaosu do odporności</h1>
          <p className="mt-4 max-w-2xl text-text-secondary">Systemowo łączymy AI, cyber i kompetencje, by dowozić mierzalny wpływ.</p>
          <a href="#gate" className="link-cta mt-8">Odkryj nasze rozwiązania</a>
        </div>
        <div className="absolute left-0 right-0 bottom-0 h-1 bg-accent animate-pulse" />
      </section>

      <section id="gate" className="container-p py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { href:'/dla-liderow', title:'Dla Liderów', img:'1.2.1.svg', desc:'Strategia, governance i B+R jako usługa.'},
            { href:'/dla-msp', title:'Dla MŚP', img:'1.2.2.svg', desc:'Przełam cykl paraliżu — Cyfrowy Opiekun.'},
            { href:'/dla-administracji', title:'Dla Administracji', img:'1.2.3.svg', desc:'Proaktywne państwo: zgodność × innowacja.'},
            { href:'/rozwoj-kariery', title:'Dla Ciebie', img:'1.2.4.svg', desc:'Kompetencje odporne na automatyzację.'}
          ].map(card => (
            <Link key={card.href} href={card.href} className="card p-6 group hover:border-accent/60 transition">
              <div className="flex items-center gap-4">
                <Image src={`/assets/${card.img}`} alt="" width={96} height={96} className="rounded-xl" />
                <div>
                  <h3 className="font-heading text-xl mb-1 group-hover:text-accent">{card.title}</h3>
                  <p className="text-text-secondary text-sm">{card.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-p pb-12">
        <div className="opacity-80 text-text-secondary text-xs mb-3">Zaufali nam</div>
        <div className="flex flex-wrap items-center gap-6">
          {[1,2,3,4,5,6].map(i => (
            <Image key={i} src={`/assets/logos_partnerow/logo-${i}.svg`} alt="logo" width={120} height={40} />
          ))}
        </div>
      </section>

      <section className="container-p grid md:grid-cols-2 gap-10 items-center py-16">
        <div>
          <h2 className="font-heading text-3xl mb-4">Filozofia Systemu Operacyjnego Baltic (SOB)</h2>
          <p className="text-text-secondary">SSOT • Automatyzacja • Human‑in‑the‑Loop. Przekuwamy strategię w wykonywalny kod i powtarzalne procedury.</p>
          <Link href="/nasz-system" className="link-cta mt-6">Poznaj SOB</Link>
        </div>
        <Image src="/assets/1.4.svg" alt="SOB" width={1200} height={800} className="rounded-2xl border border-white/10" />
      </section>

      <section className="container-p pb-24">
        <h2 className="font-heading text-2xl mb-6">Z wiedzy na działanie</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {img:'1.5.1.svg', title:'Raport: Przepaść wdrożeniowa AI', href:'/wiedza/przepasc-wdrozen'},
            {img:'1.5.2.svg', title:'Whitepaper: SOB w praktyce', href:'/wiedza/sob-w-praktyce'},
            {img:'1.5.3.svg', title:'Case: Cyfrowy Opiekun MŚP', href:'/wiedza/cyfrowy-opiekun'}
          ].map(i => (
            <Link key={i.href} href={i.href} className="card overflow-hidden group">
              <Image src={`/assets/${i.img}`} alt="" width={800} height={600} className="w-full h-48 object-cover opacity-90 group-hover:opacity-100" />
              <div className="p-4">
                <h3 className="font-heading text-lg group-hover:text-accent">{i.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
