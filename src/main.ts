import 'unfonts.css'
import { createApp } from 'vue'
import App from '@/App.vue'
import '@/assets/scss/main.scss'

// 1. Импортируем компоненты Particles
import Particles from "@tsparticles/vue3"
import { loadSlim } from "@tsparticles/slim"

const app = createApp(App)

// 2. Регистрируем плагин
app.use(Particles, {
  init: async (engine) => {
    // Загружаем только необходимые функции (slim), чтобы сайт летал
    await loadSlim(engine);
  },
});

app.mount('#app')
