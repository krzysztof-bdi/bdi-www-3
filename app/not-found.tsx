import Link from 'next/link'
export default function NotFound() {
  return (
    <section className="container-p py-24 text-center">
      <h1 className="font-heading text-5xl mb-4">404 — Nie znaleziono</h1>
      <p className="text-text-secondary mb-8">Taka strona nie istnieje lub została przeniesiona.</p>
      <div className="flex gap-3 justify-center">
        <Link className="link-cta" href="/">Strona główna</Link>
        <Link className="link-cta" href="/ai-dla-ngo">AI dla NGO</Link>
      </div>
    </section>
  )
}
