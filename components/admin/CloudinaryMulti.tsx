"use client"

import { useState, useEffect } from 'react'
import Spinner from '@/components/common/Spinner'
import PhotoCard from './PhotoCard'

type PhotoObj = { url: string; public_id?: string }

interface Props {
  label?: string
  value?: PhotoObj[]
  onChange: (photos: PhotoObj[]) => void
  newsId?: string | null
}

export default function CloudinaryMulti({ label = 'Upload Photos', value = [], onChange, newsId = null }: Props) {
  const [items, setItems] = useState<Array<PhotoObj & { status?: string }>>(value.map((p) => ({ ...p, status: 'done' })))
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  // Keep internal items in sync when parent `value` changes (e.g., form reset)
  // This makes the component controlled-like: when parent clears `photosMeta`,
  // the gallery preview will also clear.
  useEffect(() => {
    try {
      const next = (value || []).map((p) => ({ ...p, status: 'done' }))
      setItems(next)
    } catch (e) {
      // ignore
    }
  }, [value])
  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const filesArr = Array.from(files)
    for (const file of filesArr) {
      if (!file.type.startsWith('image/')) continue
      const id = `${Date.now()}_${file.name}`
      const reader = new FileReader()
      reader.onload = async () => {
        const dataUrl = reader.result as string
        // add temp preview with uploading status
        setItems((prev) => [...prev, { url: dataUrl, status: 'uploading' } as any])
        try {
          setUploading(true)
          const payload = { base64: dataUrl, filename: file.name }
          const res = await fetch('/api/cloudinary-upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
          if (!res.ok) throw new Error('Upload failed')
          const data = await res.json()
          const photo: PhotoObj = { url: data.eagerUrl || data.transformedUrl || data.url, public_id: data.public_id }
          // replace the temp item with returned photo and notify parent
          setItems((prev) => {
            const next = prev.map((p) => (p.url === dataUrl ? { ...photo, status: 'done' } : p))
            // inform parent with normalized photo objects
            try {
              onChange(next.map((p) => ({ url: p.url, public_id: p.public_id })))
            } catch (e) {
              /* ignore */
            }
            return next
          })
        } catch (err: any) {
          setError(err.message || 'Upload failed')
          setItems((prev) => prev.map((p) => p.url === dataUrl ? { ...p, status: 'error', error: err.message } : p))
        } finally {
          setUploading(false)
        }
      }
      reader.readAsDataURL(file)
    }
    // reset input
    e.currentTarget.value = ''
  }

  const handleRemove = async (idx: number) => {
    const target = items[idx]
    if (!target) return
    const public_id = (target as any).public_id
    const url = target.url
    try {
      // remove from Cloudinary if we have public_id
      if (public_id) {
        await fetch('/api/cloudinary-delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ public_id, newsId, photoUrl: url }),
        })
      } else if (newsId) {
        // if no public_id but saved on news, still remove from DB by url
        await fetch('/api/cloudinary-delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newsId, photoUrl: url }),
        })
      }
    } catch (e) {
      // don't block UI; log
      console.error('Failed to delete remote asset', e)
    }

    // remove locally and inform parent
    const next = items.filter((_, i) => i !== idx)
    setItems(next)
    onChange(next.map((p) => ({ url: p.url, public_id: p.public_id })))
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      <div className="flex items-center gap-3">
        <label className="px-4 py-2 bg-cyan-500/10 rounded cursor-pointer border border-cyan-500/20 flex items-center gap-2">
          <input type="file" accept="image/*" onChange={handleFiles} multiple className="hidden" />
          {uploading ? (
            <>
              <Spinner size={1} />
              <span className="text-sm text-gray-300">Uploading...</span>
            </>
          ) : (
            'Select Images'
          )}
        </label>
      </div>

      {error && <div className="text-sm text-red-400">{error}</div>}

      {items.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {items.map((it, idx) => (
            <PhotoCard key={idx} src={it.url} name={`Photo ${idx + 1}`} status={(it as any).status as any} onRemove={() => handleRemove(idx)} />
          ))}
        </div>
      )}
    </div>
  )
}
