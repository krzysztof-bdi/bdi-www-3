import type { Metadata } from 'next'
import './globals.css'
import { heading as geistSans, lato } from './fonts'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'BDI — Baltic Digital Institute',
  description: 'Oficjalna strona Baltic Digital Institute'
}

export default function RootLayout({ children }:{ children: React.ReactNode }){
  return (
    <html lang="pl">
      <body className={`${geistSans.variable} ${lato.variable} min-h-screen flex flex-col`}> 
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
