<template>
  <div class="slide-content text-center">
    <h2 class="section-title">Вспомнить всё</h2>
    <p class="subtitle" style="margin-bottom: 40px;">Ответь на вопросы, чтобы открыть наши моменты.</p>

    <div class="quiz-grid">
      <div v-for="item in quizItems" :key="item.id" class="quiz-card" :class="{ 'is-unlocked': item.unlocked }"
        @click="openQuiz(item)">
        <img :src="item.url" alt="Фото">

        <div v-if="!item.unlocked" class="locked-state">
          <div class="lock-icon">🔒</div>
          <span>Вопрос {{ item.id }}</span>
        </div>

        <div v-else class="unlocked-caption">
          {{ item.caption }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuiz } from '@/composables/useQuiz'
const { quizItems, openQuiz } = useQuiz()
</script>

