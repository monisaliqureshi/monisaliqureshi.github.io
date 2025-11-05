"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { ProjectsHero } from "@/components/projects/projects-hero"
import { ProjectCard } from "@/components/projects/project-card"
import type { Project } from "@/lib/types"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()

      const { data: projectsData, error: projectsError } = await supabase
        .from("projects")
        .select("*")
        .order("order_index", { ascending: true })

      if (projectsError) {
        console.error("Error fetching projects:", projectsError)
        setLoading(false)
        return
      }

      const projectsWithTech = await Promise.all(
        (projectsData || []).map(async (project) => {
          const { data: technologies } = await supabase
            .from("project_technologies")
            .select("*")
            .eq("project_id", project.id)
            .order("order_index", { ascending: true })

          return {
            ...project,
            technologies: technologies || [],
          } as Project
        }),
      )

      setProjects(projectsWithTech)
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
    <div className="min-h-screen">
      <ProjectsHero />

      {/* Projects Grid */}
      <section className="container mx-auto px-4 py-20">
        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No projects found. Add some from the dashboard!</p>
          </div>
        )}
      </section>
    </div>
  )
}
