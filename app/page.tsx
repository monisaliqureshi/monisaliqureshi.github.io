"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { About, HomeSection } from "@/lib/types"
import { HeroSection } from "@/components/hero-section"
import { CapabilitySection } from "@/components/capability-section"

const sectionIllustrations: Record<string, string> = {
  "Data Science & AI": "/images/data_science.svg",
  "Full Stack Development": "/images/fullstack.svg",
  "Cloud Infra-Architecture": "/images/cloud_infrastructure.svg",
  "UI/UX Design": "/images/ui_ux_design.svg",
}

export default function HomePage() {
  const [about, setAbout] = useState<About | null>(null)
  const [homeSections, setHomeSections] = useState<HomeSection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = createClient()

        // Fetch about data
        const { data: aboutData, error: aboutError } = await supabase
          .from("about")
          .select("*")
          .limit(1)
          .maybeSingle<About>()

        if (aboutError) throw aboutError
        setAbout(aboutData)

        // Fetch home sections with related skills and items
        const { data: sections, error: sectionsError } = await supabase
          .from("home_sections")
          .select(`
            *,
            skills (*),
            section_items (*)
          `)
          .order("order_index", { ascending: true })

        if (sectionsError) throw sectionsError
        setHomeSections((sections || []) as unknown as HomeSection[])
      } catch (err) {
        console.error("Error fetching data from Supabase:", err)
        setError(err instanceof Error ? err.message : "Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  if (error || !about) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Unable to load portfolio data.</p>
          <p className="text-sm text-muted-foreground">
            {error || "Please ensure the database scripts have been run and the Supabase connection is configured."}
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <main>
        <HeroSection about={about} />

        {/* What I Do Section */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20"></div>

          {homeSections.map((section, index) => {
            const illustrationUrl = sectionIllustrations[section.title] || "/placeholder.svg?height=400&width=400"

            return (
              <CapabilitySection key={section.id} section={section} index={index} illustrationUrl={illustrationUrl} />
            )
          })}
        </section>

        {/* Footer */}
        <footer className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 border-t bg-muted/30">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm sm:text-base text-muted-foreground">
              Made with <span className="text-red-500">❤️</span> by{" "}
              <span className="font-semibold text-foreground">{about.name}</span>
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}
