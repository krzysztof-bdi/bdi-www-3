'use client'
import { useState } from 'react'

async function postJSON(url: string, payload: any) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`HTTP error ${res.status}: ${await res.text()}`)
  try {
    return await res.json()
  } catch {
    return {}
  }
}

type Answer = { q: string; v: number }

export default function QuizPage() {
  const [email, setEmail] = useState('')
  const [answers, setAnswers] = useState<Answer[]>([])
  const [error, setError] = useState<string | undefined>()
  const [done, setDone] = useState(false)
  const [sending, setSending] = useState(false)

  const questions = [
    { id: 'q1', t: 'Jak oceniasz gotowość do zmiany?', max: 5 },
    { id: 'q2', t: 'Czy masz plan kompetencyjny?', max: 5 },
    { id: 'q3', t: 'Twoja sieć wsparcia zawodowego?', max: 5 },
  ]

  function setVal(qid: string, v: number) {
    const next = answers.filter(a => a.q !== qid).concat({ q: qid, v })
    setAnswers(next)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(undefined)

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Podaj poprawny e-mail.')
    if (answers.length < questions.length) return setError('Odpowiedz na wszystkie pytania.')

    const score = answers.reduce((s, a) => s + a.v, 0)

    setSending(true)
    try {
      await postJSON('/api/lead-quiz', {
        Name: "Uczestnik Quizu", // Domyślna nazwa, bo jej nie zbieramy w formularzu
        Email: email,
        Score: score,
        Answers: answers,
        Segment_ID: "Career",
      })
      setDone(true)
    } catch (err: any) {
      setError(err.message || 'Błąd wysyłki')
    } finally {
      setSending(false)
    }
  }

  if (done) {
    return (
      <section className="container-p py-12 max-w-2xl">
        <h1 className="font-heading text-3xl mb-2">Dziękujemy!</h1>
        <p className="text-text-secondary">Wynik zapisany. Skontaktujemy się z propozycją dalszych kroków.</p>
      </section>
    )
  }

  return (
    <section className="container-p py-12 max-w-2xl">
      <h1 className="font-heading text-3xl mb-4">Test odporności kariery</h1>
      <form onSubmit={submit} className="card p-6 space-y-6">
        {questions.map(q => (
          <div key={q.id}>
            <div className="mb-2">{q.t}</div>
            <div className="flex gap-3">
              {Array.from({ length: q.max }, (_, i) => i + 1).map(v => (
                <label key={v} className="inline-flex items-center gap-2">
                  <input type="radio" name={q.id} onChange={() => setVal(q.id, v)} /> {v}
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-4 border-t border-white/10">
          <label className="block mb-1 text-sm text-text-secondary">E-mail do wysyłki wyników</label>
          <input type="email" className="w-full p-3 rounded-xl bg-background-secondary/60 border border-white/10" value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button className="link-cta" disabled={sending}>{sending ? 'Wysyłanie…' : 'Zapisz wynik'}</button>
      </form>
    </section>
  )
}

