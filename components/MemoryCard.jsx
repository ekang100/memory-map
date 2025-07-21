'use client'

import Image from 'next/image'

export default function MemoryCard({ memory }) {
  if (!memory) return null

  return (
    <div className="max-w-xs bg-white rounded-xl shadow-lg p-4 text-black">
      <h3 className="text-lg font-bold mb-2">{memory.title}</h3>
      
      {memory.imageUrl && (
        <div className="mb-2">
          <Image
            src={memory.imageUrl}
            alt={memory.title}
            width={250}
            height={150}
            className="rounded-lg object-cover"
          />
        </div>
      )}

      {memory.notes && (
        <p className="text-sm text-gray-700 whitespace-pre-line">{memory.notes}</p>
      )}
    </div>
  )
}
