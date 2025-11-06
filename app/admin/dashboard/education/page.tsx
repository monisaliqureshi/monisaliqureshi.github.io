'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import useSWR, { mutate } from 'swr'
import { getEducation } from '@/lib/api'
import { motion } from 'framer-motion'
import { FiBook, FiEdit2, FiTrash2 } from 'react-icons/fi'
import ImageUpload from '@/components/admin/ImageUpload'

export default function EducationAdmin() {
  const router = useRouter()
  const { data: education } = useSWR('education', getEducation)
  const [editing, setEditing] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    logo_filename: '',
    alt_name: '',
    duration: '',
    descriptions: [''],
    website_link: '',
    order_index: 0,
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) router.push('/admin/login')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      if (editing) {
        await fetch(`/api/education/${editing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
      } else {
        await fetch('/api/education', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
      }
      
      mutate('education')
      resetForm()
    } catch (error) {
      console.error('Error saving education:', error)
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this education entry?')) return
    
    try {
      await fetch(`/api/education/${id}`, { method: 'DELETE' })
      mutate('education')
    } catch (error) {
      console.error('Error deleting education:', error)
    }
  }

  const resetForm = () => {
    setEditing(null)
    setFormData({
      title: '',
      subtitle: '',
      logo_filename: '',
      alt_name: '',
      duration: '',
      descriptions: [''],
      website_link: '',
      order_index: 0,
    })
  }

  const editEducation = (edu: any) => {
    setEditing(edu)
    setFormData({
      title: edu.title,
      subtitle: edu.subtitle,
      logo_filename: edu.logo_filename || '',
      alt_name: edu.alt_name || '',
      duration: edu.duration,
      descriptions: edu.descriptions,
      website_link: edu.website_link || '',
      order_index: edu.order_index,
    })
  }

  const removeDescription = (index: number) => {
    const newList = formData.descriptions.filter((_, i) => i !== index)
    setFormData({ ...formData, descriptions: newList.length ? newList : [''] })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          style={{ bottom: '10%', right: '10%' }}
        />
      </div>

      <div className="container mx-auto p-6 relative z-10">
        <motion.div 
          className="mb-6 flex items-center gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="px-4 py-2 glass rounded-lg hover:bg-white/20 transition-all duration-300"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold gradient-text">Manage Education</h1>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form Card */}
          <motion.div 
            className="glass p-6 rounded-xl relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Corner Accents */}
            <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-cyan-400/30 rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-purple-400/30 rounded-bl-xl"></div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <FiBook className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                {editing ? 'Edit Education' : 'Add New Education'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Institution <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all text-white placeholder-gray-500"
                  placeholder="e.g., Stanford University"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Degree <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all text-white placeholder-gray-500"
                  placeholder="e.g., Bachelor of Science in Computer Science"
                  required
                />
              </div>

              <ImageUpload
                label="Institute Logo"
                value={formData.logo_filename}
                onChange={(filename) => setFormData({ ...formData, logo_filename: filename })}
                placeholder="e.g., university-logo.png"
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Duration <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all text-white placeholder-gray-500"
                    placeholder="2020 - 2024"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Website Link
                  </label>
                  <input
                    type="url"
                    value={formData.website_link}
                    onChange={(e) => setFormData({ ...formData, website_link: e.target.value })}
                    className="w-full px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all text-white placeholder-gray-500"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Descriptions
                </label>
                <div className="space-y-2">
                  {formData.descriptions.map((desc, index) => (
                    <div key={index} className="flex gap-2">
                      <textarea
                        value={desc}
                        onChange={(e) => {
                          const newList = [...formData.descriptions]
                          newList[index] = e.target.value
                          setFormData({ ...formData, descriptions: newList })
                        }}
                        className="flex-1 px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all text-white placeholder-gray-500"
                        rows={2}
                        placeholder="Achievement or course highlight..."
                      />
                      {formData.descriptions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDescription(index)}
                          className="px-3 py-2 glass rounded-lg hover:bg-red-500/20 text-red-400 transition-all"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, descriptions: [...formData.descriptions, ''] })}
                  className="mt-2 text-cyan-400 hover:text-cyan-300 text-sm transition-colors flex items-center gap-1"
                >
                  <span>+</span> Add Description
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Order Index
                </label>
                <input
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all text-white placeholder-gray-500"
                  placeholder="0"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-magenta-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-magenta-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center justify-center gap-2">
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>{editing ? 'Update' : 'Add'} Education</>
                    )}
                  </span>
                </button>
                {editing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 glass rounded-lg hover:bg-white/20 transition-all duration-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </motion.div>

          {/* List Card */}
          <motion.div 
            className="glass p-6 rounded-xl relative overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-purple-400/30 rounded-tr-xl"></div>
            
            <h2 className="text-2xl font-bold mb-6 text-white">Existing Education</h2>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {education?.map((edu: any, index: number) => (
                <motion.div 
                  key={edu.id} 
                  className="glass p-4 rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-white">{edu.title}</h3>
                      <p className="text-sm text-gray-400">{edu.subtitle}</p>
                      <p className="text-xs text-gray-500">{edu.duration}</p>
                    </div>
                    <span className="text-xs px-2 py-1 glass rounded-full text-cyan-400">
                      Order: {edu.order_index}
                    </span>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => editEducation(edu)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-orange-500 hover:to-yellow-500 transition-all text-sm font-medium"
                    >
                      <FiEdit2 className="text-xs" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(edu.id)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-pink-500 hover:to-red-500 transition-all text-sm font-medium"
                    >
                      <FiTrash2 className="text-xs" />
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
