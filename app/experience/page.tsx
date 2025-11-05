"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Experience } from "@/lib/types"
import { ExperienceHero } from "@/components/experience/experience-hero"
import { ExperienceTimeline } from "@/components/experience/experience-timeline"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()

      const { data: experiencesData, error: experiencesError } = await supabase
        .from("experiences")
        .select("*")
        .order("order_index", { ascending: false })

      if (experiencesError) {
        console.error("Error fetching experiences:", experiencesError)
        setLoading(false)
        return
      }

      const { data: experienceItems, error: itemsError } = await supabase
        .from("experience_items")
        .select("*")
        .order("order_index", { ascending: true })

      if (itemsError) {
        console.error("Error fetching experience items:", itemsError)
      }

      const experiencesWithItems: Experience[] = (experiencesData || []).map((exp) => ({
        ...exp,
        experience_items: (experienceItems || []).filter((item) => item.experience_id === exp.id),
      }))

      setExperiences(experiencesWithItems)
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
    <main className="min-h-screen">
      <ExperienceHero />

      <section className="py-20 relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-500/5 to-background" />

        <div className="container mx-auto px-4 relative z-10">
          <Accordion type="single" collapsible defaultValue="work" className="space-y-4">
            <AccordionItem
              value="work"
              className="border border-border/50 rounded-xl overflow-hidden bg-card/30 backdrop-blur-sm"
            >
              <AccordionTrigger className="px-6 py-4 text-xl font-bold hover:no-underline hover:bg-blue-500/5 transition-colors">
                Work
              </AccordionTrigger>
              <AccordionContent className="px-6 py-6">
                <ExperienceTimeline experiences={experiences} type="work" />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="internships"
              className="border border-border/50 rounded-xl overflow-hidden bg-card/30 backdrop-blur-sm"
            >
              <AccordionTrigger className="px-6 py-4 text-xl font-bold hover:no-underline hover:bg-purple-500/5 transition-colors">
                Internships
              </AccordionTrigger>
              <AccordionContent className="px-6 py-6">
                <ExperienceTimeline experiences={experiences} type="internship" />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="volunteerships"
              className="border border-border/50 rounded-xl overflow-hidden bg-card/30 backdrop-blur-sm"
            >
              <AccordionTrigger className="px-6 py-4 text-xl font-bold hover:no-underline hover:bg-green-500/5 transition-colors">
                Volunteerships
              </AccordionTrigger>
              <AccordionContent className="px-6 py-6">
                <ExperienceTimeline experiences={experiences} type="volunteer" />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </main>
  )
}
