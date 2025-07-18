'use client'

import { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import mapboxgl from 'mapbox-gl'
import Map, { Marker } from 'react-map-gl'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

export default function MapView({ user }) {
  const [viewState, setViewState] = useState({
    latitude: 40.7128,
    longitude: -74.006,
    zoom: 10,
  })

  const [userMemories, setUserMemories] = useState([])

  useEffect(() => {
    //console.log('User:', user)
    if (!user) return

    const fetchUserMemories = async () => {
      console.log('Fetching memories for user:', user.uid)
      try {
        const q = query(collection(db, 'memories'), where('uid', '==', user.uid))
        const snapshot = await getDocs(q)
        const memories = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setUserMemories(memories)
      } catch (err) {
        //console.error('Error fetching memories:', err)
      }
    }

    fetchUserMemories()


  }, [user])

  if (!user) return null
  //console.log('User memories:', userMemories)


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
    return typeof lat === 'number' && typeof lng === 'number' && Math.abs(lat) <= 90 && Math.abs(lng) <= 180
  })
  .map((memory) => {
    //console.log("Rendering marker at:", memory.coordinates)
    return (
      <Marker
        key={memory.id}
        latitude={memory.coordinates.lat}
        longitude={memory.coordinates.lng}
        anchor="bottom"
      >
        <div className="text-2xl">📍</div>
      </Marker>
    )
  })
}
      </Map>
    </div>
  )
}
