<template>
  <div>
    <transition name="modal-fade">
      <div v-if="activeQuiz" class="quiz-modal-overlay" @click.self="closeQuiz">
        <div class="quiz-modal-box">
          <button class="close-btn" @click="closeQuiz">✕</button>
          <h3>Вопрос {{ activeQuiz.id }}</h3>
          <p class="question-text">{{ activeQuiz.question }}</p>

          <div class="options-list">
            <button v-for="(option, index) in activeQuiz.options" :key="index" class="option-btn"
              @click="answerQuestion(index)">
              {{ option }}
            </button>
          </div>

          <p v-if="showQuizError" class="error-msg wobble-animation">
            Ой, кажется, кто-то забыл! Попробуй еще раз ❤️
          </p>
        </div>
      </div>
    </transition>

    <transition name="modal-fade">
      <div v-if="enlargedQuizItem" class="quiz-modal-overlay lightbox" @click.self="closeEnlargedPhoto">
        <div class="lightbox-content">
          <button class="lightbox-close-btn" @click="closeEnlargedPhoto">✕</button>
          
          <img :src="enlargedQuizItem.url" alt="Воспоминание">
          
          <p class="lightbox-caption">{{ enlargedQuizItem.caption }}</p>

          <a 
            v-if="enlargedQuizItem.pdfUrl" 
            :href="enlargedQuizItem.pdfUrl" 
            target="_blank" 
            class="download-ticket-btn"
          >
            Открыть настоящий билет 📥
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useQuiz } from '@/composables/useQuiz'

// Достаем новые данные и функции из стора
const {
  activeQuiz,
  enlargedQuizItem,
  showQuizError,
  answerQuestion,
  closeQuiz,
  closeEnlargedPhoto
} = useQuiz()
</script>
