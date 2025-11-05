"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"

interface ProjectFormProps {
  onSuccess?: () => void
}

export function ProjectForm({ onSuccess }: ProjectFormProps) {
  const [loading, setLoading] = useState(false)
  const [technologies, setTechnologies] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    const supabase = createClient()

    try {
      console.log("[v0] Starting project submission...")

      // Insert project
      const projectData = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        image_url: formData.get("image_url") as string,
        demo_url: formData.get("demo_url") as string,
        code_url: formData.get("code_url") as string,
        created_date: formData.get("created_date") as string,
      }

      console.log("[v0] Project data:", projectData)

      const { data: project, error: projectError } = await supabase
        .from("projects")
        .insert(projectData)
        .select()
        .single()

      if (projectError) {
        console.error("[v0] Project insert error:", projectError)
        throw projectError
      }

      console.log("[v0] Project created:", project)

      // Insert technologies
      const techArray = technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)

      if (techArray.length > 0 && project) {
        console.log("[v0] Adding technologies:", techArray)

        const techInserts = techArray.map((name) => ({
          project_id: project.id,
          name,
          icon_url: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name.toLowerCase()}/${name.toLowerCase()}-original.svg`,
        }))

        const { error: techError } = await supabase.from("project_technologies").insert(techInserts)

        if (techError) {
          console.error("[v0] Technologies insert error:", techError)
          throw techError
        }

        console.log("[v0] Technologies added successfully")
      }

      alert("Project added successfully!")
      form.reset()
      setTechnologies("")
      onSuccess?.()
    } catch (error) {
      console.error("[v0] Error adding project:", error)
      alert(`Failed to add project: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Project Title</Label>
        <Input id="title" name="title" required />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required rows={4} />
      </div>

      <div>
        <Label htmlFor="image_url">Image URL</Label>
        <Input id="image_url" name="image_url" type="url" placeholder="https://..." />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="demo_url">Demo URL</Label>
          <Input id="demo_url" name="demo_url" type="url" placeholder="https://..." />
        </div>

        <div>
          <Label htmlFor="code_url">Code URL</Label>
          <Input id="code_url" name="code_url" type="url" placeholder="https://github.com/..." />
        </div>
      </div>

      <div>
        <Label htmlFor="created_date">Created Date</Label>
        <Input id="created_date" name="created_date" type="date" required />
      </div>

      <div>
        <Label htmlFor="technologies">Technologies (comma-separated)</Label>
        <Input
          id="technologies"
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
          placeholder="react, typescript, nodejs"
        />
        <p className="text-sm text-muted-foreground mt-1">Enter technology names separated by commas</p>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Project"}
      </Button>
    </form>
  )
}
