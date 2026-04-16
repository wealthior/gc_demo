// profil definitionen (in prod aus api laden)
const jobProfiles = {
  frontend: {
    title: 'Frontend Developer',
    required: ['Vue.js', 'Nuxt', 'TypeScript', 'Tailwind', 'REST API', 'Git',],
    niceToHave: ['Figma', 'Docker', 'Vitest', 'HTML', 'Angular'],
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
  'REST API', 'Git', 'Figma', 'HTML', 'CSS', 'Docker', 'Node.js', 'Accessibility'
]

function matches(candidate: string, target: string) {
  const a = candidate.toLowerCase().trim()
  const b = target.toLowerCase().trim()
  return a.includes(b) || b.includes(a)
}

function computeMatch(skills: string[], profileKey: ProfileKey = 'frontend') {
  const profile = jobProfiles[profileKey]
  if (!profile) return { score: 0, matched: [], missing: [], matchedNice: [] }

  const matched = profile.required.filter(req =>
    skills.some(s => matches(s, req))
  )
  const missing = profile.required.filter(req =>
    !skills.some(s => matches(s, req))
  )

  const matchedNice = profile.niceToHave.filter(nice =>
    skills.some(s => matches(s, nice))
  )

  // score: required = 80%, nice to have= 20%
  const reqPct = profile.required.length
    ? (matched.length / profile.required.length) * 80
    : 0
  const nicePct = profile.niceToHave.length
    ? (matchedNice.length / profile.niceToHave.length) * 20
    : 0
  const pct = Math.round(reqPct + nicePct)

  return { score: pct, matched, missing, matchedNice }
}

// alle skills eines profils 
function getAllSkills(profileKey: ProfileKey = 'frontend') {
  const profile = jobProfiles[profileKey]
  if (!profile) return []
  return [...profile.required, ...profile.niceToHave]
}

export { jobProfiles, mySkills, computeMatch, getAllSkills }
export type { ProfileKey }
