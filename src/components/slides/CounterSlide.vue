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

