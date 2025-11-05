"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Degree } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Trash2, Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function DegreeList() {
  const router = useRouter()
  const supabase = createClient()
  const [degrees, setDegrees] = useState<Degree[]>([])
  const [loading, setLoading] = useState(true)
  const [editingDegree, setEditingDegree] = useState<Degree | null>(null)
  const [editLoading, setEditLoading] = useState(false)

  useEffect(() => {
    fetchDegrees()
  }, [])

  const fetchDegrees = async () => {
    const { data } = await supabase
      .from("degrees")
      .select("*, degree_items(*)")
      .order("order_index", { ascending: true })

    setDegrees(data || [])
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this degree?")) return

    await supabase.from("degrees").delete().eq("id", id)
    router.refresh()
    fetchDegrees()
  }

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingDegree) return

    setEditLoading(true)
    const formData = new FormData(e.currentTarget)

    const { error } = await supabase
      .from("degrees")
      .update({
        institution_name: formData.get("institution_name"),
        degree_name: formData.get("degree_name"),
        field_of_study: formData.get("field_of_study"),
        start_year: formData.get("start_year"),
        end_year: formData.get("end_year") || null,
        description: formData.get("description"),
      })
      .eq("id", editingDegree.id)

    if (error) {
      console.error("Error updating degree:", error)
      alert("Failed to update degree")
    } else {
      setEditingDegree(null)
      router.refresh()
      fetchDegrees()
    }
    setEditLoading(false)
  }

  if (loading) return <div>Loading...</div>

  if (degrees.length === 0) {
    return <div className="text-center text-gray-500 py-8">No degrees added yet</div>
  }

  return (
    <>
      <div className="space-y-4">
        {degrees.map((degree) => (
          <div
            key={degree.id}
            className="border dark:border-gray-700 rounded-lg p-4 flex items-start justify-between bg-white dark:bg-gray-800/50"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{degree.institution_name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {degree.degree_name}
                {degree.field_of_study && ` in ${degree.field_of_study}`}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                {degree.start_year} - {degree.end_year || "Present"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => setEditingDegree(degree)}>
                <Pencil className="w-4 h-4 text-blue-500" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(degree.id)}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!editingDegree} onOpenChange={(open) => !open && setEditingDegree(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Degree</DialogTitle>
            <DialogDescription>Update the degree details</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-institution">Institution Name *</Label>
              <Input
                id="edit-institution"
                name="institution_name"
                required
                defaultValue={editingDegree?.institution_name}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-degree">Degree Name *</Label>
              <Input id="edit-degree" name="degree_name" required defaultValue={editingDegree?.degree_name} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-field">Field of Study</Label>
              <Input id="edit-field" name="field_of_study" defaultValue={editingDegree?.field_of_study || ""} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-start">Start Year *</Label>
                <Input
                  id="edit-start"
                  name="start_year"
                  type="number"
                  required
                  defaultValue={editingDegree?.start_year}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-end">End Year</Label>
                <Input id="edit-end" name="end_year" type="number" defaultValue={editingDegree?.end_year || ""} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                rows={3}
                defaultValue={editingDegree?.description || ""}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setEditingDegree(null)}>
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
