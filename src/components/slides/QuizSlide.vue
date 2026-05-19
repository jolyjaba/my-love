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

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.slide-content {
  max-width: 1000px;
  width: 100%;
  z-index: 2;
  padding: 0 15px;
  padding-bottom: 40px;
  /* Безопасная зона для точек пагинации */
  box-sizing: border-box;
  max-height: 100%;
  overflow-y: auto;
  /* Позволяет скроллить контент внутри слайда, если экран совсем крошечный */

  /* Скрываем скроллбар для эстетики */
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Настройки для слайда с галереей, чтобы он скроллился, если экран маленький */
.slide-scrollable {
  align-items: flex-start;
  padding-top: 80px;
}

/* Сетка Квиза */
.quiz-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 25px;
  padding-bottom: 50px;
}

.quiz-card {
  position: relative;
  aspect-ratio: 4/5;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.5s ease;
    filter: blur(15px) grayscale(50%);
    /* Блюр по умолчанию */
  }

  &.is-unlocked {
    box-shadow: 0 15px 30px rgba($pom-red, 0.3);
    cursor: default;

    img {
      filter: blur(0) grayscale(0);
    }
  }

  &:hover:not(.is-unlocked) {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
}

.locked-state {
  position: absolute;
  inset: 0;
  background: rgba($deep-wine, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: $font-heading;
  font-size: 1.5rem;

  .lock-icon {
    font-size: 3rem;
    margin-bottom: 10px;
  }
}

.unlocked-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(transparent, rgba($deep-wine, 0.9));
  color: $gold;
  padding: 30px 15px 15px;
  font-family: $font-text;
  font-size: 0.9rem;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.quiz-card.is-unlocked:hover .unlocked-caption {
  opacity: 1;
}

@keyframes wobble {

  0%,
  100% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-10px);
  }

  75% {
    transform: translateX(10px);
  }
}

@media (max-width: 600px) {
  .quiz-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .quiz-modal-box {
    padding: 30px 20px;
  }

  .option-btn {
    padding: 12px;
    font-size: 0.9rem;
  }
}
</style>
