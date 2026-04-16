<script setup>
const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  matched: { type: Array, default: () => [] },
  suggestions: { type: Array, default: () => [] },
})
const emit = defineEmits(['update:modelValue'])

const input = ref('')
const max = 15
const showSuggestions = ref(false)

const isMatched = (skill) => {
  const s = skill.toLowerCase()
  return props.matched.some(m => m.toLowerCase() === s)
}

// filtert vorschläge die noch nicht hinzugefügt sind
const filtered = computed(() => {
  const q = input.value.toLowerCase().trim()
  if (!q) {return []}
  return props.suggestions.filter(s => {
    const already = props.modelValue.some(v => v.toLowerCase() === s.toLowerCase())
    return !already && s.toLowerCase().includes(q)
  })
})

function addSkill(val) {
  const trimmed = val.trim()
  if (!trimmed) {return}
  if (props.modelValue.length >= max) {return}
  if (props.modelValue.some(s => s.toLowerCase() === trimmed.toLowerCase())) {return}

  emit('update:modelValue', [...props.modelValue, trimmed])
  input.value = ''
  showSuggestions.value = false
}

function add() {
  const val = input.value.trim()
  if (!val) { return }

  // wenn suggestions offen sind, ersten vorschlag nehmen
  if (filtered.value.length) {
    addSkill(filtered.value[0])
    return
  }


  const exact = props.suggestions.find(s => s.toLowerCase() === val.toLowerCase())
  if (exact) {
    addSkill(exact)
  }
  // ungültige eingabe skipen
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
  if (e.key === 'Escape') {
    showSuggestions.value = false
  }
}

function onInput() {
  showSuggestions.value = input.value.trim().length > 0
}

function onBlur() {
  setTimeout(() => { showSuggestions.value = false }, 150)
}

const isFull = computed(() => props.modelValue.length >= max)
</script>


<template>
  <div>
    <div class="relative">
      <UInput
        v-model="input"
        :placeholder="isFull ? `Max ${max} Skills erreicht` : 'z.B. Vue.js, TypeScript...'"
        :disabled="isFull"
        size="lg"
        class="mb-3"
        autocomplete="off"
        @keydown="onKeydown"
        @input="onInput"
        @blur="onBlur"
        @focus="onInput"
      />

      <!-- autocomplete -->
      <div
        v-if="showSuggestions && filtered.length"
        class="suggestions"
      >
        <button
          v-for="s in filtered"
          :key="s"
          class="suggestion-item"
          @mousedown.prevent="addSkill(s)"
        >
          {{ s }}
        </button>
      </div>
    </div>

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

.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #1e1e1e;
  border: 1px solid #2a2a2a;
  border-radius: 6px;
  z-index: 10;
  max-height: 160px;
  overflow-y: auto;
}

.suggestion-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.4rem 0.75rem;
  font-size: 0.8rem;
  font-family: var(--font-mono);
  color: #f0f0f0;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 0.1s;
}

.suggestion-item:hover {
  background: #2a2a2a;
  color: var(--color-accent);
}

</style>
