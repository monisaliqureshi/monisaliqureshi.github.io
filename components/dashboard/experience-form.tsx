"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"

export function ExperienceForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)
    const supabase = createClient()

    console.log("[v0] Attempting to insert experience...")

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()
    console.log("[v0] Current user:", user?.email || "Not authenticated")

    const { error: insertError } = await supabase.from("experiences").insert({
      title: formData.get("title") as string,
      company_name: formData.get("company_name") as string,
      company_logo_url: formData.get("company_logo_url") as string,
      location: formData.get("location") as string,
      start_date: formData.get("start_date") as string,
      end_date: (formData.get("end_date") as string) || null,
      is_current: formData.get("is_current") === "true",
      description: formData.get("description") as string,
      experience_type: formData.get("experience_type") as string,
      order_index: Number.parseInt(formData.get("order_index") as string) || 0,
    })

    setLoading(false)

    if (insertError) {
      console.error("[v0] Insert error:", insertError)
      setError(insertError.message)

      if (insertError.message.includes("row-level security")) {
        setError(
          "Database permissions error. Please run the RLS fix script (017_quick_rls_fix.sql) in your Supabase SQL editor.",
        )
      }
    } else {
      console.log("[v0] Experience added successfully")
      alert("Experience added successfully!")
      form.reset()
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-sm text-red-800 dark:text-red-200 font-medium">Error adding experience:</p>
          <p className="text-sm text-red-600 dark:text-red-300 mt-1">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Job Title *</Label>
          <Input id="title" name="title" required />
        </div>
        <div>
          <Label htmlFor="company_name">Company Name *</Label>
          <Input id="company_name" name="company_name" required />
        </div>
      </div>

      <div>
        <Label htmlFor="company_logo_url">Company Logo URL</Label>
        <Input id="company_logo_url" name="company_logo_url" type="url" />
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <Input id="location" name="location" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="start_date">Start Date *</Label>
          <Input id="start_date" name="start_date" type="date" required />
        </div>
        <div>
          <Label htmlFor="end_date">End Date</Label>
          <Input id="end_date" name="end_date" type="date" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="is_current" name="is_current" value="true" />
        <Label htmlFor="is_current">Currently working here</Label>
      </div>

      <div>
        <Label htmlFor="experience_type">Experience Type *</Label>
        <Select name="experience_type" required>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="work">Work</SelectItem>
            <SelectItem value="internship">Internship</SelectItem>
            <SelectItem value="volunteer">Volunteer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" rows={3} />
      </div>

      <div>
        <Label htmlFor="order_index">Order Index</Label>
        <Input id="order_index" name="order_index" type="number" defaultValue="0" />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Experience"}
      </Button>
    </form>
  )
}
