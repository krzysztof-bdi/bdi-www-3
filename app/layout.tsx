import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-space-grotesk' })

// --- GLOBALNE METADANE SEO ---
export const metadata: Metadata = {
  metadataBase: new URL('https://bdi-www-3.vercel.app'), // TODO: podmień na finalną domenę
  title: {
    default: 'Baltic Digital Institute',
    template: '%s — Baltic Digital Institute'
  },
  description: 'Strategia, governance i B+R jako usługa. Szybciej od slajdów do wdrożeń.',
  openGraph: {
    title: 'Baltic Digital Institute',
    description: 'Strategia, governance i B+R jako usługa.',
    url: 'https://bdi-www-3.vercel.app', // TODO: podmień na finalną domenę
    siteName: 'BDI',
    locale: 'pl_PL',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baltic Digital Institute',
    description: 'Strategia, governance i B+R jako usługa.'
  },
  robots: {
    index: true, follow: true
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className={`${inter.variable} ${spaceGrotesk.variable} bg-background text-white font-body`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
