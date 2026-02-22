import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SGU Portal - Stefan\'s Digital Services',
  description: 'Professional portal for Stefan\'s digital dashboard ecosystem',
  keywords: 'SGU, Stefan, Dashboard, Portfolio, Fitness, OpenClaw',
  authors: [{ name: 'Stefan' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen">
        {children}
      </body>
    </html>
  )
}