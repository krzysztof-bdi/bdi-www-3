export type Article = {
  title: string
  slug: string
  excerpt?: string
  date: string
  author?: string
  featured_image?: string
  category_primary?: string
  segment_target?: string
  tags_secondary?: string[]
  is_lead_magnet?: boolean
}
export async function getIndex(): Promise<Article[]> {
  const res = await fetch('/search-index.json', { cache: 'no-store' })
  return res.json()
}
