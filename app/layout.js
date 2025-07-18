import '../styles/globals.css'
import Navbar from '@/components/Navbar'
import 'mapbox-gl/dist/mapbox-gl.css'

export const metadata = {
  title: 'Memory Map',
  description: 'Capture and revisit your moments.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-screen">
    <body className="h-screen bg-[--background]">
      <Navbar />
      <main className="h-screen">{children}</main>
    </body>
  </html>

  )
}
