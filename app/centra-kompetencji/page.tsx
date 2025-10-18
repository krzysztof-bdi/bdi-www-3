import { getPage } from '@/lib/cms'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page(){
  const doc = await getPage('centra-kompetencji')
  return (
    <section className="container-p py-12">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="font-heading text-4xl mb-3">{doc?.title ?? 'Centra Kompetencji'}</h1>
          <p className="text-text-secondary mb-4">{doc?.intro}</p>
          <ul className="list-disc ml-5 text-text-secondary">
            {doc?.bullets?.map((b,i)=> <li key={i}>{b}</li>)}
          </ul>
          <div className="mt-6 flex gap-3">
            <Link href="/kontakt" className="link-cta">Porozmawiajmy</Link>
            <Link href="/wiedza" className="link-cta">Zobacz case’y</Link>
          </div>
        </div>
        <Image src="/assets/1.4.svg" alt="" width={1200} height={800} className="rounded-2xl border border-white/10"/>
      </div>
    </section>
  )
}
