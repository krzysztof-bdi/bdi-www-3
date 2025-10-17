'use client'
import { useMemo, useState } from 'react'
type Q = { id:string; text:string; weight:number }
const QUESTIONS: Q[] = [
  { id:'q1', text:'Czy masz zmapowane procesy kluczowe?', weight:2 },
  { id:'q2', text:'Czy regularnie testujesz kopie zapasowe?', weight:2 },
  { id:'q3', text:'Czy wykorzystujesz automatyzacje (RPA/AI) w operacjach?', weight:1 },
  { id:'q4', text:'Czy posiadasz plan ciągłości działania (BCP)?', weight:3 },
  { id:'q5', text:'Czy zespół przeszedł szkolenia z AI/cyber w 12 m-cach?', weight:1 }
]
export default function QuizPage(){
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const score = useMemo(()=> Object.entries(answers).reduce((s,[id,v])=>{
    const q = QUESTIONS.find(q=>q.id===id)!; return s + v * q.weight
  },0), [answers])
  const max = useMemo(()=> QUESTIONS.reduce((s,q)=> s + 3*q.weight, 0), [])
  const level = useMemo(()=>{
    const pct = score / max
    if (pct >= 0.75) return { label:'Wysoka odporność', color:'text-green-400' }
    if (pct >= 0.45) return { label:'Średnia odporność', color:'text-yellow-400' }
    return { label:'Niska odporność', color:'text-red-400' }
  }, [score, max])
  function set(id:string, v:number){ setAnswers(a=> ({ ...a, [id]: v })) }
  async function submitLead(){
    const payload = { Segment_ID: 'Career', Quiz_Score: score, Answers: answers }
    await fetch('/api/lead-quiz', { method:'POST', body: JSON.stringify(payload) })
    alert('Dziękujemy! Wynik zapisany — skontaktujemy się z rekomendacją ścieżki.')
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl card p-6">
        <h1 className="font-heading text-3xl mb-1">Test Odporności Kariery</h1>
        <p className="text-text-secondary mb-6">Oceń swoją gotowość na automatyzację i zakłócenia.</p>
        <ol className="space-y-5">
          {QUESTIONS.map(q=> (
            <li key={q.id}>
              <div className="mb-2">{q.text}</div>
              <div className="flex gap-2">
                {[0,1,2,3].map(v=> (
                  <button key={v} onClick={()=>set(q.id, v)} className={`px-3 py-2 rounded-xl border ${answers[q.id]===v ? 'border-accent text-accent' : 'border-white/10 text-text-secondary'} hover:border-accent/60`}>
                    {v}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8 p-4 rounded-xl bg-background-secondary/60 border border-white/10">
          <div className="text-sm text-text-secondary mb-1">Wynik: {score} / {max}</div>
          <div className={`font-heading ${level.color}`}>{level.label}</div>
        </div>
        <button onClick={submitLead} className="link-cta mt-6">Zapisz wynik i pobierz rekomendacje</button>
      </div>
    </div>
  )
}
