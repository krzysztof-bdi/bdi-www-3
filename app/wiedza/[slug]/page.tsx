export default function ArticlePage({ params }:{ params:{ slug:string } }){
  return (
    <section className="container-p py-12">
      <h1 className="font-heading text-3xl">Artykuł: {params.slug}</h1>
      <p className="text-text-secondary mt-4">Treść zostanie wpięta z CMS.</p>
    </section>
  )
}
