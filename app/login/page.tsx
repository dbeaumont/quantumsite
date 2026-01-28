'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Atom, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react'
import { useAuthStore } from '@/lib/store'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const success = login(email, password)
    if (success) {
      router.push('/chapters')
    } else {
      setError('Email ou mot de passe incorrect')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-quantum-500 to-neon-purple
                            flex items-center justify-center">
              <Atom className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">QuantumSite</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Bon retour !</h1>
            <p className="text-quantum-400">
              Connectez-vous pour continuer votre apprentissage
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30
                         flex items-center gap-3 text-red-400"
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-quantum-300 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-quantum-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="quantum-input !pl-14"
                  placeholder="vous@exemple.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-quantum-300 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-quantum-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="quantum-input !pl-14 pr-12"
                  placeholder="••••••••"
                  required
                  minLength={4}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-quantum-500
                             hover:text-quantum-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="quantum-button w-full flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-8 text-center text-quantum-400">
            Pas encore de compte ?{' '}
            <Link href="/register" className="text-quantum-400 hover:text-white font-medium transition-colors">
              Créer un compte
            </Link>
          </p>

          {/* Demo Note */}
          <div className="mt-8 p-4 rounded-xl bg-quantum-800/30 border border-quantum-700/50">
            <p className="text-sm text-quantum-400 text-center">
              <span className="text-quantum-300 font-medium">Mode démo :</span> Entrez n&apos;importe quel email
              et mot de passe pour vous connecter.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Decorative */}
      <div className="hidden lg:flex flex-1 bg-quantum-900/50 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-quantum-500/10 to-neon-purple/10"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-quantum-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 text-center px-12"
        >
          <div className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-quantum-500 to-neon-purple
                          flex items-center justify-center quantum-glow">
            <Atom className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Explorez l&apos;univers <span className="gradient-text">quantique</span>
          </h2>
          <p className="text-quantum-300 text-lg max-w-md">
            Découvrez les mystères de la mécanique quantique à travers des chapitres
            interactifs et des quiz captivants.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
