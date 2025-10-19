import { getPage, PageDoc } from '@/lib/cms'

export default async function Page() {
  const doc: PageDoc | null = await getPage('dla-administracji')
  return (
    <section className="container-p py-12">
      <h1 className="font-heading text-4xl mb-3">{doc?.title ?? 'Dla Administracji'}</h1>
      <p className="text-text-secondary mb-4">{doc?.intro}</p>
      {doc?.bullets && (
        <ul className="list-disc ml-5 text-text-secondary">
          {doc.bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      )}
    </section>
  )
}
