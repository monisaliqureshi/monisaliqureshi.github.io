'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import useSWR, { mutate } from 'swr'
import { getCertifications } from '@/lib/api'
import { motion } from 'framer-motion'
import { FiAward, FiEdit2, FiTrash2 } from 'react-icons/fi'
import ImageUpload from '@/components/admin/ImageUpload'

export default function CertificationsAdmin() {
  const router = useRouter()
  const { data: certifications } = useSWR('certifications', getCertifications)
  const [editing, setEditing] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    logo_filename: '',
    certificate_link: '',
    alt_name: '',
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
        await fetch(`/api/certifications/${editing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
      } else {
        await fetch('/api/certifications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
      }
      
      mutate('certifications')
      resetForm()
    } catch (error) {
      console.error('Error saving certification:', error)
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certification?')) return
    
    try {
      await fetch(`/api/certifications/${id}`, { method: 'DELETE' })
      mutate('certifications')
    } catch (error) {
      console.error('Error deleting certification:', error)
    }
  }

  const resetForm = () => {
    setEditing(null)
    setFormData({
      title: '',
      subtitle: '',
      logo_filename: '',
      certificate_link: '',
      alt_name: '',
      order_index: 0,
    })
  }

  const editCertification = (cert: any) => {
    setEditing(cert)
    setFormData({
      title: cert.title,
      subtitle: cert.subtitle,
      logo_filename: cert.logo_filename || '',
      certificate_link: cert.certificate_link || '',
      alt_name: cert.alt_name || '',
      order_index: cert.order_index,
    })
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
          <h1 className="text-3xl font-bold gradient-text">Manage Certifications</h1>
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
                <FiAward className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                {editing ? 'Edit Certification' : 'Add New Certification'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Title <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all text-white placeholder-gray-500"
                  placeholder="e.g., AWS Certified Solutions Architect"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Subtitle / Issuer <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all text-white placeholder-gray-500"
                  placeholder="e.g., Amazon Web Services"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Certificate Link
                </label>
                <input
                  type="url"
                  value={formData.certificate_link}
                  onChange={(e) => setFormData({ ...formData, certificate_link: e.target.value })}
                  className="w-full px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all text-white placeholder-gray-500"
                  placeholder="https://..."
                />
              </div>

              <ImageUpload
                label="Certification Logo"
                value={formData.logo_filename}
                onChange={(filename) => setFormData({ ...formData, logo_filename: filename })}
                placeholder="e.g., aws-cert.png"
              />

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
                      <>{editing ? 'Update' : 'Add'} Certification</>
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
            
            <h2 className="text-2xl font-bold mb-6 text-white">Existing Certifications</h2>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {certifications?.map((cert: any, index: number) => (
                <motion.div 
                  key={cert.id} 
                  className="glass p-4 rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-white">{cert.title}</h3>
                      <p className="text-sm text-gray-400">{cert.subtitle}</p>
                    </div>
                    <span className="text-xs px-2 py-1 glass rounded-full text-cyan-400">
                      Order: {cert.order_index}
                    </span>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => editCertification(cert)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-orange-500 hover:to-yellow-500 transition-all text-sm font-medium"
                    >
                      <FiEdit2 className="text-xs" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cert.id)}
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
