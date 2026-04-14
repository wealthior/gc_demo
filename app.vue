<script setup>
useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: '',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap',
    },
  ],
})
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0a] text-[#f0f0f0]">
    
    <header class="border-b border-border px-6 py-4 flex items-center justify-between">
      <div>
        <span class="font-mono text-sm tracking-wide text-accent">GapCut: Skill-Match Demo</span>
      </div>
      <span class="text-xs text-muted"> prototype by Roberto Mazzotta</span>
    </header>

    <NuxtPage />
  </div>
</template>
