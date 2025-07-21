'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import MapView from '@/components/MapView'
import AddMemoryForm from '@/components/AddMemoryForm'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export default function MapPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user)
      if (user) {
        setUser(user)
        console.log("User logged in:", user.email)
      } else {
        console.log("No user, redirecting to login")
        router.push('/login')
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  if (loading) return <div className="text-center p-6">Loading...</div>

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <MapView user={user} />

      {/* Floating "+" Button */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white text-3xl shadow-lg hover:bg-blue-700 transition"
      >
        +
      </button>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
              onClick={() => setShowForm(false)}
            >
              &times;
            </button>
            <AddMemoryForm user={user} />
          </div>
        </div>
      )}
    </div>
  )
}
