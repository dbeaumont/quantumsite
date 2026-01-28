import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QuantumSite - Explorez la Physique Quantique',
  description: 'Une plateforme interactive et moderne pour apprendre la physique quantique avec des chapitres illustrés et des quiz interactifs.',
  keywords: ['physique quantique', 'mécanique quantique', 'apprentissage', 'science', 'éducation'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
