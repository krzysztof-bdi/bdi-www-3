import articles from '@/../public/search-index.json'
import Link from 'next/link'

type Article = {
  title: string; slug: string; date: string; featured_image?: string;
  category_primary?: string; segment_target?: string; is_lead_magnet?: boolean;
  tags_secondary?: string[];
}

const PAGE_SIZE = 6

export default function Page({ searchParams }: { searchParams: { page?: string }}) {
  const page = Math.max(1, parseInt(searchParams.page ?? '1', 10) || 1)

  // Sortowanie wpisów malejąco po dacie
  const sortedArticles = (articles as Article[]).slice().sort((a,b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const totalArticles = sortedArticles.length
  const totalPages = Math.max(1, Math.ceil(totalArticles / PAGE_SIZE))
  const startIndex = (page - 1) * PAGE_SIZE
  const paginatedItems = sortedArticles.slice(startIndex, startIndex + PAGE_SIZE)

  return (
    <section className="container-p py-12">
      <h1 className="font-heading text-4xl mb-6">Wiedza</h1>

      {paginatedItems.length === 0 && <p className="text-text-secondary">Brak treści do wyświetlenia.</p>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedItems.map(a => (
          <article key={a.slug} className="card p-4">
            {a.featured_image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={a.featured_image} alt="" className="rounded-xl border border-white/10 mb-3" />
            )}
            <div className="text-xs text-text-secondary mb-1">
              {a.category_primary} • {new Date(a.date).toLocaleDateString('pl-PL')}
            </div>
            <h2 className="font-heading text-xl mb-2">
              <Link href={`/wiedza/${a.slug}`}>{a.title}</Link>
            </h2>
            {a.tags_secondary && (
              <div className="flex flex-wrap gap-2 text-xs text-text-secondary">
                {a.tags_secondary.map(t => <span key={t} className="px-2 py-1 rounded-full bg-white/5 border border-white/10">{t}</span>)}
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Paginacja */}
      {totalPages > 1 && (
        <div className="flex items-center gap-3 mt-8">
          <PagerLink page={page-1} disabled={page<=1}>« Poprzednia</PagerLink>
          <span className="text-sm text-text-secondary">Strona {page} / {totalPages}</span>
          <PagerLink page={page+1} disabled={page>=totalPages}>Następna »</PagerLink>
        </div>
      )}
    </section>
  )
}

function PagerLink({ page, disabled, children }:{ page:number, disabled?:boolean, children:React.ReactNode }) {
  if (disabled) return <span className="opacity-50">{children}</span>
  const href = page <= 1 ? '/wiedza' : `/wiedza?page=${page}`
  return <Link href={href} className="link-cta">{children}</Link>
}
