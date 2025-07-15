'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Map', href: '/map' },
  { name: 'Profile', href: '/profile' },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/login')
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Navigation Links */}
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <span
                  className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors ${
                    pathname === item.href
                      ? 'text-blue-700 bg-blue-100'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Right: Logout Button */}
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:text-red-800 px-3 py-2 rounded-md font-medium transition"
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  )
}
