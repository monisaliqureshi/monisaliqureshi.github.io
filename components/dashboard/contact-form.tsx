"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import type { Contact, SocialLink } from "@/lib/types"

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [contact, setContact] = useState<Contact | null>(null)
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])

  useEffect(() => {
    fetchContact()
  }, [])

  async function fetchContact() {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("contact")
      .select(`
        *,
        social_links (*)
      `)
      .limit(1)
      .maybeSingle()

    if (!error && data) {
      setContact(data)
      setSocialLinks(data.social_links || [])
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const supabase = createClient()

    try {
      const contactData = {
        profile_image_url: formData.get("profile_image_url") as string,
        heading: formData.get("heading") as string,
        description: formData.get("description") as string,
        resume_url: formData.get("resume_url") as string,
        blog_url: formData.get("blog_url") as string,
        blog_description: formData.get("blog_description") as string,
      }

      if (contact) {
        // Update existing
        const { error } = await supabase.from("contact").update(contactData).eq("id", contact.id)

        if (error) throw error
      } else {
        // Insert new
        const { error } = await supabase.from("contact").insert(contactData)
        if (error) throw error
      }

      alert("Contact information updated successfully!")
      fetchContact()
    } catch (error) {
      console.error("Error updating contact:", error)
      alert("Failed to update contact information")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="profile_image_url">Profile Image URL</Label>
        <Input
          id="profile_image_url"
          name="profile_image_url"
          type="url"
          defaultValue={contact?.profile_image_url || ""}
          placeholder="https://..."
        />
      </div>

      <div>
        <Label htmlFor="heading">Heading</Label>
        <Input id="heading" name="heading" required defaultValue={contact?.heading || "Contact Me"} />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required rows={4} defaultValue={contact?.description || ""} />
      </div>

      <div>
        <Label htmlFor="resume_url">Resume URL</Label>
        <Input
          id="resume_url"
          name="resume_url"
          type="url"
          defaultValue={contact?.resume_url || ""}
          placeholder="https://..."
        />
      </div>

      <div>
        <Label htmlFor="blog_url">Blog URL</Label>
        <Input
          id="blog_url"
          name="blog_url"
          type="url"
          defaultValue={contact?.blog_url || ""}
          placeholder="https://..."
        />
      </div>

      <div>
        <Label htmlFor="blog_description">Blog Description</Label>
        <Textarea
          id="blog_description"
          name="blog_description"
          rows={3}
          defaultValue={contact?.blog_description || ""}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Contact Information"}
      </Button>
    </form>
  )
}
