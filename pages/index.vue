<script setup>
import { jobProfiles, mySkills, computeMatch } from '~/composables/useSkillMatch'

const profileKey = ref('frontend')
const profile = computed(() => jobProfiles[profileKey.value])

// skills aus localStorage laden wenn vorhanden
const skills = ref([])

onMounted(() => {
  const saved = localStorage.getItem('skills')
  if (saved) {
    try { skills.value = JSON.parse(saved) } catch {}
  }
})

// speichern bei änderung
watch(skills, (val) => {
  localStorage.setItem('skills', JSON.stringify(val))
}, { deep: true })

const result = computed(() => computeMatch(skills.value, profileKey.value))

const isReqMatched = (skill) => result.value.matched
  .some(m => m.toLowerCase() === skill.toLowerCase())

// preset laden
function loadMyProfile() {
  skills.value = [...mySkills]
}

const profileOptions = [
  { label: 'Frontend Developer', value: 'frontend' },
  { label: 'Fullstack Developer', value: 'fullstack' },
  { label: 'UX Engineer', value: 'ux' },
]
</script>

<template>
  <main class="max-w-6xl mx-auto px-6 py-12">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- kandidat -->
      <section class="bg-surface border border-border rounded-md p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-mono text-sm text-muted uppercase tracking-wider">Deine Skills</h2>
          <button
            class="text-xs font-mono text-accent hover:underline transition-colors"
            @click="loadMyProfile"
          >
            Robertos Profil laden
          </button>
        </div>
        <SkillInput v-model="skills" :matched="result.matched" />
      </section>

      <!-- job profil -->
      <section class="bg-surface border border-border rounded-md p-6">
        <h2 class="font-mono text-sm text-muted mb-3 uppercase tracking-wider">Job Profile</h2>

        <!-- profil auswahl -->
        <div class="mb-4">
          <USelect
            v-model="profileKey"
            :items="profileOptions"
            size="sm"
            class="w-full"
          />
        </div>

        <div class="mb-4">
          <span class="text-xs text-muted block mb-2">Pflichtig</span>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in profile.required"
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
              v-for="skill in profile.niceToHave"
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

    <!-- missing skills -->
    <div v-if="result.missing.length && skills.length > 0" class="mt-8 max-w-md mx-auto">
      <p class="text-xs text-muted font-mono text-center mb-3">Dir fehlt noch</p>
      <div class="flex flex-wrap justify-center gap-2">
        <span
          v-for="skill in result.missing"
          :key="skill"
          class="missing-tag"
        >
          {{ skill }}
        </span>
      </div>
    </div>

    <!-- footer -->
    <footer class="text-center mt-16 pb-8">
      <p class="text-xs text-muted">Built with Nuxt</p>
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

.missing-tag {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  font-size: 0.75rem;
  font-family: var(--font-mono);
  background: transparent;
  border: 1px dashed #444;
  border-radius: 9999px;
  color: #666;
}
</style>
