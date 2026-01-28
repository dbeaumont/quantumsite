'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Clock, BookOpen, CheckCircle2,
  ChevronRight, Play
} from 'lucide-react'
import Navbar from '@/app/components/Navbar'
import { useAuthStore, useProgressStore } from '@/lib/store'
import { chapters, quizzes } from '@/lib/data'

function parseMarkdown(content: string): string {
  return content
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>)/gim, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^([^<])/gm, '<p>$1')
}

export default function ChapterPage() {
  const router = useRouter()
  const params = useParams()
  const { isAuthenticated } = useAuthStore()
  const { markChapterRead, progress } = useProgressStore()
  const [isRead, setIsRead] = useState(false)

  const chapterId = params.id as string
  const chapter = chapters.find(c => c.id === chapterId)
  const chapterIndex = chapters.findIndex(c => c.id === chapterId)
  const prevChapter = chapterIndex > 0 ? chapters[chapterIndex - 1] : null
  const nextChapter = chapterIndex < chapters.length - 1 ? chapters[chapterIndex + 1] : null
  const quiz = quizzes.find(q => q.chapterId === chapterId)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (chapter && progress.chapterProgress[chapter.id]?.read) {
      setIsRead(true)
    }
  }, [chapter, progress])

  const handleMarkAsRead = () => {
    if (chapter) {
      markChapterRead(chapter.id)
      setIsRead(true)
    }
  }

  if (!isAuthenticated || !chapter) {
    return null
  }

  const quizResult = quiz ? progress.quizResults[quiz.id] : undefined
  const quizScore = quizResult
    ? Math.round((quizResult.score / quizResult.totalQuestions) * 100)
    : undefined

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-quantum-500 mb-8"
          >
            <Link href="/chapters" className="hover:text-quantum-300 transition-colors">
              Chapitres
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-quantum-300">Chapitre {chapter.order}</span>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className={`badge ${
                chapter.difficulty === 'Débutant' ? 'badge-beginner' :
                chapter.difficulty === 'Intermédiaire' ? 'badge-intermediate' : 'badge-advanced'
              }`}>
                {chapter.difficulty}
              </span>
              {isRead && (
                <span className="badge bg-green-500/20 text-green-400 border border-green-500/30">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Lu
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold mb-4">
              <span className="gradient-text">{chapter.title}</span>
            </h1>

            <p className="text-xl text-quantum-400 mb-6">
              {chapter.description}
            </p>

            <div className="flex items-center gap-6 text-quantum-500">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {chapter.duration}
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Chapitre {chapter.order} sur {chapters.length}
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="quantum-card p-8 md:p-12 mb-8"
          >
            <div
              className="markdown-content"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(chapter.content) }}
            />
          </motion.div>

          {/* Mark as Read */}
          {!isRead && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <button
                onClick={handleMarkAsRead}
                className="quantum-button w-full flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Marquer comme lu
              </button>
            </motion.div>
          )}

          {/* Quiz Section */}
          {quiz && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="quantum-card p-6 mb-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Testez vos connaissances
                  </h3>
                  <p className="text-quantum-400">
                    {quiz.questions.length} questions sur ce chapitre
                  </p>
                  {quizResult && (
                    <p className="text-sm mt-2">
                      Dernier score : <span className={quizScore! >= 70 ? 'text-green-400' : 'text-yellow-400'}>
                        {quizScore}%
                      </span>
                    </p>
                  )}
                </div>
                <Link
                  href={`/quiz/${quiz.id}`}
                  className="quantum-button flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  {quizResult ? 'Refaire le quiz' : 'Commencer le quiz'}
                </Link>
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-between"
          >
            {prevChapter ? (
              <Link
                href={`/chapters/${prevChapter.id}`}
                className="quantum-button-secondary flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:block">{prevChapter.title}</span>
                <span className="sm:hidden">Précédent</span>
              </Link>
            ) : (
              <div />
            )}

            {nextChapter ? (
              <Link
                href={`/chapters/${nextChapter.id}`}
                className="quantum-button flex items-center gap-2"
              >
                <span className="hidden sm:block">{nextChapter.title}</span>
                <span className="sm:hidden">Suivant</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <Link
                href="/progress"
                className="quantum-button flex items-center gap-2"
              >
                Voir ma progression
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  )
}
