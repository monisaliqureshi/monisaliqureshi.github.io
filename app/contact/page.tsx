"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { ContactHero } from "@/components/contact/contact-hero"
import { BlogsSection } from "@/components/contact/blogs-section"
import type { Contact } from "@/lib/types"

export default function ContactPage() {
  const [contact, setContact] = useState<Contact | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()

      const { data, error } = await supabase
        .from("contact")
        .select(`
          *,
          social_links (
            id,
            contact_id,
            platform,
            url,
            icon_name,
            display_order
          )
        `)
        .limit(1)
        .maybeSingle<Contact>()

      if (error) {
        console.error("Error fetching contact data:", error)
      } else if (data?.social_links) {
        data.social_links.sort((a, b) => a.display_order - b.display_order)
        setContact(data)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!contact) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.2),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.2),transparent_50%)]" />
        <p className="relative text-gray-600 dark:text-gray-400">No contact information available</p>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.2),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.2),transparent_50%)]" />
      <div className="relative z-10">
        <ContactHero contact={contact} />
        <BlogsSection contact={contact} />
      </div>
    </div>
  )
}
