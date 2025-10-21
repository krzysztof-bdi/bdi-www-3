"use client"
import { ORG } from "@/lib/org"
export default function OrgStamp() {
  return (
    <aside className="mt-10 text-xs md:text-sm rounded-xl border border-white/10 bg-background-secondary/40 p-4">
      <div className="font-medium mb-1">{ORG.name} — {ORG.legalForm}</div>
      <div className="opacity-80">
        {ORG.street}, {ORG.postalCode} {ORG.city} • {ORG.country}
      </div>
      <div className="opacity-80 mt-1">
        KRS {ORG.krs} • NIP {ORG.nip} • REGON {ORG.regon}
      </div>
      <div className="opacity-80 mt-1">
        E-mail: <a className="underline" href={`mailto:${ORG.email}`}>{ORG.email}</a> • WWW: <a className="underline" href={ORG.website}>{ORG.website.replace(/^https?:\/\//,'')}</a>
      </div>
    </aside>
  )
}
