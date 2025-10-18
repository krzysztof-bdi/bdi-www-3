import Link from 'next/link'
export const metadata = { title: 'Polityka prywatności — Baltic Digital Institute' }
export default function Page(){
  return (
    <section className="container-p py-12 prose prose-invert max-w-3xl">
      <h1>Polityka prywatności i plików cookies</h1>
      <p>Niniejsza Polityka określa zasady przetwarzania danych osobowych w serwisie baltic-digital.org.</p>
      <h2>Administrator danych</h2>
      <p>Fundacja Baltic Digital Institute, ul. Hołdu Pruskiego 6, 80-321 Gdańsk.</p>
      <h2>Inspektor Ochrony Danych</h2>
      <p>Kontakt: <a href="mailto:iodo@baltic-digital.org">iodo@baltic-digital.org</a>, <a href="mailto:dpo@baltic-digital.org">dpo@baltic-digital.org</a></p>
      <h2>Zakres i cele przetwarzania</h2>
      <ul><li>Formularz kontaktowy — obsługa zapytań.</li><li>Newsletter — informowanie o działalności i wydarzeniach (na podstawie zgody).</li></ul>
      <h2>Podstawy prawne</h2>
      <p>Art. 6 ust. 1 lit. a, b, c lub f RODO — odpowiednio: zgoda, wykonanie umowy, obowiązek prawny, prawnie uzasadniony interes.</p>
      <h2>Prawa użytkownika</h2>
      <p>Dostęp, sprostowanie, usunięcie, ograniczenie, przenoszenie, sprzeciw oraz skarga do Prezesa UODO.</p>
      <h2>Cookies i logi serwera</h2>
      <p>Pliki cookies używane w celach statystycznych i funkcjonalnych. Użytkownik może zarządzać cookies w przeglądarce.</p>
      <h2>Wykorzystanie wizerunku</h2>
      <p>Podczas wydarzeń mogą być wykonywane zdjęcia/wideo w celach informacyjnych i promocyjnych; w razie potrzeby prosimy o odrębną zgodę.</p>
      <hr className="my-8" />
      <p className="text-sm text-text-secondary">Niniejsza wersja jest skrótem operacyjnym. Pełne brzmienie dokumentów wewnętrznych (Polityka ODO, Rejestry, Klauzule) jest dostępne w SSOT BDI.</p>
      <p><Link href="/kontakt" className="link-cta">Skontaktuj się z nami</Link></p>
    </section>
  )
}
