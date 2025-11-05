'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { FiSettings } from 'react-icons/fi'

export default function SettingsAdmin() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    is_splash: true,
    use_custom_cursor: false,
    google_tracking_id: '',
  })

  useEffect(() => {
    checkAuth()
    loadSettings()
  }, [])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) router.push('/admin/login')
  }

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single()

      if (data) {
        setFormData({
          is_splash: data.is_splash,
          use_custom_cursor: data.use_custom_cursor,
          google_tracking_id: data.google_tracking_id || '',
        })
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      const { data: existing } = await supabase
        .from('settings')
        .select('id')
        .single()

      if (existing) {
        await supabase
          .from('settings')
          .update(formData)
          .eq('id', existing.id)
      } else {
        await supabase
          .from('settings')
          .insert(formData)
      }
      
      alert('Settings updated successfully!')
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Failed to update settings')
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
          <h1 className="text-3xl font-bold gradient-text">Site Settings</h1>
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
              <FiSettings className="text-white text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-white">General Settings</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="glass p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  id="is_splash"
                  checked={formData.is_splash}
                  onChange={(e) => setFormData({ ...formData, is_splash: e.target.checked })}
                  className="w-5 h-5 rounded border-2 border-cyan-500 text-cyan-500 focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                />
                <label htmlFor="is_splash" className="text-sm font-medium text-white cursor-pointer">
                  Enable Splash Screen
                  <p className="text-xs text-gray-400 font-normal mt-1">Show animated splash screen on site load</p>
                </label>
              </div>
            </div>

            <div className="glass p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  id="use_custom_cursor"
                  checked={formData.use_custom_cursor}
                  onChange={(e) => setFormData({ ...formData, use_custom_cursor: e.target.checked })}
                  className="w-5 h-5 rounded border-2 border-cyan-500 text-cyan-500 focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                />
                <label htmlFor="use_custom_cursor" className="text-sm font-medium text-white cursor-pointer">
                  Use Custom Cursor
                  <p className="text-xs text-gray-400 font-normal mt-1">Replace default cursor with custom design</p>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Google Analytics Tracking ID
              </label>
              <input
                type="text"
                value={formData.google_tracking_id}
                onChange={(e) => setFormData({ ...formData, google_tracking_id: e.target.value })}
                className="w-full px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all text-white placeholder-gray-500"
                placeholder="G-XXXXXXXXXX"
              />
              <p className="text-xs text-gray-500 mt-2">Optional: Add your Google Analytics tracking ID for website analytics</p>
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
                  'Update Settings'
                )}
              </span>
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
