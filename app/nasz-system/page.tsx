import Image from 'next/image'
import { getPage } from '@/lib/cms'

export default async function Page(){
  const doc = await getPage('nasz-system')
  return (
    <section className="container-p py-12">
      <h1 className="font-heading text-4xl mb-3">{doc?.title ?? 'Nasz System'}</h1>
      <p className="text-text-secondary mb-8">{doc?.intro}</p>
      <div className="grid md:grid-cols-3 gap-6">
        {doc?.bullets?.map((b,i)=> (
          <div key={i} className="card p-5">
            <div className="font-heading text-lg mb-2">Filary #{i+1}</div>
            <p className="text-text-secondary">{b}</p>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Image src="/assets/4.1.v2.svg" alt="SOB wizualizacja" width={1400} height={900} className="rounded-2xl border border-white/10" />
      </div>
    </section>
  )
}
