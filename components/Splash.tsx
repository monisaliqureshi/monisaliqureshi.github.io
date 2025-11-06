'use client'

import { motion } from 'framer-motion'

export default function Splash() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-6xl md:text-8xl font-bold text-white mb-4"
        >
          Monis Ali
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl md:text-2xl text-white/90"
        >
          AI Engineer & Data Scientist
        </motion.p>
      </motion.div>
    </div>
  )
}
