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
      <section className="bg-white">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <h2 className="font-heading text-3xl md:text-4xl mb-6">
            Więcej misji, mniej biurokracji.
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <ul className="list-disc list-inside">
              <LI>Toniesz we wnioskach, raportach i mailach?</LI>
              <LI>Pisanie grantów jest powtarzalne i wyczerpujące?</LI>
              <LI>
                Brakuje rąk do pracy i budżetu na komunikację i fundraising?
              </LI>
              <LI>
                Technologia mogłaby pomóc, ale nie wiesz, od czego zacząć?
              </LI>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              To nie jest problem jednej organizacji — to systemowe wyzwanie
              całego trzeciego sektora. Chroniczny brak zasobów zmusza do pracy
              w trybie „ludzi-orkiestry”. Dziś są jednak rozwiązania, które
              pozwalają małym zespołom osiągać rezultaty zarezerwowane dotąd dla
              największych graczy. Nasze dofinansowane szkolenia AI to strategiczne narzędzie, które zwielokrotni Twój wpływ. Pokażemy Ci, jak odzyskać czas i energię, by skupić się na tym, co najważniejsze - na Waszej misji.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-bdi-jasny">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <h2 className="font-heading text-3xl md:text-4xl mb-10">
            Wybierz swoją ścieżkę
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xl">
              <thead className="bg-bdi-granat text-bdi-turkus">
                <tr>
                  <th className="p-4 text-left">Cecha</th>
                  <th className="p-4 text-left">Kurs Wprowadzający ⚡️</th>
                  <th className="p-4 text-left">Kurs Premium 🚀</th>
                </tr>
              </thead>
              <tbody className="[&>tr:nth-child(odd)]:bg-gray-50">
                <tr>
                  <td className="p-4 font-semibold">Nazwa</td>
                  <td className="p-4">Błyskawiczne pisanie wniosków grantowych</td>
                  <td className="p-4">
                    Strategia AI w Trzecim Sektorze: Kompleksowa transformacja NGO
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Idealny dla</td>
                  <td className="p-4">Szybkie usprawnienie grantwritingu</td>
                  <td className="p-4">
                    Strategiczne wdrożenie AI w całej organizacji
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Czas trwania</td>
                  <td className="p-4">6h (1 dzień)</td>
                  <td className="p-4">21h (3 dni)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Status</td>
                  <td className="p-4">Nabycie kompetencji</td>
                  <td className="p-4">
                    Uzyskanie kwalifikacji (preferencyjne dofinansowanie)
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Cena / Dofinansowanie</td>
                  <td className="p-4">
                    2 000 PLN — dofinansowanie 1 756 PLN → Twój wkład: 244 PLN
                  </td>
                  <td className="p-4">
                    7 950 PLN — dofinansowanie 6 995 PLN → Twój wkład: 955 PLN
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <h2 className="font-heading text-3xl md:text-4xl mb-6">
            Twój nowy zestaw narzędzi
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <ul className="list-disc list-inside">
              <LI>
                Automatyzacja grantwritingu i komunikacji (Prompt Book dla NGO)
              </LI>
              <LI>
                Zarządzanie projektami na autopilocie (workflow w darmowych
                narzędziach)
              </LI>
              <LI>Ład cyfrowy i bezpieczeństwo — gotowe drafty dokumentów</LI>
              <LI>Marketing i fundraising oparty na AI</LI>
            </ul>
            <div className="bg-bdi-jasny rounded-2xl p-6">
              <p className="text-sm text-gray-600">
                Dodatkowo: certyfikat nabycia kwalifikacji/kompetencji, komplet
                materiałów oraz 3 miesiące dostępu do platformy e-learningowej.
              </p>
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
      <section className="bg-white">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <h2 className="font-heading text-3xl md:text-4xl mb-6">
            Zabezpiecz swoje miejsce z dofinansowaniem – jak aplikować
          </h2>
          <ol className="list-decimal list-inside space-y-2 max-w-3xl text-gray-700">
            <li>
              Wypełnij krótki formularz — rezerwujesz miejsce i startujemy z
              formalnościami.
            </li>
            <li>
              Rozmowa z opiekunem — weryfikujemy kryteria i odpowiadamy na
              pytania.
            </li>
            <li>
              Decyzja i start — pomagamy w papierach i przechodzimy do szkolenia.
            </li>
          </ol>
          <div className="mt-8 bg-bdi-jasny rounded-xl p-4 md:p-6">
            <LeadNgoForm intentId="LP_NGO" leadSource="LP NGO" />
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Liczba miejsc w grupie jest ograniczona (do 12 osób).
          </p>
        </div>
      </section>
      <section className="bg-bdi-granat text-white">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl text-bdi-turkus mb-4">
                Gotowi na mniej papierów i więcej efektów?
              </h2>
              <p className="text-bdi-szary-tekst">Zarezerwuj miejsce — oddzwonimy i przeprowadzimy przez formalności.</p>
              <p className="mt-2 text-bdi-szary-tekst">Nie czekaj, aż inni Cię wyprzedzą. Miejsca są ograniczone.</p>
              <p className="text-bdi-szary-tekst">Liczba miejsc w każdej grupie szkoleniowej jest limitowana - pracujemy w małych grupach do 12 osób, aby zapewnić najwyższą jakość i komfort pracy warsztatowej.</p>
            </div>
            <div>
              <LeadNgoForm intentId="LP_NGO" leadSource="LP NGO" />
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6 flex flex-wrap items-center gap-4">
            <Image src="/images/bdi-logo.svg" alt="BDI" width={80} height={24} />
            <a
              className="underline hover:text-bdi-turkus"
              href="/polityka-prywatnosci"
            >
              Polityka Prywatności
            </a>
            <a className="underline hover:text-bdi-turkus" href="/regulamin">
              Regulamin Szkolenia
            </a>
            <a className="underline hover:text-bdi-turkus" href="/kontakt">
              Kontakt
            </a>
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Course', name: 'AI dla NGO', provider: { '@type': 'Organization', name: 'Baltic Digital Institute', url: 'https://www.baltic-digital.org' }, offers: [{ '@type': 'Offer', price: '244', priceCurrency: 'PLN', category: 'Workshop' }, { '@type': 'Offer', price: '955', priceCurrency: 'PLN', category: 'Course' }] }) }} />
    </main>
  );
}
