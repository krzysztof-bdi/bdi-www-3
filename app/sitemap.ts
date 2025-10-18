import type { MetadataRoute } from 'next'
import articles from '@/../public/search-index.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://bdi-www-3.vercel.app' // TODO: podmień na produkcyjną
  const staticPages = [
    '', 'dla-liderow', 'nasz-system', 'centra-kompetencji', 'nasz-wplyw', 'wiedza', 'kontakt', 'polityka-prywatnosci', 'regulamin'
  ].map(p => ({
    url: `${base}/${p}`,
    lastModified: new Date(),
    priority: p === '' ? 1 : 0.7
  }))

  const posts = (articles as any[]).map(a => ({
    url: `${base}/wiedza/${a.slug}`,
    lastModified: new Date(a.date),
    priority: 0.6
  }))

  return [...staticPages, ...posts]
}
