'use client'

import { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import mapboxgl from 'mapbox-gl'
import Map, { Marker, Popup } from 'react-map-gl'
import MemoryCard from './MemoryCard'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

export default function MapView({ user }) {
  const [viewState, setViewState] = useState({
    latitude: 40.7128,
    longitude: -74.006,
    zoom: 10,
  })

  const [userMemories, setUserMemories] = useState([])
  const [selectedMemory, setSelectedMemory] = useState(null)

  useEffect(() => {
    if (!user) return

    const fetchUserMemories = async () => {
      try {
        const q = query(collection(db, 'memories'), where('uid', '==', user.uid))
        const snapshot = await getDocs(q)
        const memories = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setUserMemories(memories)
      } catch (err) {
        console.error('Error fetching memories:', err)
      }
    }

    fetchUserMemories()
  }, [user])

  if (!user) return null

  return (
    <div className="w-screen h-screen">
      <Map
        mapLib={mapboxgl}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={viewState}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onMove={(evt) => setViewState(evt.viewState)}
      >
        {userMemories
          .filter((memory) => {
            const lat = memory.coordinates?.lat
            const lng = memory.coordinates?.lng
            return (
              typeof lat === 'number' &&
              typeof lng === 'number' &&
              Math.abs(lat) <= 90 &&
              Math.abs(lng) <= 180
            )
          })
          .map((memory) => (
            <Marker
              key={memory.id}
              latitude={memory.coordinates.lat}
              longitude={memory.coordinates.lng}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation()
                setSelectedMemory(memory)
              }}
            >
              <div className="text-2xl cursor-pointer">📍</div>
            </Marker>
          ))}

        {selectedMemory && (
          <Popup
            latitude={selectedMemory.coordinates.lat}
            longitude={selectedMemory.coordinates.lng}
            onClose={() => setSelectedMemory(null)}
            closeOnClick={false}
            anchor="top"
          >
            <MemoryCard memory={selectedMemory} />
          </Popup>
        )}
      </Map>
    </div>
  )
}
