"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { GitHubStats } from "@/components/opensource/github-stats"
import { ContributionCalendar } from "@/components/opensource/contribution-calendar"
import { LanguagesChart } from "@/components/opensource/languages-chart"
import { AchievementBadges } from "@/components/opensource/achievement-badges"
import { ProfessionalCertifications } from "@/components/opensource/professional-certifications"
import type { OpenSource, GitHubAchievement, ProfessionalCertification } from "@/lib/types"

export default function OpenSourcePage() {
  const [openSource, setOpenSource] = useState<OpenSource | null>(null)
  const [achievements, setAchievements] = useState<GitHubAchievement[]>([])
  const [certifications, setCertifications] = useState<ProfessionalCertification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()

      const [openSourceResult, achievementsResult, certificationsResult] = await Promise.all([
        supabase
          .from("open_source")
          .select(`
            *,
            languages (
              id,
              open_source_id,
              name,
              percentage,
              color,
              display_order
            )
          `)
          .limit(1)
          .maybeSingle<OpenSource>(),
        supabase.from("github_achievements").select("*").order("display_order", { ascending: true }),
        supabase.from("professional_certifications").select("*").order("display_order", { ascending: true }),
      ])

      if (openSourceResult.error) {
        console.error("Error fetching open source data:", openSourceResult.error)
      } else if (openSourceResult.data) {
        const data = openSourceResult.data
        if (data.languages) {
          data.languages.sort((a, b) => a.display_order - b.display_order)
        }
        setOpenSource(data)
      }

      setAchievements((achievementsResult.data || []) as GitHubAchievement[])
      setCertifications((certificationsResult.data || []) as ProfessionalCertification[])
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

  if (!openSource) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/2 w-[500px] h-[500px] bg-pink-400/30 dark:bg-pink-600/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>
        <div className="relative flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">No open source data available</p>
        </div>
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

      <div className="relative container mx-auto px-4 py-16 sm:py-20 lg:py-24 space-y-16 sm:space-y-20 lg:space-y-24">
        <GitHubStats data={openSource} />

        {achievements.length > 0 && <AchievementBadges achievements={achievements} />}

        {certifications.length > 0 && <ProfessionalCertifications certifications={certifications} />}

        <ContributionCalendar data={openSource} />

        {openSource.languages && openSource.languages.length > 0 && <LanguagesChart languages={openSource.languages} />}
      </div>
    </div>
  )
}
