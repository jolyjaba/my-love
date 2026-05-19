<template>
  <div class="welcome-screen">
    <div class="envelope-wrapper">

      <div class="envelope" :class="{ 'is-open': isOpen }" @click="openEnvelope">
        <div class="envelope-back"></div>

        <div class="letter">
          <div class="letter-content">
            <span class="heart-emoji animated-heart">❤️</span>
            <p class="letter-text">Для моей Іңкәр</p>
          </div>
        </div>

        <div class="envelope-front"></div>

        <div class="envelope-flap">
          <div class="wax-seal">
            <i class="fa-solid fa-heart pulse-heart"></i>
          </div>
        </div>
      </div>

      <span class="hint" :class="{ 'fade-out': isOpen }">
        (нажми на конверт)
      </span>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['enter'])
const isOpen = ref(false)

const openEnvelope = () => {
  if (isOpen.value) return // Блокируем повторные клики

  isOpen.value = true // Запускаем CSS анимацию открытия

  // Даем 3 секунды: 1.5 сек на саму анимацию + 1.5 сек чтобы успеть прочитать
  setTimeout(() => {
    emit('enter')
  }, 3000)
}
</script>

