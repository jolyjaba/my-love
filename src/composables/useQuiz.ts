import { ref } from 'vue'
import dayjs from 'dayjs'

type QuizItem = {
  id: number
  question: string
  options: (string | number)[]
  correct: number
  url: string
  caption: string
  unlocked: boolean
}

const unofficialStartDate = dayjs('2025-08-29T00:00:00')
const officialStartDate = dayjs('2025-11-09T00:00:00')
const unofficialSaysTogether = dayjs().diff(unofficialStartDate, 'day')
const officialSaysTogether = dayjs().diff(officialStartDate, 'day')

// Глобальный стейт, объявленный вне функции, чтобы все компоненты видели одни и те же данные
const activeQuiz = ref<QuizItem | null>(null)
const showQuizError = ref(false)
const enlargedQuizItem = ref<QuizItem | null>(null)

const quizItems = ref<QuizItem[]>([
  {
    id: 1,
    question: 'В каком месяце началась наша история?',
    options: ['Июль', 'Август', 'Июнь'],
    correct: 1,
    url: '/pictures/IMG_E7875.avif',
    caption: 'Тот самый август, который изменил всё ❤️‍🔥',
    unlocked: false
  },
  {
    id: 2,
    question: 'Какой трек ты слушаешь чаще всего?',
    options: ['Dracula - Tame Impala', 'Jigsaw Falling Into Place - Radiohead', 'Я так соскучился - Порнофильмы'],
    correct: 1,
    url: '/pictures/IMG_8138.avif',
    caption: 'Трек, под который я влюблялся в тебя всё сильнее 🎶',
    unlocked: false
  },
  {
    id: 3,
    question: 'На какую камеру мы делаем наши самые атмосферные физические снимки?',
    options: ['Старый Polaroid', 'Fujifilm Instax Mini Evo', 'IPhone'],
    correct: 1,
    url: '/pictures/IMG_8900.avif',
    caption: 'Наши самые уютные моменты, которые можно подержать в руках 🎞️',
    unlocked: false
  },
  {
    id: 4,
    question: 'Где мы планируем быть в будущем?',
    options: ['На Бали', 'На Мальдивах', 'В Таиланде'],
    correct: 2, 
    url: '/pictures/IMG_8317.avif',
    caption: 'Впереди еще столько закатов только для нас двоих 🌴',
    unlocked: false
  },
  {
    id: 5,
    question: 'Кто первый сказал «Я тебя люблю»?',
    options: ['Я', 'Ты', 'Мы сказали это одновременно'],
    correct: 0,
    url: '/pictures/IMG_9059.avif',
    caption: 'Самое важное и правильное признание в моей жизни 💘',
    unlocked: false
  },
  {
    id: 6,
    question: 'Мой любимый цвет на тебе?',
    options: ['Черный', 'Красный', 'Белый'],
    correct: 0,
    url: '/pictures/IMG_E8821.avif',
    caption: 'Черный подчеркивает твою грацию, но сияешь ты изнутри ✨',
    unlocked: false
  },
  {
    id: 7,
    question: 'О чем я подумал, когда впервые увидел тебя?',
    options: ['О том, как красиво ты выглядишь', 'О том, какая у тебя улыбка', 'О том, как можно быть настолько изумительно красивой и стильной одновременно'],
    correct: 2,
    url: '/pictures/IMG_7810.avif',
    caption: 'И я до сих пор смотрю на тебя с таким же восхищением 😍',
    unlocked: false
  },
  {
    id: 8,
    question: 'Что мне нравится в тебе больше всего?',
    options: ['Твоя улыбка', 'Твой ум', 'Абсолютно всё'],
    correct: 2, 
    url: '/pictures/IMG_8394.avif',
    caption: 'Невозможно выбрать что-то одно, когда совершенно всё — искусство 🌹',
    unlocked: false
  },
  {
    id: 11,
    question: 'Что тебе нравится во мне?',
    options: ['Моя забота', 'Моя искренность', 'Моя...'],
    correct: 2,
    url: '/pictures/popa.avif',
    caption: 'Зато честно! Я знал, что этот вариант ответа ты выберешь не задумываясь 🎯',
    unlocked: false
  },
  {
    id: 9,
    question: 'Город, где всё началось?',
    options: ['Астана', 'Алматы', 'Шымкент'],
    correct: 1, 
    url: '/pictures/IMG_8530.avif',
    caption: 'Наш Алматы. Город, подаривший мне счастье 🏔️',
    unlocked: false
  },
  {
    id: 10,
    question: 'Сколько дней мы вместе?',
    options: [unofficialSaysTogether, officialSaysTogether, 'Бесконечность'],
    correct: 1,
    url: '/pictures/IMG_8355.avif',
    caption: 'И каждый из этих дней был лучшим в моей жизни ♾️',
    unlocked: false
  },
  {
    id: 12,
    question: 'Готова к главному сюрпризу?',
    options: ['Да', 'Конечно да!', 'Уже не терпится'],
    correct: 1, // Любой вариант можно сделать правильным
    url: '/tickets/ticket-5913-7293841a7ec9fd9c.pdf', // Вместо картинки кладем путь к PDF
    caption: 'Увидимся на концерте! Нас ждет незабываемый вечер 🎟️✨',
    unlocked: false
  }
])


export function useQuiz() {
  const loadProgress = () => {
    const saved = localStorage.getItem('inkar_quiz_progress')
    if (saved) {
      const unlockedIds: number[] = JSON.parse(saved)
      quizItems.value.forEach(item => {
        if (unlockedIds.includes(item.id)) item.unlocked = true
      })
    }
  }

  // Принимаем строго QuizItem
  const openQuiz = (item: QuizItem) => {
    if (item.unlocked) {
      enlargedQuizItem.value = item 
      return
    }
    activeQuiz.value = item
    showQuizError.value = false
  }

  const answerQuestion = (selectedIndex: number) => {
    // TypeScript теперь знает, что activeQuiz не null благодаря проверке, 
    // но для безопасности проверим наличие объекта через if
    if (!activeQuiz.value) return

    if (selectedIndex === activeQuiz.value.correct) {
      const item = quizItems.value.find(i => i.id === activeQuiz.value!.id)
      if (item) item.unlocked = true
      
      const unlockedIds = quizItems.value.filter(i => i.unlocked).map(i => i.id)
      localStorage.setItem('inkar_quiz_progress', JSON.stringify(unlockedIds))
      
      enlargedQuizItem.value = activeQuiz.value 
      activeQuiz.value = null
    } else {
      showQuizError.value = true
      setTimeout(() => { showQuizError.value = false }, 1500)
    }
  }

  const closeQuiz = () => {
    activeQuiz.value = null
  }

  const closeEnlargedPhoto = () => {
    enlargedQuizItem.value = null
  }

  return {
    quizItems,
    activeQuiz,
    enlargedQuizItem,
    showQuizError,
    loadProgress,
    openQuiz,
    answerQuestion,
    closeQuiz,
    closeEnlargedPhoto
  }
}
