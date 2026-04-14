<template>
  <main class="max-w-6xl mx-auto px-6 py-12">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- kandidat -->
      <section class="bg-surface border border-border rounded-md p-6">
        <h2 class="font-mono text-sm text-muted mb-4 uppercase tracking-wider">Deine Skills</h2>
        <p class="text-muted text-sm">Skill-Eingabe kommt hier hin</p>
      </section>

      <!-- job profil -->
      <section class="bg-surface border border-border rounded-md p-6">
        <h2 class="font-mono text-sm text-muted mb-4 uppercase tracking-wider">Job Profile</h2>
        <p class="text-muted text-sm">Anforderungen kommen hier hin</p>
      </section>
    </div>

    <!-- match ring  -->
    <div class="flex justify-center mt-12">
      <div class="w-[200px] h-[200px] rounded-full border border-border flex items-center justify-center">
        <span class="font-mono text-2xl text-muted">0%</span>
      </div>
    </div>
  </main>
</template>
