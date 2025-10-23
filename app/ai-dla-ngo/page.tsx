// app/ai-dla-ngo/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import LeadNgoForm from '@/components/forms/LeadNgoForm';

export const metadata: Metadata = {
  title:
    'AI dla NGO — Certyfikowane szkolenia z dofinansowaniem | Baltic Digital Institute',
  description:
    'Zwiększ skuteczność swojej organizacji! Weź udział w certyfikowanych szkoleniach AI dla NGO i zautomatyzuj pisanie grantów. Zdobądź do 88% dofinansowania z UE dla NGO z Warszawy. Pomożemy Ci w formalnościach. Sprawdź!',
  keywords: [
    'AI dla NGO',
    'szkolenia AI',
    'sztuczna inteligencja',
    'kursy dla NGO',
    'dofinansowanie dla NGO',
    'dotacje UE',
    'pisanie grantów',
    'fundacje',
    'stowarzyszenia',
    'trzeci sektor',
    'Baltic Digital Institute',
    'Warszawska Akademia Kwalifikacji',
    'szkolenia Warszawa',
  ],
  alternates: { canonical: 'https://www.baltic-digital.org/ai-dla-ngo' },
  openGraph: {
    title:
      'AI dla NGO — Certyfikowane szkolenia z dofinansowaniem | Baltic Digital Institute',
    description:
      'Zdobądź do 88% dofinansowania na certyfikowane szkolenia AI dla NGO (Warszawa). Automatyzuj grantwritingu i komunikację. Pomożemy w formalnościach.',
    url: 'https://www.baltic-digital.org/ai-dla-ngo',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const LI = ({ children, className =  }: { children: React.ReactNode; className?: string }) => (
  <li className={`mb-2 leading-relaxed text-gray-700 dark:text-bdi-szary-tekst ${className}`}>{children}</li>
);

export default function AiDlaNgoPage() {
  return (
    <main className="text-bdi-granat">
      {/* SEKCJA 1/7 — HERO */}
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

          <div className="mt-8 grid gap-6 md:grid-cols-2 bg-white/5 p-6 rounded-2xl">
            <div className="text-sm text-white/90">
              <p className="font-semibold text-white mb-2">Kto się kwalifikuje?</p>
              <ul className="list-disc list-inside">
                <LI className="!text-white/90">Miejsce zamieszkania: Warszawa</LI>
                <LI className="!text-white/90">Wiek: 18+</LI>
                <LI>
                  Osoba fizyczna nieprowadząca działalności gospodarczej
                </LI>
              </ul>
              <a
                href="/kontakt?intent=NGO_Alternatywne_Programy"
                className="inline-block mt-4 underline text-white hover:text-bdi-turkus"
              >
                Zapytaj o inny, dopasowany program »
              </a>
            </div>

            <div className="md:col-span-2 bg-white/10 rounded-xl p-4 md:p-6">
              <LeadNgoForm intentId="LP_NGO" leadSource="LP NGO" />
            </div>
          <p className="text-xs text-gray-500 mt-1">Zalecany wymiar zdjęcia: 800×800 px</p>
          </div>
        </div>
      </section>

      {/* SEKCJA 2/7 — DYLEMAT / PROBLEM */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <h2 className="font-heading text-3xl md:text-4xl mb-6">
            Więcej misji, mniej biurokracji.
          </h2>
<p className="mt-2 text-gray-700 dark:text-bdi-szary-tekst max-w-3xl">W BDI nie kupujesz kursu, ale dołączasz do ekosystemu wsparcia. Nad Twoim sukcesem będzie czuwał dedykowany zespół ekspertów, którzy rozumieją unikalne wyzwania trzeciego sektora.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <ul className="list-disc list-inside space-y-2"><li>Automatyzacja grantwritingu i komunikacji: Nauczysz się bezpiecznie generować spójne teksty do wniosków, postów na social media i newsletterów. Dostaniesz gotowy „AI Prompt Book dla NGO” z szablonami zapytań.</li><li>Zarządzanie projektami na autopilocie: Zaprojektujesz i wdrożysz zautomatyzowane przepływy pracy, by nic Ci nie umknęło.</li><li>Ład cyfrowy i bezpieczeństwo: Dowiesz się, jak chronić dane darczyńców i organizacji przed cyberzagrożeniami (Phishing, RODO). Wygenerujesz drafty kluczowych dokumentów wewnętrznych.</li><li>Marketing i fundraising oparty na AI: Opanujesz podstawy tworzenia grafik i nauczysz się budować strategię komunikacji, która angażuje i zachęca do wsparcia.</li></ul>
            <p className="text-gray-700 leading-relaxed">
              To nie jest problem jednej organizacji — to systemowe wyzwanie
              całego trzeciego sektora. Chroniczny brak zasobów zmusza do pracy
              w trybie „ludzi-orkiestry”. Dziś są jednak rozwiązania, które
              pozwalają małym zespołom osiągać rezultaty zarezerwowane dotąd dla
              największych graczy.
            </p>
          </div>
        </div>
      </section>

      {/* SEKCJA 3/7 — OFERTA / PORÓWNANIE KURSÓW */}
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
<tr><td className="p-4 font-semibold">Nazwa</td><td className="p-4">Błyskawiczne pisanie wniosków grantowych</td><td className="p-4">Kompleksowa transformacja NGO</td></tr>
<tr><td className="p-4 font-semibold">Idealny dla</td><td className="p-4">Osób chcących natychmiast rozwiązać problem czasochłonnego pisania grantów.</td><td className="p-4">Zaangażowanych społeczników gotowych na strategiczne wdrożenie AI w całej organizacji.</td></tr>
<tr><td className="p-4 font-semibold">Główny cel</td><td className="p-4">Automatyzacja 80% pracy administracyjnej przy tworzeniu wniosków.</td><td className="p-4">Automatyzacja wszystkich głównych procesów w organizacji</td></tr>
<tr><td className="p-4 font-semibold">Czas trwania</td><td className="p-4">6 godzin dydaktycznych (1 dzień)</td><td className="p-4">21 godzin dydaktycznych (3 dni)</td></tr>
<tr><td className="p-4 font-semibold">Status usługi</td><td className="p-4">Nabycie kompetencji.</td><td className="p-4">Uzyskanie kwalifikacji</td></tr>
<tr><td className="p-4 font-semibold">Całkowity koszt</td><td className="p-4">2 000 PLN</td><td className="p-4">7 950 PLN</td></tr>
<tr><td className="p-4 font-semibold">Dofinansowanie</td><td className="p-4">1 756 PLN</td><td className="p-4">6 995 PLN</td></tr>
<tr><td className="p-4 font-semibold">Twój wkład (cena dla Ciebie)</td><td className="p-4">244 PLN</td><td className="p-4">955 PLN</td></tr>
</tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div className="p-6 bg-white rounded-2xl border border-gray-200">
              <h3 className="font-heading text-2xl mb-2">AI dla NGO: Błyskawiczne pisanie wniosków grantowych (6h)</h3><p className="text-gray-700 dark:text-bdi-szary-tekst">Zredukuj czas pisania jednego wniosku o 80% i zwiększ swoje szanse na finansowanie. To intensywny, 6-godzinny warsztat, który da Ci natychmiastowe rezultaty.</p><div className="mt-3"><p className="font-semibold mb-1">Czego się nauczysz:</p><ul className="list-disc list-inside space-y-1"><li>Pisać efektywne prompty, by AI generowało spójne fragmenty wniosków.</li><li>Korzystać z 3 darmowych narzędzi AI dedykowanych do grantwritingu.</li><li>Adaptować wygenerowane treści do wymogów różnych konkursów.</li></ul></div>
              <a
                href="/kontakt?intent=NGO_Warsztat_Grantwriting"
                className="inline-block mt-4 px-6 py-3 rounded-full bg-bdi-turkus text-bdi-granat font-bold hover:bg-white border border-bdi-turkus transition"
              >
                Chcę pisać granty szybciej
              </a>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-200">
              <h3 className="font-heading text-2xl mb-2">Strategia AI w Trzecim Sektorze: Kompleksowa transformacja NGO (21h)</h3><p className="text-gray-700 dark:text-bdi-szary-tekst">Zautomatyzuj wszystkie główne procesy w swojej organizacji. To kompleksowy, 3-dniowy program, który kończy się uzyskaniem formalnej kwalifikacji i wyposaża Cię w strategiczne kompetencje do zarządzania, automatyzacji i fundraisingu.</p><div className="mt-3"><p className="font-semibold mb-1">Tego się nauczysz:</p><ul className="list-disc list-inside space-y-2"><li><span className="font-semibold">Ład cyfrowy i bezpieczeństwo:</span> Dowiesz się, jak chronić dane darczyńców i organizacji przed cyberzagrożeniami (Phishing, RODO). Wygenerujesz drafty kluczowych dokumentów wewnętrznych, takich jak: polityka prywatności, regulamin organizacyjny, spis zasobów organizacji.</li><li><span className="font-semibold">Automatyzacja procesów:</span> Zbudujesz zautomatyzowane ścieżki pracy (workflow) dla zadań administracyjnych i zarządczych przy użyciu narzędzi takich jak Trello czy ClickUp.</li><li><span className="font-semibold">Fundraising i komunikacja:</span> Nauczysz się wykorzystywać AI do tworzenia kampanii, komunikacji z darczyńcami i analizy danych, aby zwiększyć skuteczność zbiórek.</li></ul></div>
              <a
                href="/kontakt?intent=NGO_Premium_Transformacja"
                className="inline-block mt-4 px-6 py-3 rounded-full bg-bdi-turkus text-bdi-granat font-bold hover:bg-white border border-bdi-turkus transition"
              >
                Chcę przeprowadzić transformację
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEKCJA 4/7 — KORZYŚCI / CO ZYSKASZ */}
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
            <div className="bg-bdi-jasny rounded-2xl p-6 border border-bdi-granat/20"><p className="text-sm text-gray-800 font-semibold">Dodatkowe korzyści: Każdy uczestnik otrzymuje certyfikat nabycia kwalifikacji/kompetencji, komplet materiałów szkoleniowych i 3-miesięczny darmowy dostęp do naszej platformy e-learningowej.</p></div>
          </div>
        </div>
      </section>

      {/* SEKCJA 5/7 — ZESPÓŁ */}
      <section className="bg-gray-50">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <h2 className="font-heading text-3xl md:text-4xl mb-10">
            Poznaj nasz zespół
          </h2>
        </div>
        <div className="container mx-auto px-6 pb-16 md:pb-20">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: 'Krzysztof Rek',
                role: 'Architekt AI i Strateg',
                desc:
                  'Menedżer IT z doświadczeniem w globalnych korporacjach, przedsiębiorca i założyciel fundacji. Tłumaczy złożoną technologię na praktyczne wdrożenia.',
              },
              {
                name: 'Małgorzata',
                role: 'Dedykowana opiekunka',
                desc:
                  'Twój pierwszy kontakt — przeprowadzi przez formalności, zadba o komfort i jakość współpracy.',
              },
              {
                name: 'Olga Szudzik',
                role: 'Analityczka procesowa',
                desc:
                  'Mapuje procesy organizacji i wskazuje miejsca największych efektów automatyzacji.',
              },
            ].map((p) => (
              <div
                key={p.name}
                className="bg-white p-6 rounded-2xl border border-gray-200"
              >
                <div className="h-64 w-full bg-gray-100 rounded-xl mb-2" />
                <h3 className="font-heading text-xl">{p.name}</h3>
                <p className="text-sm text-bdi-turkus font-semibold">{p.role}</p>
                <p className="mt-2 text-gray-700 dark:text-bdi-szary-tekst">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEKCJA 6/7 — JAK APLIKOWAĆ */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <h2 className="font-heading text-3xl md:text-4xl mb-6">
            Zabezpiecz swoje miejsce z dofinansowaniem – jak aplikować
          </h2>
          <ol className="list-decimal list-inside space-y-2 max-w-3xl text-gray-700 dark:text-bdi-szary-tekst">
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
          <p className="mt-4 text-sm text-gray-600">
            Liczba miejsc w grupie jest ograniczona (do 12 osób).
          </p>
        </div>
      </section>

      {/* SEKCJA 7/7 — KOŃCOWE CTA / STOPKA LP */}
      <section className="bg-bdi-granat text-white">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <h2 className="font-heading text-3xl md:text-4xl text-bdi-turkus mb-4">
                Gotowi na mniej papierów i więcej efektów?
              </h2>
              <p className="text-bdi-szary-tekst">
                Zarezerwuj miejsce — oddzwonimy i przeprowadzimy przez
                formalności.
</p>
<p className="mt-2 text-bdi-szary-tekst">Nie czekaj, aż inni Cię wyprzedzą. Miejsca są ograniczone.</p>
<p className="text-bdi-szary-tekst">Liczba miejsc w każdej grupie szkoleniowej jest limitowana - pracujemy w małych grupach do 12 osób, aby zapewnić najwyższą jakość i komfort pracy warsztatowej.
              </p>
            </div>
            <div className="md:col-span-1">
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

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'AI dla NGO',
            provider: {
              '@type': 'Organization',
              name: 'Baltic Digital Institute',
              url: 'https://www.baltic-digital.org',
            },
            offers: [
              {
                '@type': 'Offer',
                price: '244',
                priceCurrency: 'PLN',
                category: 'Workshop',
              },
              {
                '@type': 'Offer',
                price: '955',
                priceCurrency: 'PLN',
                category: 'Course',
              },
            ],
          }),
        }}
      />
    </main>
  );
}