'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import useSWR, { mutate } from 'swr'
import { getContact } from '@/lib/api'
import { motion } from 'framer-motion'
import { FiMail } from 'react-icons/fi'

export default function ContactAdmin() {
  const router = useRouter()
  const { data: contact } = useSWR('contact', getContact)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    profile_image_path: '',
    description: '',
    blog_title: '',
    blog_subtitle: '',
    blog_link: '',
  })

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (contact) {
      setFormData(contact)
    }
  }, [contact])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) router.push('/admin/login')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      mutate('contact')
      alert('Contact info updated successfully!')
    } catch (error) {
      console.error('Error saving contact:', error)
      alert('Failed to update contact')
    }
    setSaving(false)
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

      <div className="container mx-auto p-6 relative z-10 max-w-4xl">
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
          <h1 className="text-3xl font-bold gradient-text">Manage Contact Info</h1>
        </motion.div>

        <motion.div 
          className="glass p-8 rounded-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Corner Accents */}
          <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-cyan-400/30 rounded-tr-xl"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-purple-400/30 rounded-bl-xl"></div>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <FiMail className="text-white text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-white">Contact Information</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Section Title <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all text-white placeholder-gray-500"
                placeholder="Contact Me"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Description <span className="text-cyan-400">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all text-white placeholder-gray-500"
                rows={3}
                placeholder="A brief introduction for the contact section..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Blog/Hire Section Title
              </label>
              <input
                type="text"
                value={formData.blog_title}
                onChange={(e) => setFormData({ ...formData, blog_title: e.target.value })}
                className="w-full px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all text-white placeholder-gray-500"
                placeholder="Hire Me"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Blog/Hire Subtitle
              </label>
              <input
                type="text"
                value={formData.blog_subtitle}
                onChange={(e) => setFormData({ ...formData, blog_subtitle: e.target.value })}
                className="w-full px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all text-white placeholder-gray-500"
                placeholder="Available for freelance work"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Blog/Hire Link
              </label>
              <input
                type="url"
                value={formData.blog_link}
                onChange={(e) => setFormData({ ...formData, blog_link: e.target.value })}
                className="w-full px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all text-white placeholder-gray-500"
                placeholder="https://upwork.com/..."
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-magenta-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-magenta-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center justify-center gap-2">
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  'Update Contact Info'
                )}
              </span>
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
