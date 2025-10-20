import type { MetadataRoute } from 'next'
import articles from '@/../public/search-index.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.baltic-digital.org'
  const staticPages = [
    '', 'dla-liderow', 'dla-msp', 'dla-administracji', 'rozwoj-kariery',
    'nasz-system', 'centra-kompetencji', 'centrum-zaufania', 'nasz-wplyw',
    'wiedza', 'kontakt', 'polityka-prywatnosci', 'regulamin',
    'ai-dla-ngo', 'ai-dla-ciebie', 'ai-dla-prawnikow'
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
