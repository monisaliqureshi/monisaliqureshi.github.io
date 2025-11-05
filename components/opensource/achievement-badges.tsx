"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import type { GitHubAchievement } from "@/lib/types"

interface AchievementBadgesProps {
  achievements: GitHubAchievement[]
}

export function AchievementBadges({ achievements }: AchievementBadgesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 rounded-3xl blur-2xl" />
      <div className="relative bg-white dark:bg-gray-900 backdrop-blur-xl rounded-3xl p-8 sm:p-10 lg:p-12 border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
          🏆 GitHub Achievements
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
              className="relative group"
            >
              <div className="relative bg-gray-50 dark:bg-gray-800/90 rounded-2xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-orange-400 dark:hover:border-orange-500 transition-all duration-300 shadow-lg hover:shadow-2xl">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3">
                  <Image
                    src={achievement.badge_image_url || "/placeholder.svg"}
                    alt={achievement.badge_name}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-center text-gray-900 dark:text-gray-100 mb-2">
                  {achievement.badge_name}
                </p>
                {achievement.badge_description && (
                  <p className="text-xs text-center text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                    {achievement.badge_description}
                  </p>
                )}
                {achievement.verification_link && (
                  <a
                    href={achievement.verification_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
