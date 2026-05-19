<template>
  <div class="pomegranate-theme">
    <transition name="modal-fade">
      <WelcomeScreen v-if="!isEntered" @enter="handleEnter" />
    </transition>
    <audio ref="bgMusic" loop>
      <source src="/audio/Jigsaw_Falling_into_Place.flac" type="audio/flac">
    </audio>
    <main v-if="isEntered" class="animated-reveal presentation-wrapper">
      <swiper :modules="modules" effect="fade" :pagination="{ clickable: true }" :navigation="true" :speed="1000"
        class="my-swiper">
        <swiper-slide class="slide bg-hero">
          <HeroSlide />
        </swiper-slide>
        <swiper-slide class="slide bg-dark">
          <CounterSlide />
        </swiper-slide>
        <swiper-slide class="slide bg-cream slide-scrollable">
          <QuizSlide />
        </swiper-slide>
      </swiper>
    </main>
    <QuizModal />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
// Импорт Swiper и его стилей
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectFade, Pagination, Navigation, Keyboard } from 'swiper/modules'
import { useQuiz } from '@/composables/useQuiz'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import QuizModal from '@/components/QuizModal.vue'
import WelcomeScreen from '@/components/WelcomeScreen.vue'
import QuizSlide from '@/components/slides/QuizSlide.vue'
import HeroSlide from '@/components/slides/HeroSlide.vue'
import CounterSlide from '@/components/slides/CounterSlide.vue'

// Регистрируем модули для компонента Swiper
const modules = [EffectFade, Pagination, Navigation, Keyboard]

const isEntered = ref(false)
const bgMusic = useTemplateRef('bgMusic')

const { loadProgress } = useQuiz()

onMounted(() => {
  loadProgress() // Загружаем прогресс квиза при загрузке приложения
})

const handleEnter = () => {
  isEntered.value = true
  if (bgMusic.value) {
    bgMusic.value.volume = 0.4
    bgMusic.value.play().catch(e => console.log("Audio play blocked", e))
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

/* Swiper Контейнер */
.presentation-wrapper {
  height: 100dvh;
  /* Используем dvh для корректной работы на iOS (учитывает панель адреса) */
  width: 100vw;
  background: $cream;
}

.my-swiper {
  width: 100%;
  height: 100%;

  :deep(.swiper-pagination-bullet) {
    background: $gold;
    opacity: 0.5;
    width: 10px;
    height: 10px;
  }

  :deep(.swiper-pagination-bullet-active) {
    opacity: 1;
  }

  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    color: $gold;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }
}

/* Общие стили слайдов */
.slide {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

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

/* Цветовые темы слайдов */
.bg-hero {
  background: linear-gradient(rgba($deep-wine, 0.7), rgba($deep-wine, 0.7)),
    url('https://images.unsplash.com/photo-1530103862676-fa396657176c?q=80&w=2070') center/cover;
  color: white;
}

.bg-dark {
  background-color: $deep-wine;
  color: $cream;
}

.bg-cream {
  background-color: $cream;
  color: $deep-wine;
}

/* Типографика */
.text-center {
  text-align: center;
}

.title {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-style: italic;
  margin-bottom: 10px;
  line-height: 1.1;
}

.subtitle {
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  opacity: 0.9;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  color: $gold;
  margin-bottom: 30px;
  font-family: $font-heading;
  line-height: 1.2;
}

.bg-cream .section-title {
  color: $pom-red;
}

.final-text {
  font-family: $font-heading;
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-style: italic;
}

/* Две колонки (Текст + Фото) */
.two-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
}

.image-wrapper {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 15px 15px 0 $gold;

  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    display: block;
  }
}

/* Счетчик */
.counter {
  display: flex;
  gap: 30px;
  justify-content: center;

  .time-block {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(212, 175, 55, 0.3);
    padding: 30px 20px;
    border-radius: 20px;
    min-width: 120px;

    .number {
      display: block;
      font-size: clamp(2.5rem, 5vw, 4rem);
      color: $gold;
      font-family: $font-heading;
      line-height: 1;
    }

    .label {
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-top: 5px;
      display: block;
    }
  }
}

/* Галерея */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  .photo-item {
    border-radius: 15px;
    overflow: hidden;
    position: relative;
    aspect-ratio: 3/4;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(transparent, rgba($deep-wine, 0.9));
      display: flex;
      align-items: flex-end;
      padding: 15px;
      color: $gold;
      font-family: $font-heading;
      font-size: 1.2rem;
    }
  }
}

.spotify-wrapper {
  max-width: 600px;
  margin: 0 auto 30px;
  box-shadow: 0 15px 35px rgba($pom-red, 0.2);
  border-radius: 12px;
}

/* Анимации */
@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
}

.modal-fade-leave-active {
  transition: opacity 1s ease;
}

.modal-fade-leave-to {
  opacity: 0;
}

.animated-reveal {
  animation: reveal 2s ease forwards;
}

@keyframes reveal {
  from {
    opacity: 0;
    filter: blur(10px);
  }

  to {
    opacity: 1;
    filter: blur(0);
  }
}


/* =========================================
  МОБИЛЬНАЯ АДАПТАЦИЯ (Медиа-запросы)
========================================= */
@media (max-width: 768px) {

  /* Убираем стрелки, оставляем только свайп */
  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    display: none !important;
  }

  /* Сжимаем отступы */
  .slide {
    padding: 10px;
  }

  .section-title {
    margin-bottom: 20px;
  }

  /* Счетчик - делаем компактную сетку */
  .counter {
    flex-wrap: wrap;
    gap: 10px;

    .time-block {
      flex: 1 1 45%;
      /* Блоки делят пространство поровну */
      padding: 15px 10px;
      min-width: auto;
    }
  }

  /* Две колонки превращаем в одну */
  .two-columns {
    grid-template-columns: 1fr;
    gap: 25px;
    text-align: center;
  }

  /* Уменьшаем фото в текстовом слайде */
  .image-wrapper {
    box-shadow: 8px 8px 0 $gold;

    img {
      height: 250px;
    }
  }

  /* Галерея: Плиточный дизайн (2 сверху, 1 снизу на всю ширину) */
  .photo-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;

    .photo-item {
      aspect-ratio: 1 / 1;
      /* Делаем квадратами, чтобы влезли по высоте */

      &:last-child {
        grid-column: span 2;
        /* Последнее фото растягиваем на всю ширину */
        aspect-ratio: 2 / 1;
        /* Делаем его прямоугольным */
      }
    }
  }
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

/* Модальное окно Квиза */
.quiz-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
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
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);

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

  h3 {
    color: $gold;
    font-family: $font-heading;
    margin-top: 0;
  }

  .question-text {
    font-size: 1.3rem;
    color: $deep-wine;
    margin-bottom: 30px;
    font-weight: 500;
  }
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
