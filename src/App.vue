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

