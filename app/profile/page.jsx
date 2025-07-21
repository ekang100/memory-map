'use client'

import { useEffect, useState } from 'react'
import { auth, db } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { doc, getDoc } from 'firebase/firestore'

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [memories, setMemories] = useState([])
  const [collaborators, setCollaborators] = useState([])

  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
        console.log("Auth state changed:", user)
      if (!user) {
        console.log("No user, redirecting to login")
        router.push('/login')
      } else {
        setUser(user)
        console.log("User logged in:", user.email)

        const q = query(collection(db, 'memories'), where('uid', '==', user.uid))
        const snapshot = await getDocs(q)
        setMemories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))

        setCollaborators([])
      }
    })

    return () => unsubscribe()
  }, [])

  if (!user) return null

  return (
    <div className="min-h-screen bg-white text-blue-900">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">👤 Your Profile</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">Account</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <button
            className="mt-2 px-4 py-1 text-sm bg-blue-500 text-white rounded"
            onClick={() => auth.signOut()}
          >
            Log Out
          </button>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold">Your Map</h2>
          <p><strong>Memories added:</strong> {memories.length}</p>
          <p><strong>Collaborators:</strong> {collaborators.length} / 3</p>
          <button
            className="mt-2 px-4 py-1 text-sm bg-green-500 text-white rounded"
            onClick={() => router.push('/map')}
          >
            View Map
          </button>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Your Memories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {memories.map(mem => (
              <div
                key={mem.id}
                className="border border-gray-200 shadow rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition"
                onClick={() => {
                  const lat = mem.coordinates?.lat
                  const lng = mem.coordinates?.lng
                  if (typeof lat === 'number' && typeof lng === 'number') {
                    router.push(`/map?lat=${lat}&lng=${lng}`)
                  }
                }}
              >
                <h3 className="font-bold text-lg mb-1">{mem.title || 'Untitled Memory'}</h3>
                <p className="text-sm text-gray-700">{mem.location || 'No location provided'}</p>
                {mem.notes && <p className="text-sm text-gray-500 mt-2 line-clamp-2">{mem.notes}</p>}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}