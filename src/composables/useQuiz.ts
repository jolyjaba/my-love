import { ref } from 'vue'

type QuizItem = {
  id: number
  question: string
  options: string[]
  correct: number
  url: string
  caption: string
  unlocked: boolean
}

// Глобальный стейт, объявленный вне функции, чтобы все компоненты видели одни и те же данные
const activeQuiz = ref<QuizItem | null>(null)
const showQuizError = ref(false)
const quizItems = ref<QuizItem[]>([
  {
    id: 1,
    question: 'В каком месяце началась наша история?',
    options: ['Апрель', 'Май', 'Июнь'],
    correct: 1, // Индекс правильного ответа (Май)
    url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600',
    caption: 'Тот самый первый день',
    unlocked: false
  },
  {
    id: 2,
    question: 'Какой трек мы слушаем чаще всего?',
    options: ['Creep', 'Jigsaw Falling Into Place', 'Karma Police'],
    correct: 1, 
    url: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?q=80&w=600',
    caption: 'Музыка, которая нас связала',
    unlocked: false
  },
  {
    id: 3,
    question: 'Наш самый сумасшедший кулинарный шедевр?',
    options: ['Пицца с ананасами', 'Куырдак с беконом и пастой', 'Сладкий плов'],
    correct: 1, 
    url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600',
    caption: 'Мишлен отдыхает!',
    unlocked: false
  },
  {
    id: 4,
    question: 'Где мы планируем снять нашу идеальную виллу?',
    options: ['На Бали', 'На Мальдивах', 'В районе Sonasea на Фукуоке'],
    correct: 2, 
    url: 'https://images.unsplash.com/photo-1543731068-7e0f5beff43a?q=80&w=600',
    caption: 'Наши мечты сбываются',
    unlocked: false
  },
  {
    id: 5,
    question: 'Кто первый сказал «Я тебя люблю»?',
    options: ['Я', 'Ты', 'Мы сказали это одновременно'],
    correct: 0, // Поменяй на нужный индекс
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600',
    caption: 'Самые важные слова',
    unlocked: false
  },
  {
    id: 6,
    question: 'Мой любимый цвет на тебе?',
    options: ['Черный', 'Гранатовый', 'Белый'],
    correct: 1, 
    url: 'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?q=80&w=600',
    caption: 'Ты прекрасна во всем',
    unlocked: false
  },
  {
    id: 7,
    question: 'Как часто у меня возникает дежавю с тобой?',
    options: ['Никогда', 'Это чисто мое практичное наблюдение', 'Только по праздникам'],
    correct: 1, 
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600',
    caption: 'Словно мы были знакомы вечность',
    unlocked: false
  },
  {
    id: 8,
    question: 'Что мне нравится в тебе больше всего?',
    options: ['Твоя улыбка', 'Твой ум', 'Абсолютно всё'],
    correct: 2, 
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600',
    caption: 'Моя муза',
    unlocked: false
  },
  {
    id: 9,
    question: 'Город, где всё началось?',
    options: ['Астана', 'Алматы', 'Шымкент'],
    correct: 1, 
    url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=600',
    caption: 'Любимый город',
    unlocked: false
  },
  {
    id: 10,
    question: 'Сколько дней мы вместе?',
    options: ['1000', '1090', 'Бесконечность'],
    correct: 1, 
    url: 'https://images.unsplash.com/photo-1513279922550-250c2129b13a?q=80&w=600',
    caption: 'И это только начало',
    unlocked: false
  }
])

export function useQuiz() {
  const loadProgress = () => {
    const saved = localStorage.getItem('inkar_quiz_progress')
    if (saved) {
      const unlockedIds = JSON.parse(saved)
      quizItems.value.forEach(item => {
        if (unlockedIds.includes(item.id)) item.unlocked = true
      })
    }
  }

  const openQuiz = (item: QuizItem) => {
    if (item.unlocked) return
    activeQuiz.value = item
    showQuizError.value = false
  }

  const answerQuestion = (selectedIndex: number) => {
    if (selectedIndex === activeQuiz.value?.correct) {
      const item = quizItems.value.find(i => i.id === activeQuiz.value?.id)
      if (item) item.unlocked = true
      
      const unlockedIds = quizItems.value.filter(i => i.unlocked).map(i => i.id)
      localStorage.setItem('inkar_quiz_progress', JSON.stringify(unlockedIds))
      activeQuiz.value = null
    } else {
      showQuizError.value = true
      setTimeout(() => { showQuizError.value = false }, 1500)
    }
  }

  const closeQuiz = () => {
    activeQuiz.value = null
  }

  return {
    quizItems,
    activeQuiz,
    showQuizError,
    loadProgress,
    openQuiz,
    answerQuestion,
    closeQuiz
  }
}
