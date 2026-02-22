'use client'

import { useState, useEffect } from 'react'

interface DashboardService {
  id: string
  title: string
  description: string
  url: string
  icon: string
  status: 'online' | 'offline' | 'maintenance'
  category: 'core' | 'utility' | 'future'
}

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if already authenticated
    const authStatus = localStorage.getItem('sgu-portal-auth')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }

    // Update time
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleString('de-AT', {
        timeZone: 'Europe/Vienna',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }))
    }
    
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const services: DashboardService[] = [
    {
      id: 'hub',
      title: 'Dashboard Hub',
      description: 'Zentrale Navigation für alle Services',
      url: 'https://sgu-dashboard-hub.onrender.com',
      icon: '🎯',
      status: 'online',
      category: 'core'
    },
    {
      id: 'fitness',
      title: 'Fitness Tracking',
      description: 'Schritte, Nutrition, Training & Gesundheit',
      url: 'https://stefan-fitness-dashboard-v2.onrender.com',
      icon: '💪',
      status: 'online',
      category: 'core'
    },
    {
      id: 'portfolio',
      title: 'Portfolio Management',
      description: '€270k Austrian Investment Portfolio',
      url: 'https://stefan-portfolio-dashboard-v2.onrender.com',
      icon: '💎',
      status: 'online',
      category: 'core'
    },
    {
      id: 'system',
      title: 'OpenClaw System',
      description: 'System Monitoring & Automation',
      url: 'https://stefan-openclaw-system-dashboard.onrender.com',
      icon: '🤖',
      status: 'online',
      category: 'utility'
    },
    {
      id: 'tasks',
      title: 'Task Management',
      description: 'Abfall, Termine & Multi-Location Tasks',
      url: '#',
      icon: '📋',
      status: 'maintenance',
      category: 'utility'
    },
    {
      id: 'home',
      title: 'Home Assistant',
      description: 'Smart Home Pellendorf & Maishofen',
      url: '#',
      icon: '🏠',
      status: 'offline',
      category: 'future'
    }
  ]

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (password === 'sgu2026!') {
      localStorage.setItem('sgu-portal-auth', 'true')
      setIsAuthenticated(true)
    } else {
      alert('Falsches Passwort!')
    }
    setIsLoading(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass rounded-2xl p-8 w-full max-w-md fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-2">SGU Portal</h1>
            <p className="text-white/80">Stefan&apos;s Digital Services</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">
                Passwort
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 touch-target"
                placeholder="Portal Passwort eingeben"
                autoFocus
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-6 rounded-lg font-medium hover-scale disabled:opacity-50 touch-target"
            >
              {isLoading ? 'Anmeldung...' : 'Portal Betreten'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">{currentTime}</p>
          </div>
        </div>
      </div>
    )
  }

  const coreServices = services.filter(s => s.category === 'core')
  const utilityServices = services.filter(s => s.category === 'utility')
  const futureServices = services.filter(s => s.category === 'future')

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 fade-in">
          <h1 className="text-6xl md:text-8xl font-bold gradient-text mb-4">SGU</h1>
          <p className="text-xl md:text-2xl text-white/80 mb-2">Stefan&apos;s Digital Ecosystem</p>
          <p className="text-white/60">{currentTime}</p>
          <button
            onClick={() => {
              localStorage.removeItem('sgu-portal-auth')
              setIsAuthenticated(false)
            }}
            className="mt-4 text-white/50 hover:text-white/80 text-sm"
          >
            Abmelden
          </button>
        </header>

        {/* Core Services */}
        <section className="mb-12 fade-in">
          <h2 className="text-3xl font-bold text-white mb-6">🎯 Core Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        {/* Utility Services */}
        <section className="mb-12 fade-in">
          <h2 className="text-3xl font-bold text-white mb-6">🔧 Utility Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {utilityServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        {/* Future Services */}
        <section className="fade-in">
          <h2 className="text-3xl font-bold text-white mb-6">🚀 Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {futureServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-16 text-white/40">
          <p>© 2026 SGU Portal • Built with Next.js & Tailwind</p>
        </footer>
      </div>
    </div>
  )
}

function ServiceCard({ service }: { service: DashboardService }) {
  const statusColors = {
    online: 'bg-green-500/20 text-green-300',
    offline: 'bg-gray-500/20 text-gray-300',
    maintenance: 'bg-yellow-500/20 text-yellow-300'
  }

  const statusLabels = {
    online: 'Online',
    offline: 'Geplant',
    maintenance: 'Wartung'
  }

  const isClickable = service.status === 'online' && service.url !== '#'

  const cardContent = (
    <div className={`glass rounded-xl p-6 hover-scale transition-all duration-300 touch-target ${
      isClickable ? 'cursor-pointer hover:border-white/30' : 'cursor-default opacity-75'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{service.icon}</div>
        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[service.status]}`}>
          {statusLabels[service.status]}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
      <p className="text-white/70 text-sm leading-relaxed">{service.description}</p>
      
      {isClickable && (
        <div className="mt-4 text-blue-300 text-sm font-medium">
          Öffnen →
        </div>
      )}
    </div>
  )

  return isClickable ? (
    <a 
      href={service.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block"
    >
      {cardContent}
    </a>
  ) : (
    <div>{cardContent}</div>
  )
}