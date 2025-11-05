import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Analytics } from '@/components/Analytics'

export const metadata: Metadata = {
  title: 'Monis Ali - AI Engineer & Data Scientist',
  description: 'AI Engineer, Aspiring Data Scientist, Python Developer specializing in Computer Vision and Machine Learning',
  keywords: ['AI Engineer', 'Data Scientist', 'Python Developer', 'Computer Vision', 'Machine Learning'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Analytics />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
