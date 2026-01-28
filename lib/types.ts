export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
}

export interface Chapter {
  id: string
  title: string
  description: string
  content: string
  order: number
  imageUrl: string
  icon: string
  duration: string
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé'
}

export interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface Quiz {
  id: string
  chapterId: string
  title: string
  questions: Question[]
}

export interface QuizResult {
  odId: string
  oderId: string
  score: number
  totalQuestions: number
  answers: number[]
  completedAt: string
}

export interface UserProgress {
  oderId: string
  chapterProgress: {
    [chapterId: string]: {
      read: boolean
      readAt?: string
    }
  }
  quizResults: {
    [quizId: string]: QuizResult
  }
}

export interface ProgressStats {
  totalChapters: number
  completedChapters: number
  totalQuizzes: number
  completedQuizzes: number
  averageScore: number
  streak: number
}
