'use client'

import { useEffect } from 'react'
import ReactGA from 'react-ga4'

export function Analytics() {
  useEffect(() => {
    const trackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID
    if (trackingId && typeof window !== 'undefined' && !window.location.href.includes('localhost')) {
      ReactGA.initialize(trackingId)
      ReactGA.send({ hitType: 'pageview', page: window.location.pathname })
    }
  }, [])

  return null
}
