'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import useSWR, { mutate } from 'swr'
import { getSkills } from '@/lib/api'
import { motion } from 'framer-motion'
import { FiCpu, FiEdit2, FiTrash2 } from 'react-icons/fi'

export default function SkillsAdmin() {
  const router = useRouter()
  const { data: skills, error } = useSWR('skills', getSkills)
  const [editing, setEditing] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    skills_list: [''],
    software_skills: [{ skillName: '', fontAwesomeClassname: '', style: { color: '' } }],
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
        await fetch(`/api/skills/${editing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
      } else {
        await fetch('/api/skills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
      }
      
      mutate('skills')
      resetForm()
    } catch (error) {
      console.error('Error saving skill:', error)
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return
    
    try {
      await fetch(`/api/skills/${id}`, { method: 'DELETE' })
      mutate('skills')
    } catch (error) {
      console.error('Error deleting skill:', error)
    }
  }

  const resetForm = () => {
    setEditing(null)
    setFormData({
      title: '',
      skills_list: [''],
      software_skills: [{ skillName: '', fontAwesomeClassname: '', style: { color: '' } }],
      order_index: 0,
    })
  }

  const editSkill = (skill: any) => {
    setEditing(skill)
    setFormData({
      title: skill.title,
      skills_list: skill.skills_list,
      software_skills: skill.software_skills,
      order_index: skill.order_index,
    })
  }

  const removeSkill = (index: number) => {
    const newList = formData.skills_list.filter((_, i) => i !== index)
    setFormData({ ...formData, skills_list: newList.length ? newList : [''] })
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
          <h1 className="text-3xl font-bold gradient-text">Manage Skills</h1>
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
                <FiCpu className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                {editing ? 'Edit Skill' : 'Add New Skill'}
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
                  placeholder="e.g., Full Stack Development"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Skills List <span className="text-cyan-400">*</span>
                </label>
                <div className="space-y-2">
                  {formData.skills_list.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => {
                          const newList = [...formData.skills_list]
                          newList[index] = e.target.value
                          setFormData({ ...formData, skills_list: newList })
                        }}
                        className="flex-1 px-4 py-2 glass rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all text-white placeholder-gray-500"
                        placeholder="⚡ Skill description"
                      />
                      {formData.skills_list.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSkill(index)}
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
                  onClick={() => setFormData({ ...formData, skills_list: [...formData.skills_list, ''] })}
                  className="mt-2 text-cyan-400 hover:text-cyan-300 text-sm transition-colors flex items-center gap-1"
                >
                  <span>+</span> Add More Skill
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
                  placeholder="Display order"
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
                      <>{editing ? 'Update' : 'Add'} Skill</>
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
            
            <h2 className="text-2xl font-bold mb-6 text-white">Existing Skills</h2>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {skills?.map((skill: any, index: number) => (
                <motion.div 
                  key={skill.id} 
                  className="glass p-4 rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg text-white">{skill.title}</h3>
                    <span className="text-xs px-2 py-1 glass rounded-full text-cyan-400">
                      Order: {skill.order_index}
                    </span>
                  </div>
                  
                  {skill.skills_list && skill.skills_list.length > 0 && (
                    <div className="mb-3 text-sm text-gray-400">
                      {skill.skills_list.slice(0, 2).map((s: string, i: number) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-cyan-400">⚡</span>
                          <span>{s}</span>
                        </div>
                      ))}
                      {skill.skills_list.length > 2 && (
                        <span className="text-xs text-gray-500 ml-6">
                          +{skill.skills_list.length - 2} more
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => editSkill(skill)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-orange-500 hover:to-yellow-500 transition-all text-sm font-medium"
                    >
                      <FiEdit2 className="text-xs" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
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
