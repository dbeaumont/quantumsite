'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Atom, Waves, HelpCircle, Layers, Link as LinkIcon, Sigma,
  Clock, BookOpen, CheckCircle2, Play
} from 'lucide-react'
import Navbar from '@/app/components/Navbar'
import { useAuthStore, useProgressStore } from '@/lib/store'
import { chapters, quizzes } from '@/lib/data'

const iconMap: { [key: string]: React.ElementType } = {
  Atom,
  Waves,
  HelpCircle,
  Layers,
  Link: LinkIcon,
  Function: Sigma,
}

function ChapterCard({ chapter, index, isRead, quizCompleted, quizScore }: {
  chapter: typeof chapters[0]
  index: number
  isRead: boolean
  quizCompleted: boolean
  quizScore?: number
}) {
  const Icon = iconMap[chapter.icon] || Atom

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/chapters/${chapter.id}`}>
        <div className="quantum-card p-6 h-full group cursor-pointer">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-quantum-500/20 to-neon-purple/20
                            flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon className="w-7 h-7 text-quantum-400" />
            </div>
            <div className="flex items-center gap-2">
              {isRead && (
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"
                     title="Chapitre lu">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
              )}
              <span className={`badge ${
                chapter.difficulty === 'Débutant' ? 'badge-beginner' :
                chapter.difficulty === 'Intermédiaire' ? 'badge-intermediate' : 'badge-advanced'
              }`}>
                {chapter.difficulty}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="mb-4">
            <div className="text-quantum-500 text-sm font-medium mb-1">
              Chapitre {chapter.order}
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-quantum-300 transition-colors">
              {chapter.title}
            </h3>
            <p className="text-quantum-400 text-sm line-clamp-2">
              {chapter.description}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-quantum-700/50">
            <div className="flex items-center gap-4 text-sm text-quantum-500">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {chapter.duration}
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                + Quiz
              </div>
            </div>

            {quizCompleted ? (
              <div className="text-sm font-medium text-quantum-300">
                Score: <span className={quizScore! >= 70 ? 'text-green-400' : 'text-yellow-400'}>
                  {quizScore}%
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-quantum-400 group-hover:text-quantum-300 transition-colors">
                <Play className="w-4 h-4" />
                <span className="text-sm">Commencer</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ChaptersPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { progress, getStats } = useProgressStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const stats = getStats()

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Chapitres</span>
            </h1>
            <p className="text-xl text-quantum-400 max-w-2xl">
              Explorez les concepts fondamentaux de la mécanique quantique
              à travers nos chapitres interactifs.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            <div className="quantum-card p-4 text-center">
              <div className="text-2xl font-bold text-white">{stats.chaptersRead}/{chapters.length}</div>
              <div className="text-sm text-quantum-400">Chapitres lus</div>
            </div>
            <div className="quantum-card p-4 text-center">
              <div className="text-2xl font-bold text-white">{stats.quizzesCompleted}/{quizzes.length}</div>
              <div className="text-sm text-quantum-400">Quiz complétés</div>
            </div>
            <div className="quantum-card p-4 text-center">
              <div className="text-2xl font-bold text-white">{stats.averageScore}%</div>
              <div className="text-sm text-quantum-400">Score moyen</div>
            </div>
            <div className="quantum-card p-4 text-center">
              <div className="text-2xl font-bold text-white">{stats.bestScore}%</div>
              <div className="text-sm text-quantum-400">Meilleur score</div>
            </div>
          </motion.div>

          {/* Chapters Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((chapter, index) => {
              const isRead = progress.chapterProgress[chapter.id]?.read || false
              const quiz = quizzes.find(q => q.chapterId === chapter.id)
              const quizResult = quiz ? progress.quizResults[quiz.id] : undefined
              const quizScore = quizResult
                ? Math.round((quizResult.score / quizResult.totalQuestions) * 100)
                : undefined

              return (
                <ChapterCard
                  key={chapter.id}
                  chapter={chapter}
                  index={index}
                  isRead={isRead}
                  quizCompleted={!!quizResult}
                  quizScore={quizScore}
                />
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
