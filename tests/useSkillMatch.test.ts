import { describe, it, expect } from 'vitest'
import { computeMatch, jobProfiles, getAllSkills } from '../composables/useSkillMatch'

const { required, niceToHave } = jobProfiles.frontend

describe('computeMatch', () => {
  it('scores 100% when all skills match', () => {
    const { score, missing } = computeMatch([...required, ...niceToHave])
    expect(score).toBe(100)
    expect(missing).toHaveLength(0)
  })

  it('nur required = 80%', () => {
    const { score } = computeMatch([...required])
    expect(score).toBe(80)
  })

  it('scores 0% with no overlap', () => {
    const { score, matched } = computeMatch(['Python', 'Ruby', 'Elixir'])
    expect(score).toBe(0)
    expect(matched).toHaveLength(0)
  })


  it('partial match — 3 von 7 required', () => {
    const { score } = computeMatch(['Vue.js', 'Git', 'TypeScript'])
    expect(score).toBe(34)
  })

  it('case insensitive', () => {
    const { matched } = computeMatch(['vue.js', 'typescript', 'git'])
    expect(matched).toHaveLength(3)
  })

  // "vue" => "Vue.js"
  it('fuzzy match works both ways', () => {
    const { matched } = computeMatch(['vue', 'nuxt'])
    expect(matched).toContain('Vue.js')
    expect(matched).toContain('Nuxt')
  })

  it('nice-to-have geben bonus aber weniger als required', () => {
    const onlyNice = computeMatch([...niceToHave])
    const onlyReq = computeMatch([...required])
    // nice allein = 20%, required allein = 80%
    expect(onlyNice.score).toBe(20)
    expect(onlyReq.score).toBe(80)
  })

  it('nice-to-have werden separat getrackt', () => {
    const { matchedNice } = computeMatch(['Figma', 'Docker'])
    expect(matchedNice).toContain('Figma')
    expect(matchedNice).toContain('Docker')
  })

  it('empty array = 0%', () => {
    const { score } = computeMatch([])
    expect(score).toBe(0)
  })
})

describe('multi-profile', () => {
  it('fullstack profil hat andere required skills', () => {
    const { score } = computeMatch(['Vue.js', 'Node.js', 'TypeScript'], 'fullstack')
    expect(score).toBe(34)
  })

  it('gleiche skills, anderer score je nach profil', () => {
    const skills = ['Vue.js', 'TypeScript', 'Figma']
    const frontend = computeMatch(skills, 'frontend')
    const ux = computeMatch(skills, 'ux')
    expect(ux.score).toBeGreaterThan(frontend.score)
  })
})

describe('getAllSkills', () => {
  it('gibt required + nice-to-have zurück', () => {
    const all = getAllSkills('frontend')
    expect(all).toContain('Vue.js')
    expect(all).toContain('Figma')
    expect(all.length).toBe(required.length + niceToHave.length)
  })
})
