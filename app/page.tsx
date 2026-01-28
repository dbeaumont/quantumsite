'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Atom, BookOpen, BarChart3, Zap, ArrowRight,
  Sparkles, Brain, Target, Users
} from 'lucide-react'

function AtomAnimation() {
  return (
    <div className="atom-container">
      <div className="electron-orbit">
        <div className="electron"></div>
      </div>
      <div className="electron-orbit">
        <div className="electron"></div>
      </div>
      <div className="electron-orbit">
        <div className="electron"></div>
      </div>
      <div className="nucleus"></div>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description, delay }: {
  icon: React.ElementType
  title: string
  description: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="quantum-card p-8 group"
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-quantum-500/20 to-neon-purple/20
                      flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Icon className="w-7 h-7 text-quantum-400" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-quantum-300 leading-relaxed">{description}</p>
    </motion.div>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{value}</div>
      <div className="text-quantum-400">{label}</div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-quantum-950/80 border-b border-quantum-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-quantum-500 to-neon-purple
                            flex items-center justify-center group-hover:scale-105 transition-transform">
              <Atom className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">QuantumSite</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="quantum-button-ghost">
              Se connecter
            </Link>
            <Link href="/register" className="quantum-button">
              Commencer gratuitement
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-quantum-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                              bg-quantum-800/50 border border-quantum-700 mb-6">
                <Sparkles className="w-4 h-4 text-neon-blue" />
                <span className="text-sm text-quantum-300">Plateforme d&apos;apprentissage interactive</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">Explorez la</span>
                <br />
                <span className="gradient-text">Physique Quantique</span>
              </h1>

              <p className="text-xl text-quantum-300 mb-8 leading-relaxed max-w-xl">
                Plongez dans l&apos;univers fascinant de la mécanique quantique.
                Apprenez à travers des chapitres illustrés et testez vos connaissances
                avec des quiz interactifs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register" className="quantum-button inline-flex items-center justify-center gap-2">
                  Commencer l&apos;aventure
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#features" className="quantum-button-secondary inline-flex items-center justify-center gap-2">
                  Découvrir les chapitres
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-quantum-500/20 to-neon-purple/20
                                rounded-full blur-3xl scale-150"></div>
                <div className="relative w-80 h-80 flex items-center justify-center">
                  <div className="absolute w-full h-full rounded-full border border-quantum-700/30 animate-pulse"></div>
                  <div className="absolute w-[90%] h-[90%] rounded-full border border-quantum-600/30 animate-pulse"
                       style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute w-[80%] h-[80%] rounded-full border border-quantum-500/30 animate-pulse"
                       style={{ animationDelay: '1s' }}></div>
                  <div className="scale-150">
                    <AtomAnimation />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 border-y border-quantum-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard value="6" label="Chapitres" />
            <StatCard value="24" label="Questions" />
            <StatCard value="100%" label="Gratuit" />
            <StatCard value="∞" label="Possibilités" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Fonctionnalités</span>
            </h2>
            <p className="text-xl text-quantum-300 max-w-2xl mx-auto">
              Une expérience d&apos;apprentissage complète pour maîtriser les concepts de la physique quantique
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={BookOpen}
              title="Chapitres Détaillés"
              description="6 chapitres complets couvrant les concepts fondamentaux, de l&apos;introduction jusqu&apos;à l&apos;équation de Schrödinger."
              delay={0}
            />
            <FeatureCard
              icon={Zap}
              title="Quiz Interactifs"
              description="Testez vos connaissances avec des QCM après chaque chapitre et obtenez un feedback immédiat."
              delay={0.1}
            />
            <FeatureCard
              icon={BarChart3}
              title="Suivi de Progression"
              description="Visualisez votre avancement, vos scores et identifiez les domaines à améliorer."
              delay={0.2}
            />
            <FeatureCard
              icon={Brain}
              title="Explications Claires"
              description="Chaque concept est expliqué de manière accessible avec des exemples concrets."
              delay={0.3}
            />
            <FeatureCard
              icon={Target}
              title="Apprentissage Adapté"
              description="Progressez à votre rythme avec des niveaux de difficulté adaptés."
              delay={0.4}
            />
            <FeatureCard
              icon={Users}
              title="100% Gratuit"
              description="Accédez à tout le contenu sans aucune limitation ni frais cachés."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Chapters Preview */}
      <section className="py-24 px-6 bg-quantum-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Aperçu des Chapitres</span>
            </h2>
            <p className="text-xl text-quantum-300 max-w-2xl mx-auto">
              Un parcours progressif pour découvrir les mystères du monde quantique
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: 1, title: 'Introduction', level: 'Débutant' },
              { num: 2, title: 'Dualité Onde-Particule', level: 'Intermédiaire' },
              { num: 3, title: 'Principe d\'Incertitude', level: 'Intermédiaire' },
              { num: 4, title: 'Superposition', level: 'Intermédiaire' },
              { num: 5, title: 'Intrication', level: 'Avancé' },
              { num: 6, title: 'Équation de Schrödinger', level: 'Avancé' },
            ].map((chapter, idx) => (
              <motion.div
                key={chapter.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="quantum-card p-6 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-quantum-500 to-neon-purple
                                flex items-center justify-center text-xl font-bold shrink-0">
                  {chapter.num}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{chapter.title}</h3>
                  <span className={`text-sm ${
                    chapter.level === 'Débutant' ? 'text-green-400' :
                    chapter.level === 'Intermédiaire' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {chapter.level}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="quantum-card p-12 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96
                            bg-gradient-to-br from-quantum-500/20 to-neon-purple/20
                            rounded-full blur-3xl -translate-y-1/2"></div>

            <div className="relative">
              <h2 className="text-4xl font-bold mb-6">
                Prêt à explorer le <span className="gradient-text">monde quantique</span> ?
              </h2>
              <p className="text-xl text-quantum-300 mb-8 max-w-2xl mx-auto">
                Rejoignez-nous et commencez votre voyage à travers les mystères
                de la physique quantique.
              </p>
              <Link href="/register" className="quantum-button inline-flex items-center gap-2">
                Créer un compte gratuitement
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-quantum-800/50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-quantum-500 to-neon-purple
                              flex items-center justify-center">
                <Atom className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">QuantumSite</span>
            </div>
            <p className="text-quantum-500 text-sm">
              © 2024 QuantumSite. Explorez l&apos;infiniment petit.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
