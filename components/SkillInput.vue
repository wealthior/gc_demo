<script setup>
const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  matched: { type: Array, default: () => [] },
})
const emit = defineEmits(['update:modelValue'])

const input = ref('')
const max = 15

const isMatched = (skill) => {
  const s = skill.toLowerCase()
  return props.matched.some(m => m.toLowerCase() === s)
}

function add() {
  const val = input.value.trim()
  if (!val) { return }

  const parts = val.split(',').map(s => s.trim()).filter(Boolean)

  const current = [...props.modelValue]
  for (const p of parts) {
    if (current.length >= max) {
      break
    }
    // duplikat check 
    if (current.some(s => s.toLowerCase() === p.toLowerCase())) { continue }
    current.push(p)
  }

  emit('update:modelValue', current)
  input.value = ''
}

function remove(idx) {
  const updated = props.modelValue.filter((_, i) => i !== idx)
  emit('update:modelValue', updated)
}


function onKeydown(e) {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault()
    add()
  }
}

const isFull = computed(() => props.modelValue.length >= max)
</script>


<template>
  <div>
    <UInput v-model="input" :placeholder="isFull ? `Max ${max} Skills erreicht` : 'z.B. Vue.js, TypeScript...'"
      :disabled="isFull" size="lg" class="mb-3" @keydown="onKeydown" />

    <!-- tags -->
    <div class="flex flex-wrap gap-2">
      <button v-for="(skill, i) in modelValue" :key="skill" class="skill-tag group"
        :class="{ matched: isMatched(skill) }" @click="remove(i)">
        <span>{{ skill }}</span>
        <span class="ml-1.5 text-muted group-hover:text-[#f0f0f0] transition-colors">×</span>
      </button>
    </div>

    <p v-if="isFull" class="text-xs text-muted mt-2">
      Maximum erreicht! Entferne Skills um neue hinzuzufügen
    </p>
  </div>
</template>

<style scoped>


.skill-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  font-family: var(--font-mono);
  background: #1e1e1e;
  border: 1px solid #2a2a2a;
  border-radius: 9999px;
  color: #f0f0f0;
  cursor: pointer;
  transition: border-color 0.15s;
}

.skill-tag:hover {
  border-color: #555;
}

.skill-tag.matched {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
</style>
