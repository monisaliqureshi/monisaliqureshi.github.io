"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function CertificationForm() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const { error } = await supabase.from("certifications").insert({
      title: formData.get("title"),
      issuer: formData.get("issuer"),
      issuer_logo_url: formData.get("issuer_logo_url"),
      issue_date: formData.get("issue_date") || null,
      expiry_date: formData.get("expiry_date") || null,
      credential_id: formData.get("credential_id"),
      credential_url: formData.get("credential_url"),
      description: formData.get("description"),
      order_index: 0,
    })

    if (error) {
      console.error("Error inserting certification:", error)
      alert(`Error adding certification: ${error.message}`)
    } else {
      alert("Certification added successfully!")
      form.reset()
    }

    setLoading(false)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input id="title" name="title" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="issuer">Issuer *</Label>
          <Input id="issuer" name="issuer" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="issuer_logo_url">Issuer Logo URL</Label>
          <Input id="issuer_logo_url" name="issuer_logo_url" type="url" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="credential_id">Credential ID</Label>
          <Input id="credential_id" name="credential_id" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="issue_date">Issue Date</Label>
          <Input id="issue_date" name="issue_date" type="date" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expiry_date">Expiry Date</Label>
          <Input id="expiry_date" name="expiry_date" type="date" />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="credential_url">Credential URL</Label>
          <Input id="credential_url" name="credential_url" type="url" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" rows={3} />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Adding..." : "Add Certification"}
      </Button>
    </form>
  )
}
