"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function AboutForm() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [aboutId, setAboutId] = useState<string | null>(null)

  useEffect(() => {
    fetchAbout()
  }, [])

  const fetchAbout = async () => {
    const { data } = await supabase.from("about").select("*").single()
    if (data) {
      setAboutId(data.id)
      // Populate form fields
      const form = document.getElementById("about-form") as HTMLFormElement
      if (form) {
        Object.keys(data).forEach((key) => {
          const input = form.elements.namedItem(key) as HTMLInputElement
          if (input && data[key]) {
            input.value = data[key]
          }
        })
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const aboutData = {
      name: formData.get("name"),
      tagline: formData.get("tagline"),
      bio: formData.get("bio"),
      profile_image_url: formData.get("profile_image_url"),
      resume_url: formData.get("resume_url"),
      github_url: formData.get("github_url"),
      linkedin_url: formData.get("linkedin_url"),
      twitter_url: formData.get("twitter_url"),
      youtube_url: formData.get("youtube_url"),
      instagram_url: formData.get("instagram_url"),
      facebook_url: formData.get("facebook_url"),
      google_url: formData.get("google_url"),
    }

    if (aboutId) {
      await supabase.from("about").update(aboutData).eq("id", aboutId)
    } else {
      const { data } = await supabase.from("about").insert(aboutData).select().single()
      if (data) setAboutId(data.id)
    }

    setLoading(false)
    router.refresh()
  }

  return (
    <form id="about-form" onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" name="name" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tagline">Tagline *</Label>
          <Input id="tagline" name="tagline" required />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" name="bio" rows={4} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="profile_image_url">Profile Image URL</Label>
          <Input id="profile_image_url" name="profile_image_url" type="url" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="resume_url">Resume URL</Label>
          <Input id="resume_url" name="resume_url" type="url" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="github_url">GitHub URL</Label>
          <Input id="github_url" name="github_url" type="url" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin_url">LinkedIn URL</Label>
          <Input id="linkedin_url" name="linkedin_url" type="url" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="twitter_url">Twitter URL</Label>
          <Input id="twitter_url" name="twitter_url" type="url" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="youtube_url">YouTube URL</Label>
          <Input id="youtube_url" name="youtube_url" type="url" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="instagram_url">Instagram URL</Label>
          <Input id="instagram_url" name="instagram_url" type="url" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="facebook_url">Facebook URL</Label>
          <Input id="facebook_url" name="facebook_url" type="url" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="google_url">Google URL</Label>
          <Input id="google_url" name="google_url" type="url" />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  )
}
