'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

// Pełna lista linków zgodna z dokumentacją
const links = [
  { href: '/', label: 'Start' },
  { href: '/dla-liderow', label: 'Dla Liderów' },
  { href: '/dla-msp', label: 'Dla MŚP' },
  { href: '/dla-administracji', label: 'Dla Administracji' },
  { href: '/rozwoj-kariery', label: 'Rozwój Kariery' },
  { href: '/nasz-system', label: 'Nasz System' },
  { href: '/centra-kompetencji', label: 'Centra Kompetencji' },
  { href: '/centrum-zaufania', label: 'Centrum Zaufania' },
  { href: '/nasz-wplyw', label: 'Nasz Wpływ' },
  { href: '/wiedza', label: 'Wiedza' },
  { href: '/kontakt', label: 'Kontakt' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()

  // Zamykanie menu klawiszem ESC
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

        {/* Menu na dużym ekranie */}
        <nav className="hidden md:flex gap-4">
          {links.map(l => (
            <Link 
              key={l.href} 
              href={l.href} 
              className={clsx(
                'nav-link text-sm', 
                (pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href))) && 'text-white'
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Przycisk menu mobilnego */}
        <button
          ref={btnRef}
          aria-label="Otwórz menu"
          aria-expanded={open}
          className="md:hidden h-10 w-10 rounded-xl border border-white/10 flex items-center justify-center"
          onClick={()=>setOpen(v=>!v)}
        >
          <span className="sr-only">Menu</span>
          <div className="grid place-items-center h-full text-2xl">
            {open ? '✕' : '☰'}
          </div>
        </button>
      </div>

      {/* Panel menu mobilnego */}
      {open && (
        <div className="md:hidden border-t border-white/10">
          <nav ref={panelRef} className="container-p py-3 flex flex-col gap-2">
            {links.map(l => (
              <Link 
                key={l.href} 
                href={l.href} 
                className={clsx(
                  'py-2 block',
                  (pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href))) ? 'text-white' : 'text-text-secondary'
                )} 
                onClick={()=>setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

