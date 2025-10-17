/** @type {import('next').NextConfig} */
const isGcp = process.env.DEPLOY_TARGET === 'GCP'
const config = {
  reactStrictMode: true,
  experimental: { optimizePackageImports: ['lucide-react'] },
  images: { unoptimized: isGcp },
  ...(isGcp ? { output: 'export', basePath: process.env.BASE_PATH || undefined } : {})
}
export default config
