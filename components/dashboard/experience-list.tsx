"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import type { Experience } from "@/lib/types"
import { Trash2, Pencil } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ExperienceList({ refresh }: { refresh: number }) {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [editingExp, setEditingExp] = useState<Experience | null>(null)
  const [editLoading, setEditLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadExperiences()
  }, [refresh])

  async function loadExperiences() {
    const supabase = createClient()
    const { data } = await supabase.from("experiences").select("*").order("order_index", { ascending: false })

    setExperiences(data || [])
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this experience?")) return

    const supabase = createClient()
    const { error } = await supabase.from("experiences").delete().eq("id", id)

    if (error) {
      alert("Error deleting experience: " + error.message)
    } else {
      loadExperiences()
    }
  }

  async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!editingExp) return

    setEditLoading(true)
    setError(null)
    const formData = new FormData(e.currentTarget)
    const supabase = createClient()

    const { error: updateError } = await supabase
      .from("experiences")
      .update({
        title: formData.get("title"),
        company_name: formData.get("company_name"),
        experience_type: formData.get("experience_type"),
        start_date: formData.get("start_date"),
        end_date: formData.get("end_date") || null,
        description: formData.get("description"),
      })
      .eq("id", editingExp.id)

    if (updateError) {
      console.error("[v0] Update error:", updateError)
      setError(updateError.message)

      if (updateError.message.includes("row-level security")) {
        setError(
          "Database permissions error. Please run the RLS fix script (016_fix_all_rls_policies.sql) in your Supabase SQL editor.",
        )
      }
    } else {
      alert("Experience updated successfully!")
      setEditingExp(null)
      loadExperiences()
    }
    setEditLoading(false)
  }

  if (loading) return <div>Loading...</div>

  return (
    <>
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="border dark:border-gray-700 rounded-lg p-4 space-y-2 bg-white dark:bg-gray-800/50"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                <p className="text-sm text-muted-foreground">{exp.company_name}</p>
                <p className="text-xs text-muted-foreground capitalize">{exp.experience_type}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => setEditingExp(exp)}>
                  <Pencil className="w-4 h-4 text-blue-500" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(exp.id)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!editingExp} onOpenChange={(open) => !open && setEditingExp(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Experience</DialogTitle>
            <DialogDescription>Update the experience details</DialogDescription>
          </DialogHeader>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-sm text-red-800 dark:text-red-200 font-medium">Error updating:</p>
              <p className="text-sm text-red-600 dark:text-red-300 mt-1">{error}</p>
            </div>
          )}

          <form onSubmit={handleEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Job Title *</Label>
              <Input id="edit-title" name="title" required defaultValue={editingExp?.title} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-company">Company Name *</Label>
              <Input id="edit-company" name="company_name" required defaultValue={editingExp?.company_name} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-type">Experience Type *</Label>
              <Select name="experience_type" defaultValue={editingExp?.experience_type}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="volunteer">Volunteer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-start">Start Date *</Label>
                <Input id="edit-start" name="start_date" type="date" required defaultValue={editingExp?.start_date} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-end">End Date</Label>
                <Input id="edit-end" name="end_date" type="date" defaultValue={editingExp?.end_date || ""} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                rows={4}
                defaultValue={editingExp?.description || ""}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setEditingExp(null)}>
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
