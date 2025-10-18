import { getPage } from '@/lib/cms'

export default async function Page(){
  const doc = await getPage('nasz-wplyw')
  const tiles = [
    {k: 'Czas', v: '−32%'},
    {k: 'Błędy', v: '−41%'},
    {k: 'Przychody', v: '+7%'},
    {k: 'Kompetencje 4IR', v: '+18%'}
  ]
  return (
    <section className="container-p py-12">
      <h1 className="font-heading text-4xl mb-3">{doc?.title ?? 'Nasz Wpływ'}</h1>
      <p className="text-text-secondary mb-8">{doc?.intro}</p>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {tiles.map(t => (
          <div key={t.k} className="card p-5 text-center">
            <div className="text-text-secondary text-xs uppercase tracking-wider">{t.k}</div>
            <div className="font-heading text-3xl mt-2">{t.v}</div>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {doc?.bullets?.map((b,i)=> (
          <div key={i} className="card p-5">
            <div className="font-heading text-lg mb-2">Obszar #{i+1}</div>
            <p className="text-text-secondary">{b}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
