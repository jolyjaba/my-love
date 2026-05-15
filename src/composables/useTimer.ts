import { ref, onMounted, onUnmounted } from 'vue'

export function useTimer(startDateString: string) {
  const startDate = new Date(startDateString)
  
  const timeTogether = ref({ days: 0, hours: 0, minutes: 0 })
  let timerId: ReturnType<typeof setInterval> | null = null

  const updateCounter = () => {
    const now = new Date()
    const diff = now.getTime() - startDate.getTime()
    
    timeTogether.value = {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60)
    }
  }

  onMounted(() => {
    updateCounter()
    timerId = setInterval(updateCounter, 60000)
  })

  onUnmounted(() => {
    if (timerId) clearInterval(timerId)
  })

  return {
    timeTogether
  }
}
