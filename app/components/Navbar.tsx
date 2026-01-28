'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Atom, BookOpen, BarChart3, LogOut, User } from 'lucide-react'
import { useAuthStore } from '@/lib/store'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const navItems = [
    { href: '/chapters', label: 'Chapitres', icon: BookOpen },
    { href: '/progress', label: 'Progression', icon: BarChart3 },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-quantum-950/80 border-b border-quantum-800/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/chapters" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-quantum-500 to-neon-purple
                            flex items-center justify-center group-hover:scale-105 transition-transform">
              <Atom className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">QuantumSite</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200
                              ${isActive
                                ? 'bg-quantum-800/80 text-white'
                                : 'text-quantum-400 hover:text-white hover:bg-quantum-800/50'
                              }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="hidden sm:block">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-quantum-800/50">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-quantum-500 to-neon-purple
                              flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-quantum-300">{user?.name || 'Utilisateur'}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-quantum-400
                         hover:text-white hover:bg-quantum-800/50 transition-all duration-200"
              title="Déconnexion"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:block">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
