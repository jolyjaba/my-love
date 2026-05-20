<template>
  <div id="app-root">
    
    <audio id="bg-music" loop>
      <source src="/audio/Jigsaw_Falling_into_Place.flac" type="audio/flac" />
    </audio>

    <transition name="fade">
      <WelcomeScreen v-if="!isEntered" @enter="startApp" />
    </transition>

    <div v-if="isEntered" class="presentation-wrapper">
      
      <vue-particles
        id="global-particles"
        :options="particlesOptions"
        class="global-particles-layer"
      />

      <QuizModal />

      <swiper 
        :modules="[Navigation, Pagination]"
        :navigation="true"
        :pagination="{ clickable: true, dynamicBullets: true }"
        :allow-slide-next="canSwipeNext" 
        :allow-slide-prev="true"
        :speed="600"
        @slideChange="onSlideChange"
        class="main-swiper"
        :class="{ 'is-next-locked': !canSwipeNext }"
      >
        
        <swiper-slide><HeroSlide /></swiper-slide>
        <swiper-slide><CounterSlide /></swiper-slide>

        <swiper-slide v-for="item in quizItems" :key="item.id">
          <QuizSlide :item="item" />
        </swiper-slide>

      </swiper>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Компоненты
import WelcomeScreen from '@/components/WelcomeScreen.vue'
import QuizModal from '@/components/QuizModal.vue'
import HeroSlide from '@/components/slides/HeroSlide.vue'
import CounterSlide from '@/components/slides/CounterSlide.vue'
import QuizSlide from '@/components/slides/QuizSlide.vue'

// Логика квиза и типы
import { useQuiz } from '@/composables/useQuiz'
import type { ISourceOptions } from "@tsparticles/engine"

const { quizItems, loadProgress } = useQuiz()

const isEntered = ref(false)

const startApp = () => {
  isEntered.value = true
  loadProgress() // Загружаем прогресс из localStorage
  
  const audio = document.getElementById('bg-music') as HTMLAudioElement
  if (audio) {
    audio.volume = 0.5
    audio.play().catch(e => console.log('Автоплей заблокирован браузером', e))
  }
}

// === УПРАВЛЕНИЕ СВАЙПОМ (Блокировка квеста) ===
const currentSwiperIndex = ref(0)
const QUIZ_SLIDES_OFFSET = 2 // Количество слайдов ДО начала квиза (Hero + Counter)

const onSlideChange = (swiper: any) => {
  currentSwiperIndex.value = swiper.activeIndex
}

const canSwipeNext = computed(() => {
  const currentQuizIndex = currentSwiperIndex.value - QUIZ_SLIDES_OFFSET
  
  if (currentQuizIndex < 0) return true // Разрешаем свайп на интро-слайдах
  if (currentQuizIndex >= quizItems.value.length) return true // Квиз пройден
  
  return quizItems.value[currentQuizIndex]?.unlocked // Свайп только если вопрос решен
})

const particlesOptions: ISourceOptions = {
  background: { color: { value: "transparent" } },
  fpsLimit: 120,
  interactivity: {
    detectsOn: "window",
    events: {
      onHover: { enable: true, mode: "repel" },
    },
    modes: { repel: { distance: 100, duration: 0.4 } },
  },
  particles: {
    color: { value: "#D4AF37" },
    move: {
      direction: "top",
      enable: true,
      outModes: { default: "out" },
      random: true,
      speed: { min: 1, max: 3 },
      straight: false,
    },
    number: { density: { enable: true, width: 800 }, value: 80 },
    opacity: {
      value: { min: 0.1, max: 0.8 }, // <-- Движок возьмет min и max отсюда
      animation: { enable: true, speed: 3, sync: false } // Убрали minimumValue
    },
    shape: { type: "circle" },
    size: {
      value: { min: 1, max: 3 }, // <-- И отсюда
      animation: { enable: true, speed: 5, sync: false } // Убрали minimumValue
    },
    wobble: { enable: true, distance: 5, speed: 10 }
  },
  detectRetina: true,
}
</script>

