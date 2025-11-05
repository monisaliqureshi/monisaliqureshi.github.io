"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trash2, ExternalLink, Pencil } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Project } from "@/lib/types"

interface ProjectListProps {
  refresh: number
}

export function ProjectList({ refresh }: ProjectListProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editLoading, setEditLoading] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [refresh])

  async function fetchProjects() {
    const supabase = createClient()

    const { data: projectsData, error: projectsError } = await supabase
      .from("projects")
      .select("*")
      .order("created_date", { ascending: false })

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
          project_technologies: technologies || [],
        }
      }),
    )

    setProjects(projectsWithTech)
    setLoading(false)
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this project?")) return

    const supabase = createClient()
    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) {
      console.error("Error deleting project:", error)
      alert("Failed to delete project")
    } else {
      alert("Project deleted successfully!")
      fetchProjects()
    }
  }

  async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!editingProject) return

    setEditLoading(true)
    const formData = new FormData(e.currentTarget)
    const supabase = createClient()

    const { error } = await supabase
      .from("projects")
      .update({
        title: formData.get("title"),
        description: formData.get("description"),
        image_url: formData.get("image_url"),
        demo_url: formData.get("demo_url") || null,
        code_url: formData.get("code_url") || null,
        created_date: formData.get("created_date"),
      })
      .eq("id", editingProject.id)

    if (error) {
      alert("Failed to update project: " + error.message)
    } else {
      const techString = formData.get("technologies") as string
      if (techString) {
        const technologies = techString
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)

        await supabase.from("project_technologies").delete().eq("project_id", editingProject.id)

        const techData = technologies.map((tech, index) => ({
          project_id: editingProject.id,
          technology_name: tech,
          order_index: index,
        }))

        await supabase.from("project_technologies").insert(techData)
      }

      setEditingProject(null)
      fetchProjects()
    }
    setEditLoading(false)
  }

  if (loading) return <div>Loading...</div>

  if (projects.length === 0) {
    return <div className="text-center text-muted-foreground py-8">No projects yet. Add one above!</div>
  }

  return (
    <>
      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id} className="p-4 bg-white dark:bg-gray-800/50">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{project.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{project.description}</p>

                {project.project_technologies && project.project_technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.project_technologies.map((tech) => (
                      <span
                        key={tech.id}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded"
                      >
                        {tech.technology_name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-3 mt-3">
                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Demo
                    </a>
                  )}
                  {project.code_url && (
                    <a
                      href={project.code_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Code
                    </a>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => setEditingProject(project)}>
                  <Pencil className="w-4 h-4 text-blue-500" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={!!editingProject} onOpenChange={(open) => !open && setEditingProject(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>Update the project details</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Project Title *</Label>
              <Input id="edit-title" name="title" required defaultValue={editingProject?.title} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description *</Label>
              <Textarea
                id="edit-description"
                name="description"
                rows={3}
                required
                defaultValue={editingProject?.description}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-image_url">Image URL</Label>
              <Input id="edit-image_url" name="image_url" type="url" defaultValue={editingProject?.image_url || ""} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-demo_url">Demo URL</Label>
                <Input id="edit-demo_url" name="demo_url" type="url" defaultValue={editingProject?.demo_url || ""} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-code_url">Code URL</Label>
                <Input id="edit-code_url" name="code_url" type="url" defaultValue={editingProject?.code_url || ""} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-created_date">Created Date</Label>
              <Input
                id="edit-created_date"
                name="created_date"
                type="date"
                defaultValue={editingProject?.created_date}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-technologies">Technologies (comma-separated)</Label>
              <Input
                id="edit-technologies"
                name="technologies"
                placeholder="react, typescript, nodejs"
                defaultValue={editingProject?.project_technologies?.map((t) => t.technology_name).join(", ") || ""}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setEditingProject(null)}>
                Cancel
              </Button>
              <Button type="submit" disabled={editLoading}>
                {editLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
