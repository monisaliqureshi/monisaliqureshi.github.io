"use client"

import { motion } from "framer-motion"
import { Star, GitPullRequest, GitCommit, AlertCircle, GitFork, Award } from "lucide-react"
import type { OpenSource } from "@/lib/types"

interface GitHubStatsProps {
  data: OpenSource
}

export function GitHubStats({ data }: GitHubStatsProps) {
  const stats = [
    {
      label: "Total Stars",
      value: data.total_stars,
      icon: Star,
      gradient: "from-yellow-400 to-orange-500",
      bgGradient: "from-yellow-500/20 to-orange-500/20",
    },
    {
      label: "Total Commits",
      value: data.total_commits,
      icon: GitCommit,
      gradient: "from-green-400 to-emerald-500",
      bgGradient: "from-green-500/20 to-emerald-500/20",
    },
    {
      label: "Pull Requests",
      value: data.total_prs,
      icon: GitPullRequest,
      gradient: "from-blue-400 to-cyan-500",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      label: "Issues Resolved",
      value: data.total_issues,
      icon: AlertCircle,
      gradient: "from-red-400 to-pink-500",
      bgGradient: "from-red-500/20 to-pink-500/20",
    },
    {
      label: "Repositories",
      value: 77,
      icon: GitFork,
      gradient: "from-purple-400 to-violet-500",
      bgGradient: "from-purple-500/20 to-violet-500/20",
    },
    {
      label: "Contributions",
      value: data.total_contributions,
      icon: Award,
      gradient: "from-indigo-400 to-blue-500",
      bgGradient: "from-indigo-500/20 to-blue-500/20",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative group"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50`}
          />
          <div className="relative bg-white dark:bg-gray-800 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 shadow-lg hover:shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className={`text-4xl font-bold bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}
              >
                {stat.value.toLocaleString()}
              </motion.div>
            </div>
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
