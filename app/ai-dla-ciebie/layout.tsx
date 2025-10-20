import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'AI dla Ciebie — Baltic Digital Institute',
  description: 'Szkolenia AI dla osób indywidualnych z dofinansowaniem (Warszawa).'
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
