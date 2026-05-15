<template>
  <div class="pomegranate-theme">
    <transition name="modal-fade">
      <div v-if="isModalVisible" class="modal-overlay">
        <div class="surprise-box" @click="handleOpenSurprise">
          <div class="envelope" :class="{ 'is-open': isOpen }">
            <div class="heart">❤️</div>
            <div class="letter">
              <p>Для моей Іңкәр</p>
              <span>(нажми, чтобы открыть)</span>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <audio ref="bgMusic" loop>
      <source src="/audio/Jigsaw_Falling_into_Place.flac" type="audio/flac">
    </audio>

    <header class="hero">
      <div class="hero-content">
        <h1 class="title">Іңкәр, навсегда в моем сердце</h1>
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
    </header>

    <section class="gallery">
      <div class="container">
        <h2 class="section-title">Гранатовые моменты</h2>
        <div class="photo-grid">
          <div v-for="(photo, i) in photos" :key="i" class="photo-item">
            <img :src="photo.url" :alt="'Moment ' + i">
            <div class="overlay">
              <span>{{ photo.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>С любовью, специально для тебя ❤️</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { useTimer } from '@/composables/useTimer'

const { timeTogether } = useTimer('2025-11-09T00:00:00')

const isModalVisible = ref(true)
const isOpen = ref(false)
const bgMusic = useTemplateRef('bgMusic')

const handleOpenSurprise = () => {
  isOpen.value = true
  
  // Небольшая задержка перед закрытием окна, чтобы успела проиграться анимация
  setTimeout(() => {
    isModalVisible.value = false
    
    // Запуск музыки
    if (bgMusic.value) {
      bgMusic.value.volume = 0.4
      bgMusic.value.play()
    }
  }, 800) 
}

const photos = ref([
  { url: 'https://via.placeholder.com/600x600/7B1113/FFFFFF?text=Photo+1', date: 'Лето 2023' },
  { url: 'https://via.placeholder.com/600x800/4A0E0E/FFFFFF?text=Photo+2', date: 'Осень 2023' },
  { url: 'https://via.placeholder.com/800x600/D4AF37/000000?text=Photo+3', date: 'Зима 2024' },
  { url: 'https://via.placeholder.com/600x600/7B1113/FFFFFF?text=Photo+4', date: 'Весна 2024' },
])
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: $deep-wine; // Глубокий гранатовый фон
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  cursor: pointer;
}


.surprise-box {
  text-align: center;
  
  .envelope {
    width: 200px;
    height: 150px;
    background: $cream;
    border-radius: 0 0 10px 10px;
    position: relative;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    transition: transform 0.5s ease;

    // Треугольник (крышка) конверта
    &::before {
      content: '';
      position: absolute;
      top: -100px;
      left: 0;
      border-left: 100px solid transparent;
      border-right: 100px solid transparent;
      border-bottom: 100px solid $cream;
      transition: transform 0.5s ease;
      transform-origin: bottom;
    }

    &.is-open {
      transform: translateY(20px);
      &::before {
        transform: rotateX(180deg) translateY(10px);
      }
    }
  }

  .heart {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 3rem;
    z-index: 2;
    animation: pulse 1.5s infinite;
  }

  .letter {
    padding: 20px;
    color: $deep-wine;
    font-family: $font-heading;
    
    p { font-size: 1.2rem; margin-bottom: 5px; font-weight: bold; }
    span { font-size: 0.8rem; font-family: $font-text; opacity: 0.7; }
  }
}

// Плавное появление основного контента
.animated-reveal {
  animation: reveal 1.5s ease-out forwards;
}

@keyframes reveal {
  from { opacity: 0; transform: scale(1.05); filter: blur(10px); }
  to { opacity: 1; transform: scale(1); filter: blur(0); }
}

@keyframes pulse {
  0%, 100% { transform: translateX(-50%) scale(1); }
  50% { transform: translateX(-50%) scale(1.2); }
}

// Анимация исчезновения модалки
.modal-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.modal-fade-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero Section */
.hero {
  height: 90vh;
  // Используем переменную $deep-wine для затемнения фона
  background: linear-gradient(rgba($deep-wine, 0.7), rgba($deep-wine, 0.7)), 
              url('https://images.unsplash.com/photo-1530103862676-fa396657176c?q=80&w=2070') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  clip-path: ellipse(150% 100% at 50% 0%);

  .title {
    font-size: clamp(2.5rem, 8vw, 4.5rem);
    margin-bottom: 2rem;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
    font-style: italic;
  }
}

/* Counter */
.counter {
  display: flex;
  gap: 20px;
  justify-content: center;

  .time-block {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 15px 25px;
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    min-width: 80px;

    .number {
      display: block;
      font-size: 2rem;
      color: $gold; // Используем золотой акцент
    }

    .label {
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }
}

/* Sections Global Layout */
.music-section, .gallery {
  padding: 80px 0;
  
  .section-title {
    text-align: center;
    font-size: 2.5rem;
    color: $pom-red;
    margin-bottom: 40px;
  }
}

.music-section {
  background: white;
  
  .spotify-wrapper {
    max-width: 600px;
    margin: 0 auto;
    // Динамическая тень цвета граната
    box-shadow: 0 15px 35px rgba($pom-red, 0.15);
    border-radius: 12px;
    
    iframe {
      border-radius: 12px;
    }
  }
}

/* Photo Gallery */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding-bottom: 80px;

  .photo-item {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    aspect-ratio: 4/5;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .overlay {
      position: absolute;
      inset: 0;
      // Градиент от прозрачного к глубокому винному
      background: linear-gradient(transparent, $deep-wine);
      display: flex;
      align-items: flex-end;
      padding: 20px;
      color: white;
      opacity: 0;
      transition: opacity 0.3s;
    }

    // SCSS вложенность для эффектов при наведении
    &:hover {
      img {
        transform: scale(1.1);
      }
      .overlay {
        opacity: 1;
      }
    }
  }
}

/* Footer */
.footer {
  text-align: center;
  padding: 40px;
  background: $deep-wine;
  color: $gold;
}

/* Mobile Adjustments */
@media (max-width: 600px) {
  .counter {
    flex-direction: column;
    align-items: center;

    .time-block {
      width: 150px;
    }
  }
  
  .hero {
    clip-path: ellipse(200% 100% at 50% 0%); // Делаем изгиб мягче на мобилках
  }
}
</style>
