"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { HomeSection } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Trash2, Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function HomeSectionList() {
  const router = useRouter()
  const supabase = createClient()
  const [sections, setSections] = useState<HomeSection[]>([])
  const [loading, setLoading] = useState(true)
  const [editingSection, setEditingSection] = useState<HomeSection | null>(null)
  const [editLoading, setEditLoading] = useState(false)

  useEffect(() => {
    fetchSections()
  }, [])

  const fetchSections = async () => {
    const { data } = await supabase.from("home_sections").select("*").order("order_index", { ascending: true })

    setSections(data || [])
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this section?")) return

    await supabase.from("home_sections").delete().eq("id", id)
    router.refresh()
    fetchSections()
  }

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingSection) return

    setEditLoading(true)
    const formData = new FormData(e.currentTarget)

    const { error } = await supabase
      .from("home_sections")
      .update({
        title: formData.get("title"),
        description: formData.get("description"),
        icon_url: formData.get("icon_url"),
      })
      .eq("id", editingSection.id)

    if (error) {
      console.error("Error updating section:", error)
      alert("Failed to update section")
    } else {
      setEditingSection(null)
      router.refresh()
      fetchSections()
    }
    setEditLoading(false)
  }

  if (loading) return <div>Loading...</div>

  if (sections.length === 0) {
    return <div className="text-center text-gray-500 py-8">No sections added yet</div>
  }

  return (
    <>
      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className="border dark:border-gray-700 rounded-lg p-4 flex items-start justify-between bg-white dark:bg-gray-800/50"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{section.title}</h3>
              {section.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{section.description}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => setEditingSection(section)}>
                <Pencil className="w-4 h-4 text-blue-500" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(section.id)}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!editingSection} onOpenChange={(open) => !open && setEditingSection(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Section</DialogTitle>
            <DialogDescription>Update the home section details</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title *</Label>
              <Input id="edit-title" name="title" required defaultValue={editingSection?.title} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                rows={3}
                defaultValue={editingSection?.description || ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-icon_url">Icon/Image URL *</Label>
              <Input id="edit-icon_url" name="icon_url" type="url" required defaultValue={editingSection?.icon_url} />
            </div>

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setEditingSection(null)}>
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
