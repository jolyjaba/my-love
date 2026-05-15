<template>
  <div class="pomegranate-theme">
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

    <section class="music-section">
      <div class="container">
        <h2 class="section-title">Наша песня</h2>
        <div class="spotify-wrapper">
          <iframe 
            style="border-radius:12px" 
            src="https://open.spotify.com/embed/track/0YJ9FWWHn9EfnN0lHwbzvV?utm_source=generator&theme=0" 
            width="100%" 
            height="152" 
            frameBorder="0" 
            allowfullscreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy">
          </iframe>
        </div>
      </div>
    </section>

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
import { ref } from 'vue'
import { useTimer } from '@/composables/useTimer'

const { timeTogether } = useTimer('2025-11-09T00:00:00')

const photos = ref([
  { url: 'https://via.placeholder.com/600x600/7B1113/FFFFFF?text=Photo+1', date: 'Лето 2023' },
  { url: 'https://via.placeholder.com/600x800/4A0E0E/FFFFFF?text=Photo+2', date: 'Осень 2023' },
  { url: 'https://via.placeholder.com/800x600/D4AF37/000000?text=Photo+3', date: 'Зима 2024' },
  { url: 'https://via.placeholder.com/600x600/7B1113/FFFFFF?text=Photo+4', date: 'Весна 2024' },
])
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

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
