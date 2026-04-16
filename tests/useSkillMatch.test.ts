import { describe, it, expect } from 'vitest'
import { computeMatch, requiredSkills, niceToHaveSkills } from '../composables/useSkillMatch'

describe('computeMatch', () => {
  it('scores 100% when all required skills match', () => {
    const { score, missing } = computeMatch([...requiredSkills])
    expect(score).toBe(100)
    expect(missing).toHaveLength(0)
  })

  it('scores 0% with no overlap', () => {
    const { score, matched } = computeMatch(['Python', 'Ruby', 'Elixir'])
    expect(score).toBe(0)
    expect(matched).toHaveLength(0)
  })

  it('partial match — 3 von 7', () => {
    const { score } = computeMatch(['Vue.js', 'Git', 'TypeScript'])
    expect(score).toBe(43) 
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

  it('nice-to-have skills ändern den score nicht', () => {
    const without = computeMatch([])
    const withNice = computeMatch([...niceToHaveSkills])
    expect(withNice.score).toBe(without.score)
  })

  it('empty array = 0%', () => {
    const { score } = computeMatch([])
    expect(score).toBe(0)
  })
})
