import type { Metadata } from 'next';
import Image from 'next/image';
import LeadNgoForm from '@/components/forms/LeadNgoForm';

export const metadata: Metadata = {
  title:
    'AI dla NGO — Certyfikowane szkolenia z dofinansowaniem | Baltic Digital Institute',
  description:
    'Zwiększ skuteczność swojej organizacji! Weź udział w certyfikowanych szkoleniach AI dla NGO i zautomatyzuj pisanie grantów. Zdobądź do 88% dofinansowania z UE dla NGO z Warszawy. Pomożemy Ci w formalnościach. Sprawdź!',
  keywords: [
    'AI dla NGO', 'szkolenia AI', 'sztuczna inteligencja', 'kursy dla NGO',
    'dofinansowanie dla NGO', 'dotacje UE', 'pisanie grantów', 'fundacje',
    'stowarzyszenia', 'trzeci sektor', 'Baltic Digital Institute',
    'Warszawska Akademia Kwalifikacji', 'szkolenia Warszawa',
  ],
  alternates: { canonical: 'https://www.baltic-digital.org/ai-dla-ngo' },
  openGraph: {
    title: 'AI dla NGO — Certyfikowane szkolenia z dofinansowaniem | Baltic Digital Institute',
    description: 'Zdobądź do 88% dofinansowania na certyfikowane szkolenia AI dla NGO (Warszawa). Automatyzuj grantwriting i komunikację. Pomożemy w formalnościach.',
    url: 'https://www.baltic-digital.org/ai-dla-ngo',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const LI = ({ children }: { children: React.ReactNode }) => (
  <li className="mb-2 leading-relaxed text-gray-700 dark:text-bdi-szary-tekst">{children}</li>
);

type Person = { name: string; role: string; desc: string };
const TEAM: Person[] = [
  { name: "Krzysztof", role: "Architekt AI i Strateg", desc: "Menedżer, który wdrażał systemy IT w globalnych koncernach, przedsiębiorca i założyciel fundacji. Krzysztof zaprojektuje dla Ciebie strategię wdrożenia AI, tłumacząc skomplikowaną technologię na praktyczne, zrozumiałe rozwiązania." },
  { name: "Małgorzata", role: "Twoja dedykowana opiekunka", desc: "Gosia to Twój pierwszy kontakt i przewodnik po całym procesie. Pomoże Ci w formalnościach związanych z dofinansowaniem, odpowie na wszystkie pytania organizacyjne i zadba o to, abyś czuł/a się zaopiekowany/a na każdym kroku - od pierwszego maila po odbiór certyfikatu." },
  { name: "Olga", role: "Analityczka procesowa", desc: "Olga pomoże zmapować i zrozumieć procesy w Twojej organizacji. Jej analityczne spojrzenie pozwoli zidentyfikować te obszary, w których automatyzacja przyniesie najszybsze i największe korzyści, zapewniając, że wdrożenie AI będzie idealnie dopasowane do Waszych realnych potrzeb." }
];

export default function AiDlaNgoPage() {
  return (
    <main className="text-bdi-granat">
      <section className="bg-bdi-granat text-white">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <h1 className="font-heading text-4xl md:text-5xl text-bdi-turkus max-w-4xl">
            Twoja misja zwielokrotniona przez AI. Koniec z papierami, czas na
            realny wpływ.
          </h1>
          <p className="mt-6 max-w-3xl text-bdi-szary-tekst text-lg">
            Zdobądź do <strong>88% dofinansowania</strong> z Unii Europejskiej
            na certyfikowane szkolenie AI dla Twojej organizacji. Pomożemy Ci
            przejść przez cały proces.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3 bg-white/5 p-6 rounded-2xl">
            <div className="text-base md:text-lg text-white">
              <p className="font-semibold text-white mb-2">Kto się kwalifikuje?</p>
              <ul className="list-disc list-inside">
                <li className="mb-2 leading-relaxed text-white">Miejsce zamieszkania: Warszawa</li>
                <li className="mb-2 leading-relaxed text-white">Wiek: 18+</li>
                <li className="mb-2 leading-relaxed text-white">Osoba fizyczna nieprowadząca działalności gospodarczej</li>
              </ul>
              <a href="/kontakt?intent=NGO_Alternatywne_Programy" className="inline-block mt-4 underline text-white hover:text-bdi-turkus">
                Zapytaj o inny, dopasowany program »
              </a>
            </div>
            <div className="md:col-span-2 bg-white/10 rounded-xl p-4 md:p-6">
              <LeadNgoForm intentId="LP_NGO" leadSource="LP NGO" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-50">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <h2 className="font-heading text-3xl md:text-4xl mb-10">
            Poznaj nasz zespół
          </h2>
          <p className="mt-2 text-gray-700 dark:text-bdi-szary-tekst max-w-3xl">W BDI nie kupujesz kursu, ale dołączasz do ekosystemu wsparcia. Nad Twoim sukcesem będzie czuwał dedykowany zespół ekspertów, którzy rozumieją unikalne wyzwania trzeciego sektora.</p>
        </div>
        <div className="container mx-auto px-6 pb-16 md:pb-20">
          <div className="grid md:grid-cols-3 gap-8">
            {TEAM.map((p) => (
              <div
                key={p.name}
                className="bg-white p-6 rounded-2xl border border-gray-200"
              >
                <div className="h-40 w-full bg-gray-100 rounded-xl mb-4" />
                <h3 className="font-heading text-xl">{p.name}</h3>
                <p className="text-sm text-bdi-turkus font-semibold">{p.role}</p>
                <p className="mt-2 text-gray-700">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
