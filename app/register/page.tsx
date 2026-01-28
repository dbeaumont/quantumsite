'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Atom, Mail, Lock, User, Eye, EyeOff, ArrowRight, AlertCircle, Check } from 'lucide-react'
import { useAuthStore } from '@/lib/store'

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuthStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const passwordRequirements = [
    { met: password.length >= 6, text: 'Au moins 6 caractères' },
    { met: /[A-Z]/.test(password), text: 'Une lettre majuscule' },
    { met: /[0-9]/.test(password), text: 'Un chiffre' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    if (!passwordRequirements.every(r => r.met)) {
      setError('Le mot de passe ne respecte pas les critères requis')
      return
    }

    setIsLoading(true)

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const success = register(email, password, name)
    if (success) {
      router.push('/chapters')
    } else {
      setError('Cet email est déjà utilisé')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex flex-1 bg-quantum-900/50 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-quantum-500/10"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-quantum-500/20 rounded-full blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 text-center px-12"
        >
          <div className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-neon-purple to-quantum-500
                          flex items-center justify-center quantum-glow-purple">
            <Atom className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Rejoignez l&apos;aventure <span className="gradient-text-warm">quantique</span>
          </h2>
          <p className="text-quantum-300 text-lg max-w-md">
            Créez votre compte gratuitement et commencez à explorer les mystères
            de la physique quantique.
          </p>

          <div className="mt-12 space-y-4">
            {['6 chapitres complets', '24 questions de quiz', 'Suivi de progression'].map((feature, idx) => (
              <div key={idx} className="flex items-center justify-center gap-3 text-quantum-300">
                <div className="w-6 h-6 rounded-full bg-quantum-500/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-quantum-400" />
                </div>
                {feature}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Form */}
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
            <h1 className="text-3xl font-bold text-white mb-2">Créer un compte</h1>
            <p className="text-quantum-400">
              Commencez votre voyage dans le monde quantique
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
                Nom complet
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-quantum-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="quantum-input !pl-14"
                  placeholder="Jean Dupont"
                  required
                />
              </div>
            </div>

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

              {/* Password Requirements */}
              {password && (
                <div className="mt-3 space-y-2">
                  {passwordRequirements.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center
                                      ${req.met ? 'bg-green-500/20 text-green-400' : 'bg-quantum-800 text-quantum-500'}`}>
                        {req.met && <Check className="w-3 h-3" />}
                      </div>
                      <span className={req.met ? 'text-green-400' : 'text-quantum-500'}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-quantum-300 mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-quantum-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="quantum-input !pl-14"
                  placeholder="••••••••"
                  required
                />
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-2 text-sm text-red-400">Les mots de passe ne correspondent pas</p>
              )}
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
                  Créer mon compte
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-8 text-center text-quantum-400">
            Déjà un compte ?{' '}
            <Link href="/login" className="text-quantum-400 hover:text-white font-medium transition-colors">
              Se connecter
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
