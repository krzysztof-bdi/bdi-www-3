import Image from 'next/image'
import Link from 'next/link'
import { getPage } from '@/lib/cms'

export default async function Page(){
  const doc = await getPage('dla-liderow')
  return (
    <section className="container-p py-12">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="font-heading text-4xl mb-3">{doc?.title ?? 'Dla Liderów'}</h1>
          <p className="text-text-secondary mb-4">{doc?.intro}</p>
          <ul className="list-disc ml-5 text-text-secondary">
            {doc?.bullets?.map((b,i)=> <li key={i}>{b}</li>)}
          </ul>
          <div className="mt-6 flex gap-3">
            <Link href="/kontakt" className="link-cta">Umów konsultację</Link>
            <Link href="/wiedza" className="link-cta">Zobacz materiały</Link>
          </div>
        </div>
        <Image src="/assets/2.1.v2.svg" alt="Dla Liderów" width={1200} height={900} className="rounded-2xl border border-white/10" />
      </div>
    </section>
  )
}
