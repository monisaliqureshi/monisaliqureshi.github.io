'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Splash from '@/components/Splash'

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
      router.push('/home')
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  if (showSplash) {
    return <Splash />
  }

  return null
}
