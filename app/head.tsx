import { ORG } from "@/lib/org"
export default function Head() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": ORG.name,
    "url": ORG.website,
    "email": ORG.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": ORG.street,
      "postalCode": ORG.postalCode,
      "addressLocality": ORG.city,
      "addressCountry": ORG.country
    },
    "taxID": ORG.nip,
    "identifier":.filter(Boolean)
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
