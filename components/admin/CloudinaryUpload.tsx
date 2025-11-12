'use client'

import { useState } from 'react'
import Spinner from '@/components/common/Spinner'
import PhotoCard from '@/components/admin/PhotoCard'

interface Props {
  label?: string
  value?: string
  onUpload: (url: string) => void
}

export default function CloudinaryUpload({ label = 'Upload Image', value, onUpload }: Props) {
  const [preview, setPreview] = useState<string | null>(value || null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Please select an image')
      return
    }

    // show local preview
    const reader = new FileReader()
    reader.onload = async () => {
      const result = reader.result as string
      setPreview(result)

      // send to server as base64
      try {
        setUploading(true)
        setError('')
        const payload = { base64: result, filename: file.name }
        const res = await fetch('/api/cloudinary-upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error('Upload failed')
        const data = await res.json()
        // Prefer eagerUrl (server-generated resized image), then transformedUrl, then secure_url
        if (data?.eagerUrl) {
          setPreview(data.eagerUrl)
          onUpload(data.eagerUrl)
        } else if (data?.transformedUrl) {
          setPreview(data.transformedUrl)
          onUpload(data.transformedUrl)
        } else if (data?.url) {
          setPreview(data.url)
          onUpload(data.url)
        } else {
          throw new Error('No URL returned')
        }
      } catch (err: any) {
        setError(err.message || 'Upload failed')
      } finally {
        setUploading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      <div className="flex items-center gap-3">
        <label className="px-4 py-2 bg-cyan-500/10 rounded cursor-pointer border border-cyan-500/20 flex items-center gap-2">
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          {uploading ? (
            <>
              <Spinner size={1.25} />
              <span className="text-sm text-gray-300">Uploading...</span>
            </>
          ) : (
            'Select Image'
          )}
        </label>
        {preview && (
          <PhotoCard src={preview} name={label} status={uploading ? 'uploading' : 'done'} />
        )}
      </div>
      {error && <div className="text-sm text-red-400">{error}</div>}
      <div className="text-xs text-gray-500">After upload the returned Cloudinary URL will be saved.</div>
    </div>
  )
}
