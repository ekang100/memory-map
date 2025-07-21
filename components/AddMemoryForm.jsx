'use client'

import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function AddMemoryForm({ user }) {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return

    try {
      await addDoc(collection(db, 'memories'), {
        uid: user.uid,
        title,
        location,
        notes,
        coordinates,
        imageUrl,
        //mapId: user.uid, // ← link to user's map
        createdAt: new Date()
      })


      setTitle('')
      setLocation('')
      setLat('')
      setLng('')
    } catch (err) {
      console.error('Error adding memory:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Location name"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="number"
          placeholder="Longitude"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Add Memory
      </button>
    </form>
  )
}
