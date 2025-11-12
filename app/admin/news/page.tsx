'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FiPlus, FiEdit, FiTrash2, FiSave, FiX } from 'react-icons/fi'
import ImageUpload from '@/components/admin/ImageUpload'
import MultipleImageUpload from '@/components/admin/MultipleImageUpload'
import RichTextEditor from '@/components/admin/RichTextEditor'

interface NewsItem {
  id?: string
  title: string
  subtitle: string
  date_from: string
  date_to: string
  location: string
  thumbnail_filename: string
  photos: string[]
  description: string
  order_index: number
}

export default function NewsManagement() {
  const router = useRouter()
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [busyMessage, setBusyMessage] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const [formData, setFormData] = useState<NewsItem>({
    title: '',
    subtitle: '',
    date_from: '',
    date_to: '',
    location: '',
    thumbnail_filename: '',
    photos: [],
    description: '',
    order_index: 0,
  })

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news')
      const data = await response.json()
      
      // Ensure we always set an array, even if there's an error or unexpected data
      if (Array.isArray(data)) {
        setNewsItems(data)
      } else {
        console.error('API returned non-array data:', data)
        setNewsItems([])
      }
    } catch (error) {
      console.error('Failed to fetch news:', error)
      setNewsItems([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setBusy(true)
      setBusyMessage(editingId ? 'Updating news...' : 'Adding news...')
      const url = '/api/news'
      const method = editingId ? 'PUT' : 'POST'
      const body = editingId ? { ...formData, id: editingId } : formData

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!response.ok) throw new Error('Failed to save news')

      await fetchNews()
      resetForm()
      setToastMessage(editingId ? 'News updated' : 'News added')
      setTimeout(() => setToastMessage(''), 3000)
    } catch (error) {
      console.error('Failed to save news:', error)
      alert('Failed to save news item')
    } finally {
      setBusy(false)
      setBusyMessage('')
    }
  }

  const handleEdit = (item: NewsItem) => {
    setEditingId(item.id || null)
    setFormData({
      title: item.title,
      subtitle: item.subtitle,
      date_from: item.date_from,
      date_to: item.date_to,
      location: item.location,
      thumbnail_filename: item.thumbnail_filename,
      photos: Array.isArray(item.photos) ? item.photos : [],
      description: item.description,
      order_index: item.order_index,
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news item?')) return
    try {
      setBusy(true)
      setBusyMessage('Deleting news...')
      const response = await fetch(`/api/news?id=${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete news')
      await fetchNews()
      setToastMessage('News deleted')
      setTimeout(() => setToastMessage(''), 3000)
    } catch (error) {
      console.error('Failed to delete news:', error)
      alert('Failed to delete news item')
    } finally {
      setBusy(false)
      setBusyMessage('')
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({
      title: '',
      subtitle: '',
      date_from: '',
      date_to: '',
      location: '',
      thumbnail_filename: '',
      photos: [],
      description: '',
      order_index: newsItems.length,
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-cyan-400 text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      {/* Global busy overlay */}
      {busy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="flex flex-col items-center gap-3 bg-gray-900/70 p-6 rounded-lg">
            <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <div className="text-white">{busyMessage || 'Processing...'}</div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-60 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">{toastMessage}</div>
        )}
        {/* Header with Back Button */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="px-4 py-2 rounded-lg border-2 border-cyan-500/30 bg-cyan-500/10 
                     text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/50 
                     transition-all duration-300 font-medium"
          >
            ← Back
          </button>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
            News Management
          </h1>
        </div>

        {/* Form */}
        <div className="mb-8 p-6 rounded-2xl border-2 border-cyan-500/20 bg-gray-900/50 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-cyan-500/20 bg-gray-900/50 
                           text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 
                           focus:ring-cyan-500/20 transition-all duration-300"
                  placeholder="Enter title"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-cyan-500/20 bg-gray-900/50 
                           text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 
                           focus:ring-cyan-500/20 transition-all duration-300"
                  placeholder="Enter subtitle"
                />
              </div>

              {/* Date From */}
              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-2">
                  Date From *
                </label>
                <input
                  type="text"
                  required
                  value={formData.date_from}
                  onChange={(e) => setFormData({ ...formData, date_from: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-cyan-500/20 bg-gray-900/50 
                           text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 
                           focus:ring-cyan-500/20 transition-all duration-300"
                  placeholder="e.g., Jan 2024"
                />
              </div>

              {/* Date To */}
              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-2">
                  Date To
                </label>
                <input
                  type="text"
                  value={formData.date_to}
                  onChange={(e) => setFormData({ ...formData, date_to: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-cyan-500/20 bg-gray-900/50 
                           text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 
                           focus:ring-cyan-500/20 transition-all duration-300"
                  placeholder="e.g., Present or Mar 2024"
                />
              </div>

              {/* Location */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-cyan-400 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-cyan-500/20 bg-gray-900/50 
                           text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 
                           focus:ring-cyan-500/20 transition-all duration-300"
                  placeholder="e.g., San Francisco, CA"
                />
              </div>

              {/* Order Index */}
              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-2">
                  Order Index
                </label>
                <input
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 rounded-lg border-2 border-cyan-500/20 bg-gray-900/50 
                           text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 
                           focus:ring-cyan-500/20 transition-all duration-300"
                />
              </div>
            </div>

            {/* Thumbnail */}
            <ImageUpload
              value={formData.thumbnail_filename}
              onChange={(filename) => setFormData({ ...formData, thumbnail_filename: filename })}
              label="Thumbnail Image"
            />

            {/* Photos */}
            <MultipleImageUpload
              value={formData.photos}
              onChange={(photos) => setFormData({ ...formData, photos })}
              label="Gallery Photos"
              maxFiles={20}
            />

            {/* Description */}
            <RichTextEditor
              value={formData.description}
              onChange={(description) => setFormData({ ...formData, description })}
              label="Description"
              format="html"
            />

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 
                         text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 
                         transition-all duration-300"
              >
                <FiSave className="inline mr-2" />
                {editingId ? 'Update News' : 'Add News'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 rounded-lg border-2 border-red-500/50 text-red-400 
                           hover:bg-red-500/10 transition-all duration-300"
                >
                  <FiX className="inline mr-2" />
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* News List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">
            Existing News ({newsItems.length})
          </h2>
          {newsItems.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No news items yet. Add your first one above!
            </div>
          ) : (
            newsItems.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-xl border-2 border-purple-500/20 bg-gray-900/30 
                         backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      {item.thumbnail_filename && (
                        <img
                          src={item.thumbnail_filename && item.thumbnail_filename.startsWith('data:') ? item.thumbnail_filename : `/assests/images/${item.thumbnail_filename}`}
                          alt={item.title}
                          className="w-24 h-24 rounded-lg object-cover border-2 border-cyan-500/20"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {item.title}
                        </h3>
                        {item.subtitle && (
                          <p className="text-purple-400 mb-2">{item.subtitle}</p>
                        )}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-2">
                          <span>📅 {item.date_from}{item.date_to ? ` - ${item.date_to}` : ''}</span>
                          {item.location && <span>📍 {item.location}</span>}
                          {item.photos && item.photos.length > 0 && (
                            <span>📸 {item.photos.length} photos</span>
                          )}
                        </div>
                        <div 
                          className="text-gray-400 line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 
                               text-cyan-400 hover:bg-cyan-500/20 transition-all duration-300"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id!)}
                      className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 
                               text-red-400 hover:bg-red-500/20 transition-all duration-300"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
