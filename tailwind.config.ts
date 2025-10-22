import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Twoje oryginalne kolory
        primary: '#0A192F',
        accent: '#64FFDA',
        'text-primary': '#FFFFFF',
        'text-secondary': '#8892B0',
        'background-secondary': '#112240',

        // Nowe kolory dla podstrony NGO
        'bdi-granat': '#0A192F',
        'bdi-turkus': '#64FFDA',
        'bdi-jasny': '#F7FAFC',
        'bdi-szary-tekst': '#C0CAD6',
      },
      fontFamily: {
        // Nowe czcionki z blueprintu
        heading: ['Geist Sans', 'ui-sans-serif', 'system-ui'],
        sans: ['Lato', 'ui-sans-serif', 'system-ui'],
        
        // TWOJA ORYGINALNA CZCIONKA, KTÓREJ BRAKOWAŁO
        body: ['var(--font-body)'],
      },
      boxShadow: { 
        card: '0 10px 30px -10px rgba(2,12,27,0.7)' 
      },
      borderRadius: { 
        xl:'1rem', 
        '2xl':'1.25rem' 
      }
    }
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
