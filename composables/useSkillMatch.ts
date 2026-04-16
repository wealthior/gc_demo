// profil definitionen (in prod aus api laden)
const jobProfiles = {
  frontend: {
    title: 'Frontend Developer',
    required: ['Vue.js', 'Nuxt', 'TypeScript', 'Tailwind', 'REST API', 'Git', 'Angular'],
    niceToHave: ['Figma', 'Docker', 'Vitest', 'HTML'],
  },
  fullstack: {
    title: 'Fullstack Developer',
    required: ['Vue.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'REST API', 'Git', 'Docker'],
    niceToHave: ['Nuxt', 'Redis'],
  },
  ux: {
    title: 'UX Engineer',
    required: ['Vue.js', 'TypeScript', 'Figma', 'CSS', 'Accessibility', 'Design Systems'],
    niceToHave: ['Storybook', 'Vitest', 'Motion Design'],
  },
}

type ProfileKey = keyof typeof jobProfiles

// my profile
const mySkills = [
  'Vue.js', 'Angular', 'TypeScript', 'Tailwind',
  'REST API', 'Git', 'Figma', 'HTML', 'CSS',
]

function matches(candidate: string, target: string) {
  const a = candidate.toLowerCase().trim()
  const b = target.toLowerCase().trim()
  
  return a.includes(b) || b.includes(a)
}

function computeMatch(skills: string[], profileKey: ProfileKey = 'frontend') {
  const profile = jobProfiles[profileKey]
  if (!profile) return { score: 0, matched: [], missing: [] }

  const matched = profile.required.filter(req =>
    skills.some(s => matches(s, req))
  )
  const missing = profile.required.filter(req =>
    !skills.some(s => matches(s, req))
  )

  // score berechnen
  const pct = profile.required.length
    ? Math.round((matched.length / profile.required.length) * 100)
    : 0

  return { score: pct, matched, missing }
}

export { jobProfiles, mySkills, computeMatch }
export type { ProfileKey }
