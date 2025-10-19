import programs from '@/../public/data/programs.json'

export type Program = {
  id: string
  name: string
  region: string
  coverage: number
  cap_pln: number
  category: 'szkolenia'
  profil: Array<'osoba'|'msp'|'enterprise'>
  uwagi?: string
}

export function listPrograms(region: string, profile: 'osoba'|'msp'|'enterprise' = 'osoba'): Program[] {
  const key = (region || '').toLowerCase()
  const all = (programs as Record<string, Program[]>)[key] ?? []
  return all.filter(p => p.profil.includes(profile))
}

export function estimateGrantCost(program: Program, trainingCostPln: number) {
  const maxByCoverage = Math.round(trainingCostPln * program.coverage)
  const grant = Math.min(maxByCoverage, program.cap_pln)
  const wkładWłasny = Math.max(trainingCostPln - grant, 0)
  return { grant, wkładWłasny }
}
