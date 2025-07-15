'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import dynamic from 'next/dynamic'

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false })

export default function MapPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        router.push('/login')
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-blue-700">
        Loading map...
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f4faff] to-[#e2f0ff]">
      <div className="absolute inset-0 bg-white opacity-30 z-10 pointer-events-none" />
      <div className="relative z-20 h-screen w-full">
        <MapView />
      </div>
    </div>
  )
}
