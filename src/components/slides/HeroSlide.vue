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

.text-center {
  text-align: center;
}

.title {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-family: $font-heading;
  font-style: italic;
  font-weight: 700;
  margin-bottom: 15px;
  line-height: 1.1;
  color: white;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);
  /* Тень для читаемости на фото */
}

.subtitle {
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  font-family: $font-text;
  opacity: 0.9;
  color: $cream;
}
</style>
