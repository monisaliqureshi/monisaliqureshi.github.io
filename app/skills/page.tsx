"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Skill } from "@/lib/types"
import { SkillsOrbit } from "@/components/skills/skills-orbit"

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()

      const { data, error } = await supabase.from("skills").select("*").order("order_index")

      if (error) {
        console.error("Error fetching skills:", error)
      } else {
        setSkills(data as Skill[])
      }
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
    <main className="min-h-screen pt-20 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Page title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Stack & <span className="text-primary">Skills</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with to build amazing products
          </p>
        </div>

        {/* Skills orbit visualization */}
        <SkillsOrbit skills={skills} centerImageUrl="/images/skills-center.svg" />

        {/* Skills grid fallback for mobile */}
        <div className="mt-16 md:hidden">
          <div className="grid grid-cols-3 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card hover:bg-accent transition-colors"
              >
                {skill.skill_icon_url && (
                  <img
                    src={skill.skill_icon_url || "/placeholder.svg"}
                    alt={skill.skill_name}
                    className="w-12 h-12 object-contain"
                  />
                )}
                <span className="text-sm text-center font-medium">{skill.skill_name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
