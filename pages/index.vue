<script setup>
import { requiredSkills, niceToHaveSkills, computeMatch } from '~/composables/useSkillMatch'


const skills = ref([])

const result = computed(() => computeMatch(skills.value))

// job-profil seiten-> welche required skills hat der kandidat
const isReqMatched = (skill) => result.value.matched
  .some(m => m.toLowerCase() === skill.toLowerCase())

</script>

<template>
  <main class="max-w-6xl mx-auto px-6 py-12">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- kandidat -->
      <section class="bg-surface border border-border rounded-md p-6">
        <h2 class="font-mono text-sm text-muted mb-4 uppercase tracking-wider">Deine Skills</h2>
        <SkillInput v-model="skills" :matched="result.matched" />
      </section>

      <!-- job profil -->
      <section class="bg-surface border border-border rounded-md p-6">
        <h2 class="font-mono text-sm text-muted mb-4 uppercase tracking-wider">Job Profile</h2>
        <p class="font-mono text-xs text-muted mb-3"> Frontend Developer @ GapCut</p>

        <div class="mb-4">
          <span class="text-xs text-muted block mb-2">Pflichtig</span>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in requiredSkills"
              :key="skill"
              class="profile-tag"
              :class="{ matched: isReqMatched(skill) }"
            >
              {{ skill }}
            </span>
          </div>
        </div>

        <div>
          <span class="text-xs text-muted block mb-2">Nice to have</span>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in niceToHaveSkills"
              :key="skill"
              class="profile-tag muted"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </section>
    </div>

    <!-- match ring -->
    <div class="flex justify-center mt-12">
      <MatchRing :score="result.score" />
    </div>

    <!-- footer -->
    <footer class="text-center mt-16 pb-8">
      <p class="text-xs text-muted">Built with Nuxt </p>
    </footer>
  </main>
</template>

<style scoped>
.profile-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  font-family: var(--font-mono);
  
  background: #1e1e1e;
  border: 1px solid #2a2a2a;
  border-radius: 9999px;
  color: #f0f0f0;
  transition: all 0.2s;
}
.profile-tag.matched {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.profile-tag.muted {
  color: #666;
  border-color: #1e1e1e;
}
</style>
