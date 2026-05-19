import { ref, onMounted, onUnmounted } from 'vue'
import dayjs from 'dayjs'

export function useTimer(startDateString: string) {
  // Парсим нашу стартовую дату один раз
  const startDate = dayjs(startDateString)

  // Реактивный объект, который будет выводиться в шаблоне
  const timeTogether = ref({
    days: 0,
    hours: 0,
    minutes: 0
  })

  let intervalId: ReturnType<typeof setInterval>

  const updateTimer = () => {
    const now = dayjs()
    
    // Day.js сам идеально считает разницу с учетом календаря
    // А с помощью остатка от деления (%) мы забираем только "хвосты"
    timeTogether.value = {
      days: now.diff(startDate, 'day'),
      hours: now.diff(startDate, 'hour') % 24,
      minutes: now.diff(startDate, 'minute') % 60
    }
  }

  onMounted(() => {
    updateTimer() // Запускаем сразу при загрузке компонента
    
    // Обновляем таймер каждую минуту (60000 миллисекунд)
    intervalId = setInterval(updateTimer, 60000)
  })

  // Очень важно очищать интервал при уходе со страницы, чтобы не засорять память
  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
  })

  return {
    timeTogether
  }
}
