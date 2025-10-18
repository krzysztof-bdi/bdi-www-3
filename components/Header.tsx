'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const links = [
  { href: '/dla-liderow', label: 'Dla liderów' },
  { href: '/nasz-system', label: 'Nasz system' },
  { href: '/centra-kompetencji', label: 'Centra kompetencji' },
  { href: '/nasz-wplyw', label: 'Nasz wpływ' },
  { href: '/wiedza', label: 'Wiedza' },
  { href: '/kontakt', label: 'Kontakt' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const panelRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  // Zamykanie menu klawiszem Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Zamykanie menu po kliknięciu poza nim
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!open) return
      const target = e.target as Node
      if (panelRef.current && !panelRef.current.contains(target) && btnRef.current && !btnRef.current.contains(target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  return (
    <header className="border-b border-white/10 sticky top-0 z-50 bg-background/70 backdrop-blur">
      <div className="container-p h-16 flex items-center justify-between">
        <Link href="/" className="font-heading text-xl">BDI</Link>

        {/* Menu na duże ekrany */}
        <nav className="hidden md:flex gap-6">
          {links.map(l => (
            <Link key={l.href} href={l.href} className={clsx('text-sm text-text-secondary hover:text-white transition', pathname===l.href && 'text-white')}>{l.label}</Link>
          ))}
        </nav>

        {/* Przycisk "Hamburger" na mobilne */}
        <button
          ref={btnRef}
          aria-label="Otwórz menu"
          aria-expanded={open}
          className="md:hidden h-10 w-10 rounded-xl border border-white/10 flex items-center justify-center"
          onClick={()=>setOpen(v=>!v)}
        >
          <span className="sr-only">Menu</span>
          <div className="text-xl">{open ? '✕' : '☰'}</div>
        </button>
      </div>

      {/* Panel menu mobilnego */}
      {open && (
        <div className="md:hidden border-t border-white/10">
          <div ref={panelRef} className="container-p py-3 flex flex-col gap-2">
            {links.map(l => (
              <Link key={l.href} href={l.href} className={clsx('py-2', pathname===l.href && 'font-bold')} onClick={()=>setOpen(false)}>{l.label}</Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

