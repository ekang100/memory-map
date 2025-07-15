'use client'

import mapboxgl from 'mapbox-gl' // 👈 correctly imported synchronously
import Map, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useState } from 'react'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

export default function MapView() {
  const [viewState, setViewState] = useState({
    latitude: 40.7128,
    longitude: -74.006,
    zoom: 10,
  })

  return (
    <div className="w-full h-full">
      <Map
        mapLib={mapboxgl} // ✅ correct usage
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={viewState}
        style={{ width: '100%', height: '100%' }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      >
        <Marker longitude={-74.006} latitude={40.7128} />
      </Map>
    </div>
  )
}
