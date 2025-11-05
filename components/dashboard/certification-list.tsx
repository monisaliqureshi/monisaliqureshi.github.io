"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Certification } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Trash2, Pencil } from "lucide-react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CertificationList() {
  const router = useRouter()
  const supabase = createClient()
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCert, setEditingCert] = useState<Certification | null>(null)
  const [editLoading, setEditLoading] = useState(false)

  useEffect(() => {
    fetchCertifications()
  }, [])

  const fetchCertifications = async () => {
    const { data } = await supabase.from("certifications").select("*").order("order_index", { ascending: true })

    setCertifications(data || [])
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certification?")) return

    await supabase.from("certifications").delete().eq("id", id)
    router.refresh()
    fetchCertifications()
  }

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingCert) return

    setEditLoading(true)
    const formData = new FormData(e.currentTarget)

    const { error } = await supabase
      .from("certifications")
      .update({
        title: formData.get("title"),
        issuer: formData.get("issuer"),
        issue_date: formData.get("issue_date"),
        credential_url: formData.get("credential_url") || null,
      })
      .eq("id", editingCert.id)

    if (error) {
      console.error("Error updating certification:", error)
      alert("Failed to update certification")
    } else {
      setEditingCert(null)
      router.refresh()
      fetchCertifications()
    }
    setEditLoading(false)
  }

  if (loading) return <div>Loading...</div>

  if (certifications.length === 0) {
    return <div className="text-center text-gray-500 py-8">No certifications added yet</div>
  }

  return (
    <>
      <div className="space-y-4">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="border dark:border-gray-700 rounded-lg p-4 flex items-start justify-between bg-white dark:bg-gray-800/50"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{cert.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{cert.issuer}</p>
              {cert.issue_date && (
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  Issued: {new Date(cert.issue_date).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => setEditingCert(cert)}>
                <Pencil className="w-4 h-4 text-blue-500" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(cert.id)}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!editingCert} onOpenChange={(open) => !open && setEditingCert(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Certification</DialogTitle>
            <DialogDescription>Update the certification details</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title *</Label>
              <Input id="edit-title" name="title" required defaultValue={editingCert?.title} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-issuer">Issuer *</Label>
              <Input id="edit-issuer" name="issuer" required defaultValue={editingCert?.issuer} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-issue_date">Issue Date</Label>
              <Input id="edit-issue_date" name="issue_date" type="date" defaultValue={editingCert?.issue_date || ""} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-credential_url">Credential URL</Label>
              <Input
                id="edit-credential_url"
                name="credential_url"
                type="url"
                defaultValue={editingCert?.credential_url || ""}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setEditingCert(null)}>
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
