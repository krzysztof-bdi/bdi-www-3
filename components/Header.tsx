'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const nav = [
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
  { href: '/kontakt', label: 'Kontakt' }
]

export default function Header(){
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-primary/70">
      <nav className="container-p flex h-16 items-center justify-between">
        <Link href="/" className="font-heading text-lg font-bold tracking-wide">BDI</Link>
        <ul className="hidden md:flex gap-6">
          {nav.map(i => (
            <li key={i.href}>
              <Link href={i.href} className={clsx('text-sm text-text-secondary hover:text-white transition', pathname===i.href && 'text-white')}>{i.label}</Link>
            </li>
          ))}
        </ul>
        <div className="md:hidden text-text-secondary text-sm">Menu</div>
      </nav>
    </header>
  )
}
