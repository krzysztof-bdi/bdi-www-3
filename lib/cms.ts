// lib/cms.ts
import pages from '@/../public/cms/pages.json'

export type PageDoc = { title:string; intro:string; bullets:string[] }

export async function getPage(slug: string): Promise<PageDoc|null> {
  // bez fetch — odczyt bezpośrednio z JSON (działa lokalnie i na Vercel)
  // @ts-ignore – import JSON typujemy ręcznie prostym PageDoc-map
  return (pages as Record<string, PageDoc>)[slug] ?? null
}