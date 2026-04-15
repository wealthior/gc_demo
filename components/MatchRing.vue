<script setup>
import gsap from 'gsap'


const props = defineProps({
  score: { type: Number, default: 0 },
})

const r = 85
const circ = 2 * Math.PI * r
const offset = ref(circ) 
const displayScore = ref(0)

// status label 
const label = computed(() => {
  const s = props.score
  if (s >= 90) return 'Top Match'
  if (s >= 61) return 'Starkes Profil'
  if (s >= 31) return 'Solide Basis'
  return 'wenig Übereinstimmung'
})

function animateTo(val) {
  const target = circ - (val / 100) * circ
  gsap.to(offset, {
    value: target,
    duration: 0.8,
    ease: 'power2.out',
  })
  
  // score zahl mitzählen lassen
  gsap.to(displayScore, {
    value: val,
    duration: 0.8,
    ease: 'power2.out',
    onUpdate: () => {
      displayScore.value = Math.round(displayScore.value)
    },
  })
}

onMounted(() => {
  if (props.score > 0) animateTo(props.score)
})

watch(() => props.score, (val) => {
  animateTo(val)
})
</script>

<template>
  <div class="flex flex-col items-center gap-3">
    <svg width="200" height="200" viewBox="0 0 200 200" class="ring-svg">

      <!-- hintergrund ring -->
      <circle
        cx="100" cy="100" :r="r"
        fill="none"
        stroke="#2a2a2a"
        stroke-width="8"
      />
      <!-- score ring -->
      <circle
        cx="100" cy="100" :r="r"
        fill="none"
        stroke="#e8ff47"
        stroke-width="8"
        stroke-linecap="round"
        :stroke-dasharray="circ"
        :stroke-dashoffset="offset"
      />

      <!-- score zahl -->
      <text
        x="100" y="108"
        text-anchor="middle"
        class="score-text"
      >
        {{ displayScore }}%
      </text>
    </svg>

    <span class="font-mono text-xs text-muted tracking-wide">{{ label }}</span>
  </div>
</template>

<style scoped>
.ring-svg {
  transform: rotate(-90deg);
}

.score-text {
  font-family: var(--font-mono);
  font-size: 2.2rem;
  font-weight: 500;
  fill: #e8ff47;

  transform: rotate(90deg);
  transform-origin: 100px 100px;
}
</style>
