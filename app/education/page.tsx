"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Degree, Certification } from "@/lib/types"
import { EducationHero } from "@/components/education/education-hero"
import { DegreesSection } from "@/components/education/degrees-section"
import { CertificationsSection } from "@/components/education/certifications-section"

export default function EducationPage() {
  const [degrees, setDegrees] = useState<Degree[]>([])
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()

      const [degreesResult, certificationsResult] = await Promise.all([
        supabase.from("degrees").select("*, degree_items(*)").order("order_index", { ascending: true }),
        supabase.from("certifications").select("*").order("order_index", { ascending: true }),
      ])

      setDegrees((degreesResult.data || []) as Degree[])
      setCertifications((certificationsResult.data || []) as Certification[])
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-[500px] h-[500px] bg-pink-400/30 dark:bg-pink-600/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <EducationHero certifications={certifications} />
      <DegreesSection degrees={degrees} />
      <CertificationsSection certifications={certifications} />
    </div>
  )
}
