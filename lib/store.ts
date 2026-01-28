import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, UserProgress, QuizResult } from './types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string, name?: string) => boolean
  register: (email: string, password: string, name: string) => boolean
  logout: () => void
}

interface ProgressState {
  progress: UserProgress
  markChapterRead: (chapterId: string) => void
  saveQuizResult: (quizId: string, result: Omit<QuizResult, 'odId' | 'completedAt'>) => void
  getChapterProgress: (chapterId: string) => { read: boolean; readAt?: string } | undefined
  getQuizResult: (quizId: string) => QuizResult | undefined
  getStats: () => {
    chaptersRead: number
    quizzesCompleted: number
    averageScore: number
    bestScore: number
  }
}

// Simple in-memory user store (for demo purposes)
const users: Map<string, { password: string; name: string }> = new Map()

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: (email: string, password: string) => {
        const storedUser = users.get(email)
        if (storedUser && storedUser.password === password) {
          set({
            user: {
              id: email,
              email,
              name: storedUser.name,
              createdAt: new Date().toISOString()
            },
            isAuthenticated: true
          })
          return true
        }
        // For demo: auto-create user on first login
        if (!storedUser) {
          users.set(email, { password, name: email.split('@')[0] })
          set({
            user: {
              id: email,
              email,
              name: email.split('@')[0],
              createdAt: new Date().toISOString()
            },
            isAuthenticated: true
          })
          return true
        }
        return false
      },

      register: (email: string, password: string, name: string) => {
        if (users.has(email)) {
          return false
        }
        users.set(email, { password, name })
        set({
          user: {
            id: email,
            email,
            name,
            createdAt: new Date().toISOString()
          },
          isAuthenticated: true
        })
        return true
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      }
    }),
    {
      name: 'quantum-auth'
    }
  )
)

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: {
        oderId: '',
        chapterProgress: {},
        quizResults: {}
      },

      markChapterRead: (chapterId: string) => {
        set((state) => ({
          progress: {
            ...state.progress,
            chapterProgress: {
              ...state.progress.chapterProgress,
              [chapterId]: {
                read: true,
                readAt: new Date().toISOString()
              }
            }
          }
        }))
      },

      saveQuizResult: (quizId: string, result: Omit<QuizResult, 'odId' | 'completedAt'>) => {
        set((state) => ({
          progress: {
            ...state.progress,
            quizResults: {
              ...state.progress.quizResults,
              [quizId]: {
                ...result,
                odId: quizId,
                completedAt: new Date().toISOString()
              }
            }
          }
        }))
      },

      getChapterProgress: (chapterId: string) => {
        return get().progress.chapterProgress[chapterId]
      },

      getQuizResult: (quizId: string) => {
        return get().progress.quizResults[quizId]
      },

      getStats: () => {
        const { chapterProgress, quizResults } = get().progress
        const chaptersRead = Object.values(chapterProgress).filter(p => p.read).length
        const quizResultsArray = Object.values(quizResults)
        const quizzesCompleted = quizResultsArray.length
        const totalScore = quizResultsArray.reduce((acc, r) => acc + (r.score / r.totalQuestions) * 100, 0)
        const averageScore = quizzesCompleted > 0 ? Math.round(totalScore / quizzesCompleted) : 0
        const bestScore = quizzesCompleted > 0
          ? Math.round(Math.max(...quizResultsArray.map(r => (r.score / r.totalQuestions) * 100)))
          : 0

        return { chaptersRead, quizzesCompleted, averageScore, bestScore }
      }
    }),
    {
      name: 'quantum-progress'
    }
  )
)
