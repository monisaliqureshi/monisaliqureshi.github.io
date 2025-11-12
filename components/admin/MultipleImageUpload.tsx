"use client"

import { useState, useEffect } from 'react'
import { FiUpload, FiX, FiImage } from 'react-icons/fi'
import { compressFileToDataUrl } from './imageHelpers'
import PhotoCard from './PhotoCard'

interface MultipleImageUploadProps {
  value: string[]
  onChange: (filenames: string[]) => void
  label?: string
  maxFiles?: number
}

type UploadItem = {
  id: string
  file: File
  previewUrl: string
  name: string
  originalSize: number
  status: 'pending' | 'too_large' | 'ready' | 'compressing' | 'uploading' | 'done' | 'error'
  compressedDataUrl?: string
  mime?: string
  base64?: string
  error?: string
}

export default function MultipleImageUpload({ 
  value = [], 
  onChange, 
  label = 'Upload Images',
  maxFiles = 10 
}: MultipleImageUploadProps) {
  const [items, setItems] = useState<UploadItem[]>([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    // cleanup object URLs when unmounting
    return () => {
      items.forEach((it) => URL.revokeObjectURL(it.previewUrl))
    }
  }, [items])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (value.length + items.length + files.length > maxFiles) {
      setError(`Maximum ${maxFiles} images allowed`)
      return
    }

    const newItems: UploadItem[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!file.type.startsWith('image/')) {
        setError(`${file.name} is not an image`)
        continue
      }

      const id = `${Date.now()}_${i}`
      const previewUrl = URL.createObjectURL(file)
      const status = file.size <= 5 * 1024 * 1024 ? 'ready' : 'too_large'

      newItems.push({
        id,
        file,
        previewUrl,
        name: file.name,
        originalSize: file.size,
        status,
      })
    }

    setItems((prev) => [...prev, ...newItems])
    // reset input value to allow re-selecting same files
    e.currentTarget.value = ''
  }

  const removeSelected = (id: string) => {
    setItems((prev) => {
      const next = prev.filter((p) => p.id !== id)
      return next
    })
  }

  const compressItem = async (id: string) => {
    setItems((prev) => prev.map((it) => it.id === id ? { ...it, status: 'compressing' } : it))
    const it = items.find((i) => i.id === id)
    if (!it) return
    try {
      const { dataUrl, mime, base64 } = await compressFileToDataUrl(it.file, 5 * 1024 * 1024)
      setItems((prev) => prev.map((p) => p.id === id ? { ...p, compressedDataUrl: dataUrl, mime, base64, status: 'ready' } : p))
    } catch (e) {
      setItems((prev) => prev.map((p) => p.id === id ? { ...p, status: 'error', error: 'Failed to compress' } : p))
    }
  }

  const uploadItem = async (id: string) => {
    const it = items.find((i) => i.id === id)
    if (!it) return
    if (it.status === 'too_large') return

    setItems((prev) => prev.map((p) => p.id === id ? { ...p, status: 'uploading' } : p))
    setUploading(true)
    setStatusMessage('Uploading...')

    try {
      // ensure we have base64 (compressFileToDataUrl will return original if already <= limit)
      let dataUrl = it.compressedDataUrl
      let mime = it.mime
      let base64 = it.base64
      if (!dataUrl) {
        setItems((prev) => prev.map((p) => p.id === id ? { ...p, status: 'compressing' } : p))
        const res = await compressFileToDataUrl(it.file, 5 * 1024 * 1024)
        dataUrl = res.dataUrl
        mime = res.mime
        base64 = res.base64
      }

      const payload = {
        filename: it.name.replace(/\s/g, '_'),
        mime: mime || 'image/png',
        base64,
      }

      const response = await fetch('/api/upload-base64', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.error || 'Upload failed')
      }

      // mark done and add to persisted value
      setItems((prev) => prev.map((p) => p.id === id ? { ...p, status: 'done' } : p))
      onChange([...value, dataUrl!])
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (e: any) {
      setItems((prev) => prev.map((p) => p.id === id ? { ...p, status: 'error', error: e.message || 'Upload failed' } : p))
      setError(e.message || 'Upload failed')
    } finally {
      setUploading(false)
      setStatusMessage('')
    }
  }

  const uploadAll = async () => {
    // only allowed when all items are ready
    const allReady = items.length > 0 && items.every((it) => it.status === 'ready')
    if (!allReady) return
    setUploading(true)
    setStatusMessage('Uploading...')
    try {
      for (const it of items) {
        await uploadItem(it.id)
      }
      // clear selected items after upload
      setItems([])
    } finally {
      setUploading(false)
      setStatusMessage('')
    }
  }

  const handleManualAdd = () => {
    const filename = prompt('Enter image filename (e.g., image.png):')
    if (filename) {
      onChange([...value, filename])
    }
  }

  return (
    <div className="space-y-3 relative">
      <label className="block text-sm font-medium text-cyan-400">
        {label} {(value.length + items.length) > 0 && `(${value.length + items.length}/${maxFiles})`}
      </label>

      {/* Upload Buttons */}
      <div className="flex gap-2">
        <label className="flex-1 cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading || value.length + items.length >= maxFiles}
            className="hidden"
          />
          <div className={`
            px-4 py-2 rounded-lg border-2 border-dashed 
            ${uploading || value.length + items.length >= maxFiles 
              ? 'border-gray-600 bg-gray-800/50 cursor-not-allowed' 
              : 'border-cyan-500/30 bg-cyan-500/5 hover:border-cyan-500/50 hover:bg-cyan-500/10'
            }
            transition-all duration-300 text-center
          `}>
            <FiUpload className="inline-block mr-2" />
            {uploading ? 'Uploading...' : value.length + items.length >= maxFiles ? 'Max files reached' : 'Select Images'}
          </div>
        </label>

        <button
          type="button"
          onClick={handleManualAdd}
          disabled={value.length + items.length >= maxFiles}
          className={`
            px-4 py-2 rounded-lg border-2 border-dashed
            ${value.length + items.length >= maxFiles
              ? 'border-gray-600 bg-gray-800/50 cursor-not-allowed'
              : 'border-purple-500/30 bg-purple-500/5 hover:border-purple-500/50 hover:bg-purple-500/10'
            }
            transition-all duration-300
          `}
        >
          <FiImage className="inline-block mr-2" />
          Add Manually
        </button>
      </div>

      {/* Selected files list (before upload) */}
      {items.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {items.map((it) => (
            <PhotoCard
              key={it.id}
              src={it.compressedDataUrl || it.previewUrl}
              name={it.name}
              status={it.status}
              error={it.error}
              onRemove={() => removeSelected(it.id)}
            >
              {it.status === 'too_large' && (
                <button onClick={() => compressItem(it.id)} className="px-3 py-1 bg-yellow-500 text-white rounded">Compress</button>
              )}
              {it.status === 'ready' && (
                <button onClick={() => uploadItem(it.id)} className="px-3 py-1 bg-cyan-500 text-white rounded">Upload</button>
              )}
            </PhotoCard>
          ))}
        </div>
      )}

      {/* Existing uploaded previews (value) */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {value.map((filename, index) => (
            <PhotoCard
              key={index}
              src={filename && filename.startsWith('data:') ? filename : `/assests/images/${filename}`}
              name={typeof filename === 'string' ? filename : `Image ${index + 1}`}
              status="done"
            />
          ))}
        </div>
      )}

      {/* Upload all button: only visible when there is at least one selected and all selected are ready */}
      {items.length > 0 && items.every((it) => it.status === 'ready') && (
        <div className="mt-3">
          <button onClick={uploadAll} className="px-4 py-2 bg-cyan-500 text-white rounded">Upload all</button>
        </div>
      )}

      {/* Inline success */}
      {showSuccess && <div className="text-sm text-green-400 mt-2">Images uploaded</div>}

      {/* Overlay to prevent interaction while uploading/compressing */}
      {uploading && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/30 rounded-lg">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <div className="text-sm text-white">{statusMessage || 'Uploading...'}</div>
          </div>
        </div>
      )}

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      {/* Help text */}
      <p className="text-xs text-gray-500">
        Supported formats: JPG, PNG, SVG, WebP. Max size: 5MB per image. Max {maxFiles} images total.
      </p>
    </div>
  )
}
