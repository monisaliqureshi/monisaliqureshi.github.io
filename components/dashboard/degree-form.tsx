"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X } from "lucide-react"

export function DegreeForm() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [bulletPoints, setBulletPoints] = useState<string[]>([""])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    // Insert degree
    const { data: degree, error: degreeError } = await supabase
      .from("degrees")
      .insert({
        institution_name: formData.get("institution_name"),
        institution_logo_url: formData.get("institution_logo_url"),
        degree_name: formData.get("degree_name"),
        field_of_study: formData.get("field_of_study"),
        start_year: Number.parseInt(formData.get("start_year") as string),
        end_year: formData.get("end_year") ? Number.parseInt(formData.get("end_year") as string) : null,
        description: formData.get("description"),
        website_url: formData.get("website_url"),
        order_index: 0,
      })
      .select()
      .single()

    if (degreeError) {
      console.error("Error inserting degree:", degreeError)
      alert(`Error adding degree: ${degreeError.message}`)
      setLoading(false)
      return
    }

    // Insert bullet points
    const validBulletPoints = bulletPoints.filter((bp) => bp.trim() !== "")
    if (validBulletPoints.length > 0) {
      const items = validBulletPoints.map((content, index) => ({
        degree_id: degree.id,
        content,
        order_index: index,
      }))

      const { error: itemsError } = await supabase.from("degree_items").insert(items)

      if (itemsError) {
        console.error("Error inserting degree items:", itemsError)
      }
    }

    setLoading(false)
    router.refresh()
    form.reset()
    setBulletPoints([""])
  }

  const addBulletPoint = () => {
    setBulletPoints([...bulletPoints, ""])
  }

  const removeBulletPoint = (index: number) => {
    setBulletPoints(bulletPoints.filter((_, i) => i !== index))
  }

  const updateBulletPoint = (index: number, value: string) => {
    const newBulletPoints = [...bulletPoints]
    newBulletPoints[index] = value
    setBulletPoints(newBulletPoints)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="institution_name">Institution Name *</Label>
          <Input id="institution_name" name="institution_name" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="institution_logo_url">Institution Logo URL</Label>
          <Input id="institution_logo_url" name="institution_logo_url" type="url" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="degree_name">Degree Name *</Label>
          <Input id="degree_name" name="degree_name" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="field_of_study">Field of Study</Label>
          <Input id="field_of_study" name="field_of_study" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="start_year">Start Year *</Label>
          <Input id="start_year" name="start_year" type="number" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="end_year">End Year</Label>
          <Input id="end_year" name="end_year" type="number" />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="website_url">Website URL</Label>
          <Input id="website_url" name="website_url" type="url" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" rows={3} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Bullet Points</Label>
          <Button type="button" size="sm" variant="outline" onClick={addBulletPoint}>
            <Plus className="w-4 h-4 mr-1" />
            Add Point
          </Button>
        </div>
        <div className="space-y-2">
          {bulletPoints.map((point, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={point}
                onChange={(e) => updateBulletPoint(index, e.target.value)}
                placeholder="Enter bullet point"
              />
              {bulletPoints.length > 1 && (
                <Button type="button" size="icon" variant="ghost" onClick={() => removeBulletPoint(index)}>
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Adding..." : "Add Degree"}
      </Button>
    </form>
  )
}
