const requiredSkills = [
  'Vue.js',
  'Nuxt',
  'TypeScript',
  'Tailwind',
  'REST API',
  'Git',
  'Angular',
]

const niceToHaveSkills = [
  'Figma',
  'Docker',
  'Vitest',
  'Html,'
]


function matches(candidate: string, target: string) {
  const a = candidate.toLowerCase().trim()
  const b = target.toLowerCase().trim()

  
  return a.includes(b) || b.includes(a)
}

function computeMatch(skills: string[]) {
  const matched = requiredSkills.filter(req =>
    skills.some(s => matches(s, req))
  )
  const missing = requiredSkills.filter(req =>
    !skills.some(s => matches(s, req))
  )


  // score berechnen
  const pct = requiredSkills.length
    ? Math.round((matched.length / requiredSkills.length) * 100)
    : 0

  return { score: pct, matched, missing }
}

export { requiredSkills, niceToHaveSkills, computeMatch }
