'use client';

import { useState } from 'react';

type Props = {
  intentId: string;
  leadSource: string;
};

export default function LeadNgoForm({ intentId, leadSource }: Props) {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<boolean | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      Name: (fd.get('name') as string)?.trim(),
      Email: (fd.get('email') as string)?.trim(),
      Phone: (fd.get('phone') as string)?.trim() || undefined,
      Organization: (fd.get('org') as string)?.trim() || undefined,
      Interest_Intro: fd.get('interest_intro') ? true : undefined,
      Interest_Premium: fd.get('interest_premium') ? true : undefined,
      Lead_Source: leadSource,
      Intent_ID: intentId,
      Marketing_Consent: fd.get('consent') ? true : false,
      hp: (fd.get('hp') as string) || '',
    };

    setLoading(true);
    try {
      const res = await fetch('/api/lead-ngo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setOk(res.ok);
      if (res.ok) form.reset();
    } catch {
      setOk(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* honeypot */}
      <input
        type="text"
        name="hp"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="name"
          required
          placeholder="Imię i nazwisko"
          className="w-full p-3 border rounded-lg"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Adres e-mail"
          className="w-full p-3 border rounded-lg"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="phone"
          placeholder="Telefon (opcjonalnie)"
          className="w-full p-3 border rounded-lg"
        />
        <input
          name="org"
          placeholder="Nazwa organizacji / grupy nieformalnej (opcjonalnie)"
          className="w-full p-3 border rounded-lg"
        />
      </div>

      <fieldset className="grid md:grid-cols-3 gap-3">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="interest_intro" /> Wprowadzający:
          „Błyskawiczne pisanie wniosków”
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="interest_premium" /> Premium:
          „Kompleksowa transformacja NGO”
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="consent" required /> Zgoda na
          przetwarzanie danych
        </label>
      </fieldset>

      <button
        type="submit"
        disabled={loading}
        className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-bdi-turkus text-bdi-granat font-bold hover:bg-white border border-bdi-turkus transition disabled:opacity-60"
      >
        {loading ? 'Wysyłanie…' : 'Wyślij zgłoszenie i zarezerwuj miejsce'}
      </button>

      {ok === true && (
        <p className="text-sm text-green-700">
          Dziękujemy! Skontaktujemy się w ciągu 24 godzin.
        </p>
      )}
      {ok === false && (
        <p className="text-sm text-red-700">
          Ups… Spróbuj ponownie lub napisz: kontakt@baltic-digital.org
        </p>
      )}
    </form>
  );
}
