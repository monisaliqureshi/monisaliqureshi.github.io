'use client'

import { useState } from 'react'
import { FiUpload, FiX, FiImage } from 'react-icons/fi'

interface MultipleImageUploadProps {
  value: string[]
  onChange: (filenames: string[]) => void
  label?: string
  maxFiles?: number
}

export default function MultipleImageUpload({ 
  value = [], 
  onChange, 
  label = 'Upload Images',
  maxFiles = 10 
}: MultipleImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // Check if adding these files would exceed max
    if (value.length + files.length > maxFiles) {
      setError(`Maximum ${maxFiles} images allowed`)
      return
    }

    setUploading(true)
    setError('')

    try {
      const uploadedFilenames: string[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        // Validate file type
        if (!file.type.startsWith('image/')) {
          setError(`${file.name} is not an image`)
          continue
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
          setError(`${file.name} is too large (max 5MB)`)
          continue
        }

        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`)
        }

        const data = await response.json()
        uploadedFilenames.push(data.filename)
      }

      onChange([...value, ...uploadedFilenames])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload images')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = (index: number) => {
    const newFilenames = value.filter((_, i) => i !== index)
    onChange(newFilenames)
  }

  const handleManualAdd = () => {
    const filename = prompt('Enter image filename (e.g., image.png):')
    if (filename) {
      onChange([...value, filename])
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-cyan-400">
        {label} {value.length > 0 && `(${value.length}/${maxFiles})`}
      </label>

      {/* Upload Buttons */}
      <div className="flex gap-2">
        <label className="flex-1 cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading || value.length >= maxFiles}
            className="hidden"
          />
          <div className={`
            px-4 py-2 rounded-lg border-2 border-dashed 
            ${uploading || value.length >= maxFiles 
              ? 'border-gray-600 bg-gray-800/50 cursor-not-allowed' 
              : 'border-cyan-500/30 bg-cyan-500/5 hover:border-cyan-500/50 hover:bg-cyan-500/10'
            }
            transition-all duration-300 text-center
          `}>
            <FiUpload className="inline-block mr-2" />
            {uploading ? 'Uploading...' : value.length >= maxFiles ? 'Max files reached' : 'Upload Images'}
          </div>
        </label>

        <button
          type="button"
          onClick={handleManualAdd}
          disabled={value.length >= maxFiles}
          className={`
            px-4 py-2 rounded-lg border-2 border-dashed
            ${value.length >= maxFiles
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

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      {/* Image Preview Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {value.map((filename, index) => (
            <div
              key={index}
              className="relative group rounded-lg overflow-hidden border-2 border-cyan-500/20 bg-gray-900/50 backdrop-blur-sm"
            >
              <div className="aspect-square relative">
                <img
                  src={`/assests/images/${filename}`}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23374151" width="100" height="100"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%239CA3AF" font-size="12">No Image</text></svg>'
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-1 right-1 p-1.5 rounded-full bg-red-500/80 hover:bg-red-500 
                           text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
              <div className="p-2 text-xs text-center text-gray-400 truncate">
                {filename}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Help text */}
      <p className="text-xs text-gray-500">
        Supported formats: JPG, PNG, SVG, WebP. Max size: 5MB per image. Max {maxFiles} images total.
      </p>
    </div>
  )
}
