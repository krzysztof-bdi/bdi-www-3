import Link from 'next/link'

export const metadata = {
  title: 'Rozwój Kariery — Baltic Digital Institute',
  description: 'Narzędzia i zasoby wspierające rozwój Twojej kariery w erze cyfrowej.',
}

export default function RozwojKarieryPage() {
  return (
    <section className="container-p py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="font-heading text-4xl mb-4">Rozwój Kariery</h1>
        <p className="text-text-secondary mb-8">
          Skorzystaj z naszych narzędzi, aby ocenić swoją pozycję na rynku pracy, 
          zidentyfikować luki kompetencyjne i zaplanować kolejne kroki w kierunku kariery przyszłości.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
        <Link href="/rozwoj-kariery/test-odpornosci-kariery" className="card p-6 block hover:border-accent transition">
          <h2 className="font-heading text-2xl mb-2">Test Odporności Kariery</h2>
          <p className="text-text-secondary">Sprawdź, jak Twoje kompetencje i postawa radzą sobie w obliczu zmian na rynku. Otrzymaj spersonalizowane wskazówki.</p>
        </Link>
        <Link href="/rozwoj-kariery/finansowanie" className="card p-6 block hover:border-accent transition">
          <h2 className="font-heading text-2xl mb-2">Kalkulator Finansowania</h2>
          <p className="text-text-secondary">Oszacuj, jakie wsparcie finansowe możesz uzyskać na rozwój swoich umiejętności i transformację zawodową.</p>
        </Link>
      </div>
    </section>
  )
}
