'use client'
import Link from 'next/link'
export default function EnrollBar() {
  return (
    <div className="w-full bg-background-secondary/40 border-b border-white/10">
      <div className="container-p py-3 text-sm flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="opacity-80">Szkolenia AI w Warszawie — zapisy:</div>
        <div className="flex flex-wrap gap-2">
          <Link href="/ai-dla-ngo" className="link-cta shrink-0">AI dla NGO</Link>
          <Link href="/ai-dla-ciebie" className="link-cta shrink-0">AI dla Ciebie</Link>
          <Link href="/ai-dla-prawnikow" className="link-cta shrink-0">AI dla Prawników</Link>
        </div>
      </div>
    </div>
  )
}
