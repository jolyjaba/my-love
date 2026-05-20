<template>
  <div class="quiz-slide-wrapper">
    <div class="slide-content text-center">
      
      <h2 class="section-title">Вопрос {{ item.id }}</h2>
      
      <p class="subtitle hint-text" v-if="!item.unlocked">
        Ответь правильно, чтобы разблокировать свайп дальше.
      </p>
      <p class="subtitle success-text" v-else>
        Верно! Теперь можешь свайпать дальше →
      </p>

      <div class="active-card-container">
        <div 
          class="quiz-card single-card"
          :class="{ 'is-unlocked': item.unlocked }"
          @click="openQuiz(item)"
        >
          <img :src="item.url" alt="Воспоминание">
          
          <div v-if="!item.unlocked" class="locked-state">
            <div class="lock-icon animated-lock">🔒</div>
          </div>
          
          <div v-else class="unlocked-caption">
            {{ item.caption }}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuiz, type QuizItem } from '@/composables/useQuiz'

// Принимаем объект конкретного вопроса из родительского цикла
const props = defineProps<{
  item: QuizItem
}>()

const { openQuiz } = useQuiz()
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/modules/mixins' as *;

.quiz-slide-wrapper {
  width: 100%;
  height: 100%;
  @include flex-center(column, center, center);
  background: transparent;
}

.slide-content {
  width: 100%;
  max-width: 500px;
  padding: 40px 20px;
}

.hint-text {
  color: rgba(255, 255, 255, 0.7);
}

.success-text {
  color: $gold;
  animation: pulse-text 1.5s infinite;
}

.active-card-container {
  display: flex;
  justify-content: center;
}

.single-card {
  @extend %card-base;
  width: 100%;
  max-width: 320px;
  border: 2px solid rgba($gold, 0.3);
  background: $bg-dark;

  &:hover {
    transform: translateY(-5px);
    border-color: $gold;
  }

  &.is-unlocked {
    border-color: $gold;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.2;
    @include transition(opacity, 0.5s, ease);
  }

  &.is-unlocked img {
    opacity: 1;
  }
}

.locked-state,
.unlocked-caption {
  position: absolute;
  inset: 0;
  @include flex-center(column, center, center);
  padding: 20px;
}

.locked-state {
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow: inset 0 0 0 1px rgba($white, 0.05);
  color: $gold;
  overflow: hidden;

  .lock-icon {
    font-size: 3.5rem;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
  }
}

.unlocked-caption {
  background: linear-gradient(to top, rgba($deep-wine, 0.95) 0%, rgba($black, 0) 100%);
  color: $white;
  justify-content: flex-end;
  text-align: center;
  font-family: $font-text;
  font-size: 1.1rem;
  font-weight: 500;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}

@keyframes pulse-text {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
}

.animated-lock {
  @include transition(transform, 0.3s, ease);
}

.single-card:hover .animated-lock {
  transform: scale(1.1);
}

@media (max-width: $bp-sm) {
  .section-title {
    font-size: 2rem;
  }

  .single-card {
    max-width: 280px;
  }
}
</style>
