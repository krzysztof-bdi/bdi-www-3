import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'AI dla Prawników — Baltic Digital Institute',
  description: 'Szkolenia AI dla kancelarii: analiza umów, automatyzacja pism, KPI.'
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
