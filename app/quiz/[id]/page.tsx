'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle, Trophy,
  RotateCcw, BookOpen, ChevronRight
} from 'lucide-react'
import Navbar from '@/app/components/Navbar'
import { useAuthStore, useProgressStore } from '@/lib/store'
import { quizzes, chapters } from '@/lib/data'

export default function QuizPage() {
  const router = useRouter()
  const params = useParams()
  const { isAuthenticated } = useAuthStore()
  const { saveQuizResult } = useProgressStore()

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [showExplanation, setShowExplanation] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [score, setScore] = useState(0)

  const quizId = params.id as string
  const quiz = quizzes.find(q => q.id === quizId)
  const chapter = quiz ? chapters.find(c => c.id === quiz.chapterId) : null

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !quiz || !chapter) {
    return null
  }

  const question = quiz.questions[currentQuestion]
  const isLastQuestion = currentQuestion === quiz.questions.length - 1
  const isCorrect = selectedAnswer === question.correctAnswer

  const handleSelectAnswer = (index: number) => {
    if (showExplanation) return
    setSelectedAnswer(index)
    setShowExplanation(true)

    const newAnswers = [...answers, index]
    setAnswers(newAnswers)

    if (index === question.correctAnswer) {
      setScore(prev => prev + 1)
    }
  }

  const handleNext = () => {
    if (isLastQuestion) {
      // Save results
      saveQuizResult(quiz.id, {
        oderId: chapter.id,
        score: score + (isCorrect ? 0 : 0), // score already updated
        totalQuestions: quiz.questions.length,
        answers
      })
      setIsComplete(true)
    } else {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setAnswers([])
    setShowExplanation(false)
    setIsComplete(false)
    setScore(0)
  }

  const finalScore = Math.round((score / quiz.questions.length) * 100)

  if (isComplete) {
    return (
      <div className="min-h-screen">
        <Navbar />

        <main className="pt-24 pb-12 px-6">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="quantum-card p-8 md:p-12 text-center"
            >
              {/* Trophy Icon */}
              <div className={`w-24 h-24 mx-auto mb-6 rounded-3xl flex items-center justify-center
                              ${finalScore >= 70
                                ? 'bg-gradient-to-br from-green-500/20 to-green-600/20'
                                : 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/20'
                              }`}>
                <Trophy className={`w-12 h-12 ${finalScore >= 70 ? 'text-green-400' : 'text-yellow-400'}`} />
              </div>

              {/* Score */}
              <h1 className="text-4xl font-bold mb-2">
                {finalScore >= 70 ? 'Félicitations !' : 'Bon effort !'}
              </h1>
              <p className="text-quantum-400 mb-8">
                Vous avez terminé le quiz sur {chapter.title}
              </p>

              {/* Score Display */}
              <div className="quantum-card p-6 mb-8 bg-quantum-900/50">
                <div className="text-6xl font-bold gradient-text mb-2">{finalScore}%</div>
                <div className="text-quantum-400">
                  {score} bonnes réponses sur {quiz.questions.length} questions
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${finalScore}%` }}
                  />
                </div>
              </div>

              {/* Message */}
              <p className="text-quantum-300 mb-8">
                {finalScore >= 90
                  ? 'Excellent ! Vous maîtrisez parfaitement ce chapitre.'
                  : finalScore >= 70
                  ? 'Très bien ! Vous avez une bonne compréhension du sujet.'
                  : finalScore >= 50
                  ? 'Pas mal ! Relisez le chapitre pour améliorer votre score.'
                  : 'Continuez vos efforts ! Relisez le chapitre et réessayez.'}
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRestart}
                  className="quantum-button-secondary flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Refaire le quiz
                </button>
                <Link
                  href={`/chapters/${chapter.id}`}
                  className="quantum-button-secondary flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  Relire le chapitre
                </Link>
                <Link
                  href="/chapters"
                  className="quantum-button flex items-center justify-center gap-2"
                >
                  Continuer
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
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
            <Link href={`/chapters/${chapter.id}`} className="hover:text-quantum-300 transition-colors">
              {chapter.title}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-quantum-300">Quiz</span>
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-quantum-400">
                Question {currentQuestion + 1} sur {quiz.questions.length}
              </span>
              <span className="text-quantum-400">
                Score: {score}/{currentQuestion + (showExplanation ? 1 : 0)}
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${((currentQuestion + (showExplanation ? 1 : 0)) / quiz.questions.length) * 100}%` }}
              />
            </div>
          </motion.div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="quantum-card p-8"
            >
              {/* Question */}
              <h2 className="text-2xl font-bold text-white mb-8">
                {question.text}
              </h2>

              {/* Options */}
              <div className="space-y-4 mb-8">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index
                  const isCorrectOption = index === question.correctAnswer
                  let optionClass = 'quiz-option'

                  if (showExplanation) {
                    if (isCorrectOption) {
                      optionClass += ' correct'
                    } else if (isSelected && !isCorrectOption) {
                      optionClass += ' incorrect'
                    }
                  } else if (isSelected) {
                    optionClass += ' selected'
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectAnswer(index)}
                      disabled={showExplanation}
                      className={`${optionClass} w-full text-left flex items-center gap-4`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0
                                      ${showExplanation && isCorrectOption
                                        ? 'bg-green-500/20 text-green-400'
                                        : showExplanation && isSelected && !isCorrectOption
                                        ? 'bg-red-500/20 text-red-400'
                                        : 'bg-quantum-800 text-quantum-400'
                                      }`}>
                        {showExplanation && isCorrectOption ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : showExplanation && isSelected && !isCorrectOption ? (
                          <XCircle className="w-5 h-5" />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </div>
                      <span className="text-white">{option}</span>
                    </button>
                  )
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-8"
                  >
                    <div className={`p-4 rounded-xl ${isCorrect
                      ? 'bg-green-500/10 border border-green-500/30'
                      : 'bg-yellow-500/10 border border-yellow-500/30'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                            <span className="font-semibold text-green-400">Correct !</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-yellow-400" />
                            <span className="font-semibold text-yellow-400">Incorrect</span>
                          </>
                        )}
                      </div>
                      <p className="text-quantum-300">{question.explanation}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <Link
                  href={`/chapters/${chapter.id}`}
                  className="quantum-button-ghost flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Retour au chapitre
                </Link>

                {showExplanation && (
                  <button
                    onClick={handleNext}
                    className="quantum-button flex items-center gap-2"
                  >
                    {isLastQuestion ? 'Voir les résultats' : 'Question suivante'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
