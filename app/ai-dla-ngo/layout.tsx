import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'AI dla NGO — Baltic Digital Institute',
  description: 'Certyfikowane szkolenia AI dla NGO z dofinansowaniem (Warszawa).'
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
