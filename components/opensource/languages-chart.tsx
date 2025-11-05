"use client"

import { motion } from "framer-motion"
import type { Language } from "@/lib/types"

interface LanguagesChartProps {
  languages: Language[]
}

export function LanguagesChart({ languages }: LanguagesChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-rose-500/10 rounded-3xl blur-2xl" />
      <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
          Most Used Languages
        </h2>

        <div className="space-y-6">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: lang.color }} />
                  <span className="text-base font-semibold text-gray-900 dark:text-white">{lang.name}</span>
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {lang.percentage}%
                </span>
              </div>
              <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.percentage}%` }}
                  transition={{ duration: 1.5, delay: 0.7 + index * 0.1, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  style={{
                    background: `linear-gradient(90deg, ${lang.color}, ${lang.color}dd)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap justify-center gap-4">
            {languages.map((lang) => (
              <div
                key={lang.id}
                className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full"
              >
                <div className="w-3 h-3 rounded-full shadow" style={{ backgroundColor: lang.color }} />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {lang.name} {lang.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
