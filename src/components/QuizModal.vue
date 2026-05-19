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

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

/* Модальное окно Квиза */
.quiz-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(5px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.quiz-modal-box {
  background: $cream;
  border: 2px solid $gold;
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  position: relative;
  box-shadow: 0 25px 50px rgba(0,0,0,0.5);

  .close-btn {
    position: absolute;
    top: 15px;
    right: 20px;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: $deep-wine;
    cursor: pointer;
  }

  h3 { color: $gold; font-family: $font-heading; margin-top: 0; }
  .question-text { font-size: 1.3rem; color: $deep-wine; margin-bottom: 30px; font-weight: 500; }
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.option-btn {
  background: white;
  border: 1px solid rgba($pom-red, 0.3);
  padding: 15px;
  border-radius: 10px;
  font-family: $font-text;
  font-size: 1rem;
  color: $deep-wine;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: $pom-red;
    color: white;
    transform: scale(1.02);
  }
}

.error-msg {
  color: $pom-red;
  margin-top: 20px;
  font-weight: 500;
}

/* Анимация при ошибке (тряска) */
.wobble-animation {
  animation: wobble 0.5s ease-in-out;
}
</style>
