'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import useSWR, { mutate } from 'swr'
import { getGreeting } from '@/lib/api'
import { FiArrowLeft, FiSave, FiUser } from 'react-icons/fi'

export default function GreetingAdmin() {
  const router = useRouter()
  const { data: greeting } = useSWR('greeting', getGreeting)
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    title2: '',
    nickname: '',
    full_name: '',
    subtitle: '',
    resume_link: '',
    mail: '',
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (greeting) {
      setFormData(greeting)
    }
  }, [greeting])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) router.push('/admin/login')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      await fetch('/api/greeting', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      mutate('greeting')
      alert('Greeting updated successfully!')
    } catch (error) {
      console.error('Error saving greeting:', error)
      alert('Failed to update greeting')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 -z-10" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto max-w-4xl p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
              <FiUser className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Manage Greeting</h1>
              <p className="text-gray-400 text-sm">Update your portfolio greeting section</p>
            </div>
          </div>
          <motion.button
            onClick={() => router.push('/admin/dashboard')}
            className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-gray-300 hover:text-white hover:border-cyan-500/50 border border-transparent transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowLeft />
            Back
          </motion.button>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-8 rounded-2xl relative overflow-hidden"
        >
          {/* Corner Accents */}
          <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-cyan-400/30 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-purple-400/30 rounded-bl-lg" />

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Title <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                  placeholder="Hello 👋"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Title 2 (Name) <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title2}
                  onChange={(e) => setFormData({ ...formData, title2: e.target.value })}
                  className="w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                  placeholder="Monis"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Nickname <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nickname}
                  onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                  className="w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                  placeholder="Your nickname"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Full Name <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                  placeholder="Your full name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Subtitle <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                placeholder="AI Engineer, Data Scientist..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Resume Link
              </label>
              <input
                type="url"
                value={formData.resume_link}
                onChange={(e) => setFormData({ ...formData, resume_link: e.target.value })}
                className="w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                placeholder="https://example.com/resume.pdf"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Email (mailto: link)
              </label>
              <input
                type="text"
                value={formData.mail}
                onChange={(e) => setFormData({ ...formData, mail: e.target.value })}
                className="w-full px-4 py-3 glass rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                placeholder="mailto:your@email.com"
              />
            </div>

            <motion.button
              type="submit"
              disabled={saving}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-semibold relative overflow-hidden group disabled:opacity-50"
              whileHover={{ scale: saving ? 1 : 1.02 }}
              whileTap={{ scale: saving ? 1 : 0.98 }}
            >
              {!saving && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-magenta-500"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                <FiSave />
                {saving ? 'Saving...' : 'Update Greeting'}
              </span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
