import Link from 'next/link'

export default function Footer(){
  return (
    <footer className="mt-24 border-t border-white/10 bg-primary">
      <div className="container-p py-12 grid md:grid-cols-3 gap-8 text-sm text-text-secondary">
        <div>
          <h3 className="font-heading text-white mb-3">Baltic Digital Institute</h3>
          <p>ul. Przykładowa 1, 80-000 Gdańsk</p>
          <p>NIP 0000000000 • KRS 000000000</p>
        </div>
        <div>
          <h4 className="text-white mb-3">Nawigacja</h4>
          <ul className="space-y-1">
            <li><Link href="/polityka-prywatnosci" className="hover:text-white">Polityka prywatności</Link></li>
            <li><Link href="/regulamin" className="hover:text-white">Regulamin</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white mb-3">Kontakt</h4>
          <p><a className="hover:text-white" href="mailto:hello@bdi.example">hello@bdi.example</a></p>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-text-secondary">© {new Date().getFullYear()} BDI. Wszelkie prawa zastrzeżone.</div>
    </footer>
  )
}
