'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function HomePage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user)
    })
    return () => unsubscribe()
  }, [])

  const handleClick = () => {
    router.push(isLoggedIn ? '/map' : '/login')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#f4faff] to-[#e2f0ff] text-center">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Welcome to Memory Map 💙</h1>
      
      <button
        onClick={handleClick}
        className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
      >
        {isLoggedIn ? 'Go to Map' : 'Login to Continue'}
      </button>
    </div>
  )
}
