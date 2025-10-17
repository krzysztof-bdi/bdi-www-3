# BDI Website v4.2 (Next.js, SVG assets)

## Szybki start lokalnie
```bash
unzip bdi-www-v3.zip && cd bdi-www-v3
npm i
npm run dev
# -> http://localhost:3000
```

## Podgląd w Vercel (prosto)
1) Konto na vercel.com → połącz z GitHub.  
2) Wgraj folder do nowego repo na GitHub.  
3) W Vercel: **New Project → Import** to repo → Deploy.  
4) Dostajesz link podglądowy (np. `https://bdi-www.vercel.app`).  
5) Gdy potwierdzimy, robimy eksport na GCP: `npm run build:gcp` i `scripts/deploy-gcp.mjs`.

## CRM
Endpointy `/api/lead-quiz` i `/api/lead-finansowanie` tylko logują — to wystarczy na demo.
