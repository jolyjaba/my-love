<template>
  <div class="slide-content text-center">
    <h2 class="section-title">Каждая секунда с тобой</h2>
    <div class="counter">
      <div class="time-block">
        <span class="number">{{ timeTogether.days }}</span>
        <span class="label">дней</span>
      </div>
      <div class="time-block">
        <span class="number">{{ timeTogether.hours }}</span>
        <span class="label">часов</span>
      </div>
      <div class="time-block">
        <span class="number">{{ timeTogether.minutes }}</span>
        <span class="label">минут</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTimer } from '@/composables/useTimer'

// Подключаем логику. Дата передается прямо здесь
const { timeTogether } = useTimer('2025-11-09T00:00:00')
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.text-center {
  text-align: center;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  color: $gold;
  margin-bottom: 40px;
  font-family: $font-heading;
  font-weight: 600;
  line-height: 1.2;
}

.counter {
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
  /* Позволяет блокам переноситься на маленьких экранах */

  .time-block {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(212, 175, 55, 0.3);
    padding: 30px 20px;
    border-radius: 20px;
    min-width: 140px;
    backdrop-filter: blur(5px);
    /* Эффект стекла */

    .number {
      display: block;
      font-size: clamp(2.5rem, 5vw, 4rem);
      color: $gold;
      font-family: $font-heading;
      font-weight: 700;
      line-height: 1;
    }

    .label {
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-top: 8px;
      display: block;
      color: $cream;
      font-family: $font-text;
    }
  }
}

/* Мобильная адаптация только для этого слайда */
@media (max-width: 768px) {
  .counter {
    gap: 15px;

    .time-block {
      flex: 1 1 40%;
      /* Блоки делят пространство, чтобы поместиться в 2 колонки */
      padding: 20px 10px;
      min-width: auto;
    }
  }
}
</style>
