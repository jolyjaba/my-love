<template>
  <transition name="modal-fade">
    <div v-if="activeQuiz" class="quiz-modal-overlay">
      <div class="quiz-modal-box">
        <button class="close-btn" @click="closeQuiz">✕</button>
        <h3>Вопрос {{ activeQuiz.id }}</h3>
        <p class="question-text">{{ activeQuiz.question }}</p>
        
        <div class="options-list">
          <button 
            v-for="(option, index) in activeQuiz.options" 
            :key="index"
            class="option-btn"
            @click="answerQuestion(index)"
          >
            {{ option }}
          </button>
        </div>

        <p v-if="showQuizError" class="error-msg wobble-animation">
          Ой, кажется, кто-то забыл! Попробуй еще раз ❤️
        </p>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useQuiz } from '@/composables/useQuiz'
const { activeQuiz, showQuizError, answerQuestion, closeQuiz } = useQuiz()
</script>

