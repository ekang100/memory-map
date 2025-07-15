import '../styles/globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Memory Map',
  description: 'Capture and revisit your moments.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-[--background]">
        <Navbar />
        <main className="h-full">{children}</main>
      </body>
    </html>
  )
}
