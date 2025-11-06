'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { FiLogOut, FiUser, FiCode, FiBriefcase, FiBook, FiAward, FiMail, FiSettings, FiFileText } from 'react-icons/fi'

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/admin/login')
    } else {
      setUser(session.user)
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 admin-bg" />
        <motion.div
          className="relative"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full" />
        </motion.div>
      </div>
    )
  }

  const sections = [
    { name: 'Greeting', icon: FiUser, href: '/admin/dashboard/greeting', gradient: 'from-cyan-500 to-blue-500' },
    { name: 'Skills', icon: FiCode, href: '/admin/dashboard/skills', gradient: 'from-green-500 to-emerald-500' },
    { name: 'Experience', icon: FiBriefcase, href: '/admin/dashboard/experience', gradient: 'from-purple-500 to-pink-500' },
    { name: 'Projects', icon: FiBook, href: '/admin/dashboard/projects', gradient: 'from-yellow-500 to-orange-500' },
    { name: 'Education', icon: FiBook, href: '/admin/dashboard/education', gradient: 'from-pink-500 to-rose-500' },
    { name: 'Certifications', icon: FiAward, href: '/admin/dashboard/certifications', gradient: 'from-indigo-500 to-purple-500' },
    { name: 'News', icon: FiFileText, href: '/admin/news', gradient: 'from-teal-500 to-cyan-500' },
    { name: 'Contact', icon: FiMail, href: '/admin/dashboard/contact', gradient: 'from-red-500 to-pink-500' },
    { name: 'Settings', icon: FiSettings, href: '/admin/dashboard/settings', gradient: 'from-gray-500 to-slate-500' },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 -z-10 admin-bg" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-magenta-500/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <header className="glass border-b border-cyan-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <motion.div
                className="w-10 h-10 gradient-border rounded-lg flex items-center justify-center"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <FiSettings className="text-cyan-400 text-xl" />
              </motion.div>
              <h1 className="text-2xl font-bold gradient-text">
                Admin Dashboard
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="glass px-4 py-2 rounded-lg">
                <span className="text-gray-300 text-sm">{user?.email}</span>
              </div>
              <motion.button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <FiLogOut className="relative z-10" />
                <span className="relative z-10">Logout</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back! 👋</h2>
          <p className="text-gray-400">Manage your portfolio content from here</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <Link href={section.href}>
                <motion.div
                  className="glass p-6 rounded-xl hover-card relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Gradient Background on Hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                  
                  {/* Icon Container */}
                  <motion.div
                    className={`w-14 h-14 rounded-lg bg-gradient-to-br ${section.gradient} flex items-center justify-center mb-4 relative`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <section.icon className="text-white text-2xl" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all duration-300">
                    {section.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Manage {section.name.toLowerCase()}
                  </p>

                  {/* Arrow Icon */}
                  <motion.div
                    className="absolute bottom-4 right-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    →
                  </motion.div>

                  {/* Corner Accent */}
                  <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-cyan-400/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          <div className="glass p-6 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <FiCode className="text-white text-xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Sections</p>
                <p className="text-2xl font-bold text-white">{sections.length}</p>
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <FiUser className="text-white text-xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Account</p>
                <p className="text-lg font-bold text-white">Admin</p>
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✓
                </motion.div>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Status</p>
                <p className="text-lg font-bold text-green-400">Active</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
