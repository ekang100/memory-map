'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isNewUser, setIsNewUser] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/map')
      }
    })
    return () => unsubscribe()
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isNewUser) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      router.push('/map')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#fdf6e3] via-[#f4faff] to-[#e2f0ff]">
      {/* Background map image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/map_bg.avif"
          alt="Map Background"
          className="w-full h-full object-cover opacity-30 filter hue-rotate-180 saturate-150"
        />
      </div>

      {/* Login/Signup card */}
      <div className="relative z-10 bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-xl hover:shadow-[0_0_20px_rgba(180,200,255,0.3)] transition-shadow duration-300 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
          {isNewUser ? 'Sign Up' : 'Log In'}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-400 to-blue-500 text-white py-2 rounded-lg font-semibold shadow hover:from-blue-500 hover:to-blue-600 transition-all"
          >
            {isNewUser ? 'Create Account' : 'Log In'}
          </button>
        </form>
        {error && <p className="mt-2 text-red-500 text-sm text-center">{error}</p>}
        <p className="mt-4 text-center text-sm text-gray-700">
          {isNewUser ? 'Already have an account?' : 'Don’t have an account?'}{' '}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => setIsNewUser(!isNewUser)}
          >
            {isNewUser ? 'Log in' : 'Sign up'}
          </span>
        </p>
      </div>
    </div>
  )
}
