'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Trophy, Target, BookOpen, CheckCircle2, Clock,
  TrendingUp, Award, Zap, ArrowRight
} from 'lucide-react'
import Navbar from '@/app/components/Navbar'
import { useAuthStore, useProgressStore } from '@/lib/store'
import { chapters, quizzes } from '@/lib/data'

function StatCard({ icon: Icon, label, value, subtext, color }: {
  icon: React.ElementType
  label: string
  value: string | number
  subtext?: string
  color: string
}) {
  return (
    <div className="quantum-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-quantum-400">{label}</div>
      {subtext && <div className="text-sm text-quantum-500 mt-1">{subtext}</div>}
    </div>
  )
}

function ChapterProgressCard({ chapter, isRead, quizScore }: {
  chapter: typeof chapters[0]
  isRead: boolean
  quizScore?: number
}) {
  const progress = isRead && quizScore !== undefined ? 100 : isRead ? 50 : 0

  return (
    <div className="quantum-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold
                          ${isRead ? 'bg-green-500/20 text-green-400' : 'bg-quantum-800 text-quantum-500'}`}>
            {chapter.order}
          </div>
          <div>
            <h4 className="font-medium text-white text-sm">{chapter.title}</h4>
            <div className="flex items-center gap-2 text-xs text-quantum-500">
              {isRead && <span className="text-green-400">Lu</span>}
              {quizScore !== undefined && (
                <span className={quizScore >= 70 ? 'text-green-400' : 'text-yellow-400'}>
                  Quiz: {quizScore}%
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="text-right">
          {isRead ? (
            <CheckCircle2 className="w-5 h-5 text-green-400" />
          ) : (
            <Link
              href={`/chapters/${chapter.id}`}
              className="text-quantum-400 hover:text-white transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
      <div className="progress-bar h-1">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export default function ProgressPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useAuthStore()
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
  const overallProgress = Math.round(
    ((stats.chaptersRead + stats.quizzesCompleted) / (chapters.length + quizzes.length)) * 100
  )

  // Get achievements
  const achievements = [
    {
      id: 'first-chapter',
      name: 'Premier pas',
      description: 'Lire votre premier chapitre',
      icon: BookOpen,
      unlocked: stats.chaptersRead >= 1,
    },
    {
      id: 'first-quiz',
      name: 'Apprenti quantique',
      description: 'Compléter votre premier quiz',
      icon: Zap,
      unlocked: stats.quizzesCompleted >= 1,
    },
    {
      id: 'half-chapters',
      name: 'Mi-parcours',
      description: 'Lire la moitié des chapitres',
      icon: Target,
      unlocked: stats.chaptersRead >= Math.ceil(chapters.length / 2),
    },
    {
      id: 'perfect-score',
      name: 'Perfection',
      description: 'Obtenir 100% à un quiz',
      icon: Trophy,
      unlocked: stats.bestScore === 100,
    },
    {
      id: 'all-chapters',
      name: 'Maître quantique',
      description: 'Lire tous les chapitres',
      icon: Award,
      unlocked: stats.chaptersRead === chapters.length,
    },
    {
      id: 'all-quizzes',
      name: 'Expert',
      description: 'Compléter tous les quiz',
      icon: TrendingUp,
      unlocked: stats.quizzesCompleted === quizzes.length,
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Ma Progression</span>
            </h1>
            <p className="text-xl text-quantum-400">
              Bonjour {user?.name} ! Voici votre avancement dans le monde quantique.
            </p>
          </motion.div>

          {/* Overall Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="quantum-card p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Progression globale</h2>
                <p className="text-quantum-400">
                  Continuez votre exploration de la physique quantique
                </p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold gradient-text">{overallProgress}%</div>
                <div className="text-quantum-500">complété</div>
              </div>
            </div>
            <div className="progress-bar h-3">
              <div
                className="progress-bar-fill"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          >
            <StatCard
              icon={BookOpen}
              label="Chapitres lus"
              value={`${stats.chaptersRead}/${chapters.length}`}
              color="bg-blue-500/20 text-blue-400"
            />
            <StatCard
              icon={CheckCircle2}
              label="Quiz complétés"
              value={`${stats.quizzesCompleted}/${quizzes.length}`}
              color="bg-green-500/20 text-green-400"
            />
            <StatCard
              icon={Target}
              label="Score moyen"
              value={`${stats.averageScore}%`}
              color="bg-yellow-500/20 text-yellow-400"
            />
            <StatCard
              icon={Trophy}
              label="Meilleur score"
              value={`${stats.bestScore}%`}
              color="bg-purple-500/20 text-purple-400"
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Chapters Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Chapitres</h2>
              <div className="space-y-3">
                {chapters.map(chapter => {
                  const isRead = progress.chapterProgress[chapter.id]?.read || false
                  const quiz = quizzes.find(q => q.chapterId === chapter.id)
                  const quizResult = quiz ? progress.quizResults[quiz.id] : undefined
                  const quizScore = quizResult
                    ? Math.round((quizResult.score / quizResult.totalQuestions) * 100)
                    : undefined

                  return (
                    <ChapterProgressCard
                      key={chapter.id}
                      chapter={chapter}
                      isRead={isRead}
                      quizScore={quizScore}
                    />
                  )
                })}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Récompenses</h2>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className={`quantum-card p-4 text-center transition-all duration-300
                                ${achievement.unlocked
                                  ? 'border-quantum-500/50'
                                  : 'opacity-50 grayscale'
                                }`}
                  >
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center
                                    ${achievement.unlocked
                                      ? 'bg-gradient-to-br from-quantum-500/30 to-neon-purple/30'
                                      : 'bg-quantum-800'
                                    }`}>
                      <achievement.icon className={`w-6 h-6 ${
                        achievement.unlocked ? 'text-quantum-400' : 'text-quantum-600'
                      }`} />
                    </div>
                    <h4 className="font-semibold text-white text-sm mb-1">{achievement.name}</h4>
                    <p className="text-xs text-quantum-500">{achievement.description}</p>
                    {achievement.unlocked && (
                      <div className="mt-2">
                        <span className="text-xs text-green-400">Débloqué !</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          {overallProgress < 100 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <div className="quantum-card p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Continuez votre apprentissage !
                </h3>
                <p className="text-quantum-400 mb-6 max-w-xl mx-auto">
                  Il vous reste encore des chapitres à découvrir et des quiz à compléter.
                  Chaque étape vous rapproche de la maîtrise de la physique quantique.
                </p>
                <Link href="/chapters" className="quantum-button inline-flex items-center gap-2">
                  Reprendre les chapitres
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
