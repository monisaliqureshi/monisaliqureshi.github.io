'use client'

import { useState } from 'react'
import { FiUpload, FiX, FiImage } from 'react-icons/fi'

interface ImageUploadProps {
  label: string
  value: string
  onChange: (filename: string) => void
  placeholder?: string
  required?: boolean
}

export default function ImageUpload({ label, value, onChange, placeholder, required }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(value ? `/assests/images/${value}` : '')
  const [error, setError] = useState('')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Only images are allowed (JPG, PNG, SVG, WebP)')
      return
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      setError('File too large. Maximum size is 5MB')
      return
    }

    setError('')
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Upload failed')
      }

      const data = await response.json()
      onChange(data.filename)
      setPreview(data.path)
    } catch (err: any) {
      setError(err.message || 'Failed to upload image')
      console.error('Upload error:', err)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    onChange('')
    setPreview('')
    setError('')
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-gray-300">
        {label} {required && <span className="text-cyan-400">*</span>}
      </label>
      
      <div className="space-y-3">
        {/* Preview */}
        {preview && (
          <div className="relative w-32 h-32 glass rounded-lg overflow-hidden group">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain p-2"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FiX className="text-sm" />
            </button>
          </div>
        )}

        {/* Upload Button */}
        <div className="flex gap-2">
          <label className="flex-1 cursor-pointer">
            <div className="flex items-center justify-center gap-2 px-4 py-2 glass rounded-lg hover:bg-white/10 transition-all border border-cyan-500/30">
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                  <span className="text-gray-300">Uploading...</span>
                </>
              ) : (
                <>
                  <FiUpload className="text-cyan-400" />
                  <span className="text-gray-300">
                    {preview ? 'Change Image' : 'Upload Image'}
                  </span>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/svg+xml,image/webp"
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>

        {/* Manual filename input (optional) */}
        <div className="flex items-center gap-2">
          <FiImage className="text-gray-500" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || 'Or enter filename manually (e.g., logo.png)'}
            className="flex-1 px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all text-white placeholder-gray-500 text-sm"
          />
        </div>

        {/* Error message */}
        {error && (
          <p className="text-red-400 text-sm flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            {error}
          </p>
        )}

        {/* Help text */}
        <p className="text-xs text-gray-500">
          Supported: JPG, PNG, SVG, WebP • Max size: 5MB
        </p>
      </div>
    </div>
  )
}
