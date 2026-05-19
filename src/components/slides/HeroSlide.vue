<template>
  <div class="slide-content text-center">
    <h1 class="title">Іңкәр, навсегда в моем сердце</h1>
    <p class="subtitle">Наша история, написанная в гранатовых тонах.</p>
  </div>
</template>

<script setup lang="ts">
// Здесь пока нет сложной логики, просто шаблон
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.title {
  color: white;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);
}

.subtitle {
  color: $cream;
}
</style>
