"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function HomeSectionForm() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const { error } = await supabase.from("home_sections").insert({
      title: formData.get("title"),
      description: formData.get("description"),
      icon_url: formData.get("icon_url"),
      order_index: 0,
    })

    if (error) {
      console.error("Error inserting section:", error)
      alert(`Error adding section: ${error.message}`)
    } else {
      alert("Section added successfully!")
      form.reset()
    }

    setLoading(false)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input id="title" name="title" required placeholder="e.g., Data Science & AI" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" rows={3} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="icon_url">Icon/Image URL *</Label>
        <Input id="icon_url" name="icon_url" type="url" required placeholder="/images/data_science.svg" />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Adding..." : "Add Section"}
      </Button>
    </form>
  )
}
