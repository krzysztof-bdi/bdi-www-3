'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Fuse from 'fuse.js'
export default function Knowledge(){
  const [items, setItems] = useState<any[]>([])
  const [q, setQ] = useState('')
  const [seg, setSeg] = useState('')
  const [cat, setCat] = useState('')
  useEffect(()=>{ fetch('/search-index.json').then(r=>r.json()).then(setItems) },[])
  const fuse = useMemo(()=> new Fuse(items, { keys:['title','segment_target','category_primary'] }), [items])
  const out = useMemo(()=>{
    let arr = q ? fuse.search(q).map(r=>r.item) : items
    if (seg) arr = arr.filter(i=> i.segment_target === seg)
    if (cat) arr = arr.filter(i=> i.category_primary === cat)
    return arr
  },[items, q, seg, cat, fuse])
  return (
    <section className="container-p py-12">
      <h1 className="font-heading text-4xl mb-6">Wiedza</h1>
      <div className="mb-6 grid md:grid-cols-3 gap-3">
        <input className="card p-3" placeholder="Szukaj..." value={q} onChange={e=>setQ(e.target.value)} />
        <select className="card p-3" value={seg} onChange={e=>setSeg(e.target.value)}>
          <option value="">Segment</option>
          <option>Liderzy</option>
          <option>MŚP</option>
          <option>Administracja</option>
        </select>
        <select className="card p-3" value={cat} onChange={e=>setCat(e.target.value)}>
          <option value="">Kategoria</option>
          <option>Raport</option>
          <option>Whitepaper</option>
          <option>Artykuł</option>
        </select>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {out.map(i=> (
          <Link key={i.slug} href={`/wiedza/${i.slug}`} className="card overflow-hidden group">
            {i.featured_image && (
              <Image src={i.featured_image} alt="" width={800} height={600} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h3 className="font-heading group-hover:text-accent">{i.title}</h3>
              {i.is_lead_magnet && <span className="mt-2 inline-block text-xs text-accent">Lead magnet</span>}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
