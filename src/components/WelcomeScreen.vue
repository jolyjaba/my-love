<template>
  <div class="welcome-screen" @click="$emit('enter')">
    <div class="envelope pulse-heart">❤️</div>
    <p>Для моей Іңкәр</p>
    <span class="hint">(нажми, чтобы открыть)</span>
  </div>
</template>

<script setup lang="ts">
defineEmits(['enter'])
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

/* Стартовый экран */
.welcome-screen {
  position: fixed;
  inset: 0;
  background-color: $deep-wine;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  cursor: pointer;
  color: $gold;
  font-family: $font-heading;

  p {
    font-size: 2.5rem;
    margin: 20px 0 5px;
    text-align: center;
  }

  .hint {
    font-size: 1rem;
    font-family: $font-text;
    opacity: 0.7;
  }
}

.pulse-heart {
  font-size: 5rem;
  animation: pulse 1.5s infinite;
}
</style>
